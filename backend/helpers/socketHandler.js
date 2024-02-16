const mysql = require('../helpers/Sql_connection');
const verifyVerificationToken = require('../helpers/verifyVerificationToken');
const generateRefreshToken = require('../helpers/generateRefreshToken');
const generateAccessToken = require('../helpers/generateAccessToken');

const socketHandler = (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('createRoom', (roomId) => {
            socket.join(roomId);
        })        

        // Handle email verification event
        socket.on('verifyEmail', async (token, roomId) => {
            try {
                console.log("user trying to verify");
                const { tokenDetails } = await verifyVerificationToken(token);
                const payload = { id: tokenDetails.id, role: tokenDetails.role };

                const query = `SELECT isVerified FROM ${mysql.escapeId(payload.role)} WHERE id = ?`;
                mysql.query(query, [payload.id], async (err, result) => {
                    if (err) {
                        console.log(err);
                        socket.emit('emailVerificationFailed', { message: 'Internal Server Error' });
                        return;
                    }

                    if (result.length > 0) {
                        if (result[0].isVerified !== 1) {
                            const verifQuery = `UPDATE ${mysql.escapeId(payload.role)} SET isVerified = 1 WHERE id = ?`;

                            mysql.query(verifQuery, [payload.id], async (err, result) => {
                                if (err) {
                                    console.log(err);
                                    socket.emit('emailVerificationFailed', { message: 'Internal Server Error' });
                                    return;
                                }

                                const { accessToken } = await generateAccessToken(payload);
                                const { refreshToken } = await generateRefreshToken(payload);

                                console.log('Email verified');

                                // Emit a message to the user in the room
                                io.to(roomId).emit('emailVerified', { message: 'Email verified successfully', verified: true });
                                io.to(roomId).emit('emailVerificationSuccess', { message: 'Email verified successfully', refreshToken, accessToken });
                            });
                        } else {
                            // User already verified
                            console.log('User already verified');
                            socket.emit('emailVerificationFailed', { message: 'User already verified' });
                        }
                    } else {
                        console.log('Invalid link');
                        socket.emit('emailVerificationFailed', { message: 'Invalid link' });
                    }
                });
            } catch (err) {
                console.log(err);
                socket.emit('emailVerificationFailed', { message: 'Invalid token' });
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
