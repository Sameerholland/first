const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const stripe = require('stripe')("sk_test_51NNa7MSDHK09cQh75RLiGTJn9WjqW9tA3fTYf3o8v6yEZKmHykHBN7u4Ftle340eeiM9UUI4Ei2etzH2dyuB2o1E00BTVowxV1")

const server = express();
require("dotenv").config();
const path = require('path')

//imports from Dotenv file
const port = process.env.PORT;

//Routes Used
const Authrouter = require("./routes/Auth");
const Productrouter = require("./routes/Product");
const Cartreducer = require("./routes/Cart");
const Addressreducer = require('./routes/Address');
const Orderreducr = require('./routes/Order');

const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { User } = require("./models/Auth");
const { sentizeuser, CookieExtracter } = require("./Commen");
const cookieParser = require("cookie-parser");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


var opts = {};
opts.jwtFromRequest = CookieExtracter;
opts.secretOrKey = 'SArfwershnrt234%$';
server.use(express.static(path.resolve(__dirname,'build')));
server.use(cookieParser())


server.use(session({
  secret:'keyboard cat',
  resave:false,
  saveUninitialized:true,
  cookie:{secure:false,maxAge:600000}
}))


server.use(express.json());
server.use(cors());

server.use("/user", Authrouter.router);
server.use("/product", Productrouter.router);
server.use("/cart", Cartreducer.router);
server.use('/address', Addressreducer.router);
server.use('/order',Orderreducr.router);

passport.use('local', new LocalStrategy({usernameField:"Phone_Number"}, async function(Phone_Number,password,done){
  try{
    const user = await User.findOne({Phone_Number:Phone_Number});
    if(!user){
      return done(null, false ,{error:'User Not Exist'})
    }

    crypto.pbkdf2(password,user.salt,31000,512,"sha256", async function(err, hash){
      if(!crypto.timingSafeEqual(user.hash,hash)){
        return done(null, false,{error:"Wrong Password"})
      }

      const token = jwt.sign(sentizeuser(user), 'SArfwershnrt234%$')
      done(null,{username:user.username,id:user._id,token})
    })
  }
  catch(err){
    done(err)
  }
}))

passport.use('jwt', new JwtStrategy(opts, async function(jwt_payload, done){
  console.log("Working",jwt_payload)
  try{
    const user = await User.findById({_id:jwt_payload.id});
    if(user){
      return done(null, sentizeuser(user))
    }
    else {
      return done(null, false,{error:"Something Went Wrong"})
    }
  }
  catch(err){
    done(err)
  }
}))

passport.serializeUser(function(user,cb){
  console.log("Seriallize User Called")
  process.nextTick(function(){
    return cb(null,{ username: user.username ,Phone_Number:user.Phone_Number })
  })
})

passport.deserializeUser(function(user,cb){
  console.log("Deserialize user Called")
  process.nextTick(function(){
    return cb(null,user)
  })
})

server.post('/create-checkout-sesssion', async(req,res)=>{
  console.log("Session API Called")
  console.log(req.body)
  
  
  const session = await stripe.checkout.sessions.create({
    payment_method_types:['card'],
    line_items:[{
      quantity:1,
      price_data:{
      currency:"inr",
      product_data:{
        name:req.body.products.state.title
      },
      unit_amount:req.body.products.state.price  * 100
    }}],
    mode:"payment",
    success_url:"http://localhost:3000/sucess",

  })

  res.json({id:session.id})
})



main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(
    "mongodb+srv://vishwanathdigitalmarketing:l8gU0Yp0rXIglFhN@cluster0.gdbmvpj.mongodb.net/?retryWrites=true&w=majority"
  ),
    console.log("Database Connected");
}

server.listen(port, () => {
  console.log(`Server Connected at ${port} PORT`);
});
