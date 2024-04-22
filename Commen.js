exports.sentizeuser = (user)=>{
   return ({username:user.username,Phone_Number:user.Phone_Number ,id:user._id})
}

exports.CookieExtracter = function (req){
   console.log("Cookie Extracter Function Called")
   let token = null;
   console.log(req)
   if(req && req.cookies){
      
      token = req.cookies['jwt'];
   }
   token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhbSIsIlBob25lX051bWJlciI6IjkzMzQyMTg3MjEiLCJpZCI6IjY2MjIwZmM4MmVhZjgzZTQ5ZjcxODdlNiIsImlhdCI6MTcxMzUwODcyOX0.JgeXMiMDqQRHu2CV4sut6BthQ4LsUpQCr1XyjAdPDw0";
   return token;

}