
const express = require('express');
const router = express.Router();

const{login,signup} = require('../controllers/Auth')
const{auth,isStudent,isAdmin} = require('../middlewear/auth')

router.post('/login',login);
router.post('/signup',signup);

router.get('/test',auth,(req,res)=>{
    res.json({
        message:"Test"
    })
})


router.get('/student',auth,isStudent,(req,res)=>{
    res.json({
        sucess:true,
        message:"welcome to student route"
    })
});


router.get('/admin',auth,isAdmin,(req,res)=>{
    res.json({
        sucess:true,
        message:"welcome to Admin route"
    })
});

module.exports = router;