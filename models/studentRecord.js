const mongoose = require ('mongoose');
constattendanceSchema = new mongoose.Schema({
    date: {
        type: data,
        required: true,
    },
    status: {
        type: String,
    },

})
const studentRecordSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,


    },
    attendance: {
         type: [attendanceSchema],
         default: [],
    }
})


const StudentRecord = mongoose.model('StudentRecord', studentRecordSchema);
module.exports = StudentRecord;