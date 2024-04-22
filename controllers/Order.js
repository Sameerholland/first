const { Order } = require("../models/Order")

exports.CreateOrder = async (req,res) =>{
   console.log("Create Order API called")
   try {
      const data = new Order(req.body)
      const doc = await data.save();
      const result = await (await doc.populate({path:'product',select:["title","thumbnail", "rating"]})).populate({path:'Address', select:["Street", "State","district","ZipCOde","Primary_contact_Number"]})
      res.status(201).json(result)
   }
   catch (err){
      res.status(401).json({error:err.message})
   }
}

exports.FetchOrder = async (req,res) =>{
   console.log("Fetch Order API Called");
   try{  
      const order = await Order.find({user:req.body.id}).populate({path:'product', select:["title","thumbnail", "rating"]}).populate({path:'Address', select:["Street","State","district","ZipCode","Primary_contact_Number"]})
      res.status(200).json(order)
   }
   catch(err){
      res.status(401).json({erorr:err.message})
   }
}

exports.UpdateOrder = async (req,res) =>{
   console.log("Update user API Called")
   try {
      const data = Order.findByIdAndUpdate({_id:req.body.id},{
         quantity:req.body.quantity,
         Dilervery_date:req.body.Dilervery_date,
         status:req.body.status
      })
      res.status(201).json(data)
   }
   catch (err){
      res.status(401).json({error:err.message})
   }
}