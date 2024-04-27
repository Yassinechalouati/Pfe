const mysql = require('../helpers/Sql_connection');
const verifyVerificationToken = require('../helpers/verifyVerificationToken');
const generateRefreshToken = require('../helpers/generateRefreshToken');
const generateAccessToken = require('../helpers/generateAccessToken')
const authenticateSocket = require('../middleware/authenticateSocket')

const socketHandler = (io) => {
    io.use((socket, next) => {
        authenticateSocket(socket, next)
    });

    io.on('connection', (socket) => {
        console.log('A user connected');

        
        socket.on('createRoom', (roomId) => {
            console.log("joined Room ", roomId);
            socket.join(roomId) 
        })        
        
        //handling the real time tutor notification when learner books lesson
        socket.on('notification', (data) => {
            console.log("incoming notification data", data);
            console.log("emitting notification now ", data.tutor_id);
            io.to(data.tutor_id).emit('Notification incoming', { notification: data});
        })

        socket.on('cancelLesson', (data) => {
            console.log("removing lesson", data)
            console.log("start_time: ", data.start_time)

            //getting date in this format for example "May 25, 2024" 
            //converting it to this format year-month-day

            // Convert input date string to Date object
            const date = new Date(data.start_time);

            // Extract date components
            const year = date.getFullYear();
            // Month starts from 0, so add 1 to get the correct month
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');

            // Construct the formatted date string in ISO format
            const formattedDate = `${year}-${month}-${day}T00:00:00.000Z`;

            const query = `SELECT *
            FROM private_lesson t1
            WHERE start_time = (
                SELECT MIN(start_time)
                FROM private_lesson t2
                WHERE DATE(t2.start_time) = DATE(t1.start_time)
                AND t2.start_time >= NOW()
                AND t2.Accepted <> 0 
                AND Date(t2.start_time) = Date(?)
                AND t2.private_learner_id = ?
            )`
            mysql.query(query, [formattedDate, data.learnerId], (err, result) => {
                if(err) {
                    console.log(err)
                    io.to(data.learnerId).emit('CancelLesson Error', { removedLesson: "Internal Server Error"});
                }else {
                    console.log("result: ", result);
                    io.to(data.learnerId).emit('Cancel Notification', { removedLesson: data.lesson, firstLesson: result[0], ReadByLearner: data.isSeenByLearner, lesson: data.sentLesson});
                }
            })
        })

        socket.on('approveLesson', (data) => {
            console.log("approve lesson", data)
            //chnaaml query njib beha el notification kima njib feha lel learner 
            io.to(data.learnerId).emit('Approvement Notification', { approvedLesson: data.lesson, ReadByLearner: data.isSeenByLearner, lesson: data.sentLesson});

        })


        // Handle email verification event
        socket.on('verifyEmail', async (token, id) => {
                console.log("id: ", id);
                try {
                    const { tokenDetails } = await verifyVerificationToken(token);
                    const payload = { id: tokenDetails.id, role: tokenDetails.role, email: tokenDetails.email };
    
                    
                    const query = `SELECT isVerified, email FROM ${mysql.escapeId(payload.role)} WHERE id = ?`;
                    mysql.query(query, [payload.id], async (err, result) => {
                        const roomId = `users_${result[0].email}` 
                        if (err) {
                            console.log(err);
                            io.to(roomId).emit('emailVerificationFailed', { message: 'Internal Server Error' });
                            io.to(id).emit('emailVerificationFailed', { message: 'Internal Server Error', verified: false });
                            return;
                        }
                        else if (result.length > 0) {
                            if (result[0].isVerified !== 1) {
                                const verifQuery = `UPDATE ${mysql.escapeId(payload.role)} SET isVerified = 1 WHERE id = ?`;
    
                                mysql.query(verifQuery, [payload.id], async (err, result) => {
                                    if (err) {
                                        console.log(err);
                                        io.to(roomId).emit('emailVerificationFailed', { message: 'Internal Server Error' });
                                        io.to(id).emit('emailVerificationFailed', { message: 'Internal Server Error', verified:false });
                                        return;
                                    }
    
                                    const { accessToken } = await generateAccessToken(payload);
                                    const { refreshToken } = await generateRefreshToken(payload);
    
                                    console.log('Email verified');
    
                                    // Emit a message to the user in the room
                                    io.to(roomId).emit('emailVerified', { message: 'Email verified successfully', verified: true, refreshToken, accessToken });
                                    io.to(id).emit('emailVerified', { message: 'Email verified successfully', verified: true }); // notifying the verfication page that the user is verified
                                });
                            } else {
                                // User already verified
                                console.log('User already verified');
                                io.to(roomId).emit('emailVerificationFailed', { message: 'User already verified' });
                                io.to(id).emit('emailVerificationFailed', { message: 'Internal Server Error', verified:false });
                            }
                        } else {
                            console.log('Invalid link');
                            io.to(roomId).emit('emailVerificationFailed', { message: 'Invalid link' });
                        }
                    });
                    
                }catch(err) {
                    console.log(err);
                    io.to(id).emit('emailVerificationFailed', { message: 'Internal Server Error', verified:false });
                }
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
            // Handle leaving rooms to prevent memory leaks
            /*Object.keys(socket.rooms).forEach(roomName => {
                socket.leave(roomName);
                console.log(`User left room: ${roomName}`);
            }); */ 
        });
    });
};

module.exports = socketHandler;
