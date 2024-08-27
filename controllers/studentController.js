const StudentRecord = require('../models/studenrRecord');
const AttendanceManager = require('../models/studenrRecord');

exports.getHome = async (req, res) =>{
    try{
        const students = await StudentRecord.find({});

        const maxATTendanceCount = students.lenght;

        res.render('attendance.ejs', {students, maxAttendanceCount});


    }catch(error){
        res.status(500).send('Internal Server Error');


    }
}