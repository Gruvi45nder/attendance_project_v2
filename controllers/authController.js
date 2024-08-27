const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AttendanceManager = require('../models/attendanceManager.js');
require('dotenv').config();

exports.login = async (req, res) =>{
    const{email, password} = req.body;
    try{

        const user = await AttendanceManager.findOne({email});
        if(!user){
            return res.status(401).send('Invalid username or password');
        }
        //verify password using bcrypt
        const result = await bcrypt.compare(password, user.password); 
        if(!result){
            return res.status(401).send('Invalid username or password');
        }
        //generate the JWT
        const token = jwt.sign({id: user._id.toString()}, process.env.Secret_Key,{expiresIn: '5m'});
        //create a cookie and place JWT/token inside it
        res.cookies('jwt', token, {maxAge: 5 *  60 * 1000, http:true});
        res.redirect('/home');

    }catch(error){

        res.status(500).send('Internal server Error');

    }
}

exports.register = async (req, res) =>{


    const { email, password, confirmPassword } = req.body;


    try{
        const existingUser = await AttendanceManager.findOne({email});

        if(existingUser){
            return res.status(400).send('Username already exists. Please try again.');
        }

        if(password !== confirmPassword){
            return res.status(400).send('Passwords do not match.');
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new AttendanceManager({
            email,
            password: hashPassword
        });

        await newUser.save();

    res.redirect('/login');

    }catch(error){


    }

}








