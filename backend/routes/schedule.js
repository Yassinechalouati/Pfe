const express = require('express');
const router = express.Router();
const mysql = require('../helpers/Sql_connection');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

router.post('/scheduleLesson', auth, roleCheck(["Learner"]), (req, res) => {
    const userId = req.user.id;
    const {
        tutorId,
        lessonTopic,
        lessonDifficulty,
        selectedDate, // format: mm/dd/yyyy 
        lessonLength,
        lessonLanguage
    } = req.body;

    console.log(req.body)

    if (!tutorId || !lessonTopic || !lessonDifficulty || !selectedDate || !lessonLength || !lessonLanguage) {
        res.status(400).json({ message: "Bad Data!" });
        return; // return to avoid further execution if data is missing
    }

    // Extracting the date, hours, and minutes from the request's data
    const date = selectedDate.split(' ')[0]
    const month = date.split('/')[0]
    const day = date.split('/')[1]
    const year = date.split('/')[2]
    const time = selectedDate.split(' ')[1];
    const [hours, minutes] = time.split(':').map(Number);

    const lessonDuration = parseInt(lessonLength.split(' ')[0]);

    // Calculate adjusted hours and minutes
    let adjustedHours = hours + Math.floor((minutes + lessonDuration) / 60);
    let adjustedMinutes = (minutes + lessonDuration) % 60;

    // Adjust date if necessary
    let endDate = new Date(Date.UTC(date.split('/')[2], date.split('/')[0] - 1, date.split('/')[1], adjustedHours, adjustedMinutes));

    // Format the adjusted enddate to "YYYY-MM-DD HH:MM:SS" format for MySQL
    const formattedEndDate = endDate.toISOString().slice(0, 19).replace('T', ' ');

    // Format the adjusted startdate to "YYYY-MM-DD HH:MM:SS" format for MySQL
    const formattedBeginDate = year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+"00"

    console.log("formattedEndDate: ", formattedEndDate);
    console.log("beginDate: ", formattedBeginDate);

    
    // Prepare and execute the SQL query
    const query = "INSERT INTO private_lesson(tutor_id, private_learner_id, start_time, end_time, lesson_topic, lesson_difficulty, duration, Accepted, language) VALUES(?, ?, ?, ?, ?, ?, ?, -1, ?)";
    mysql.query(query, [tutorId, userId, formattedBeginDate, formattedEndDate, lessonTopic, lessonDifficulty, lessonLength, lessonLanguage], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" });
        } else {
            res.status(200).json({message: "lesson Booked"}); // Assuming you want to return the result of the query
        }
    })
});

module.exports = router;
