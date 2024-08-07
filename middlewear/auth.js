
const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth =(req,res,next)=>{
      try {
        //! extract jwt token
        const token = req.body.token || req.cookie.token;
        if(!token){
            return res.json({
                message:"Token Not Available"
            })
        }

        //! verify token

        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user=decode;
        }catch(err){
           return res.json({
            message:"Token is invalid"
           })
        }

        next();

      } catch (error) {
         return res.json({
            sucess:false,
            message:"Auth Not verify"
         })
      }
}

const isStudent = (req,res,next) =>{
  try {

    if(req.user.role!=="Student"){
        return res.json({
            message:"This is route for students only"
        })
    }
    next();
    
  } catch (error) {
    return res.json({
            sucess:false,
            message:"Auth Not verify"
         })
  }

}

const isAdmin = (req,res,next) =>{
    try {
  
      if(req.user.role!=="Admin"){
          return res.json({
              message:"This is route for Admin only"
          })
      }
      next();
      
    } catch (error) {
      return res.json({
              sucess:false,
              message:"Auth Not verify"
           })
    }
  
  }

module.exports={auth,isStudent,isAdmin};