import jwt from 'jsonwebtoken'

const generateToken=async(userId)=>{
   const token=jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:'15d'})
   return token
   // res.cookie("jwt",token,{
   //  maxAge:15*24*60*60*1000,
   //  httpOnly:true, // prevent XSS attack (cross-site scripting attacks)
   //  sameSite:"strict", // CSRF attacks
   //  secure:process.env.NODE_ENV!=='development'
   // })
}

export default generateToken;