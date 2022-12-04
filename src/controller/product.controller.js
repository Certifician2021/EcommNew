var mongoUtil = require("../../db/mongo");
const Razorpay = require("razorpay")

exports.orderCompleted = async(req, res) => {
          const { orderID, transactionID, signature, userID } = req.body;
          const db = mongoUtil.getDb();

         const insertOrder = await db.collection('orders').insertOne({order:orderID,transactionID:transactionID,signature:signature, userID:userID})
        console.log(insertOrder)
        if(insertOrder.insertedId){
          res.status(200).send({success:true,message:"Order Saved"})
        }
}

exports.checkout = async (req, res) => {
  var instance = new Razorpay({ key_id: 'rzp_test_Xq7KPwJ1jtOcO8', key_secret: 'fyMLEfoYD8fgiKmAzGM556sC' });
  var options = {
    amount: (parseInt(req.body.amount) * 100),  
    currency: "INR",
    receipt: "order_rcptid_11"
  };

  const order = await instance.orders.create(options);
  console.log(order)
   res.status(200).send(order)
}

exports.addProduct = async (req, res) => {
  console.log("############# In addProduct Route ###############");
  let db = mongoUtil.getDb();
  let data = req.body;

  let auth = await db.collection("users").findOne({ role: "Admin" });

  if (!auth) {
    console.log("User is not an Admin User");
    res
      .status(200)
      .send({ success: false, message: "Only Admin can add Products." });
  } else {
    data.productID = await getProductID();

    let db1 = await db.collection("products").insertOne(data);

    if (data.insertedId === 0) {
      res
        .status(400)
        .send({ success: false, message: "Unable to add product." });
    } else {
      res
        .status(200)
        .send({ success: true, message: "Product added successfully." });
    }
  }
};

exports.getAllProducts = async (req, res) => {
  console.log("############# In getAllProducts Route ##############");
  let db = mongoUtil.getDb();

  const filterObj = {
    ...(req.query.productName ? {productName: req.query.productName}:null),
     ...(req.query.productCategory ? { productCategory:req.query.productCategory}:null)
  };

  let products = await db.collection("products").find(filterObj).project({_id:0}).toArray();

  if (products === []) {
    res.status(404).send({ success: false, message: "No Products found." });
  } else {
    res.status(200).send(products);
  }
};

const getProductID = (req, res) => {
  let now = Date.now().toString(); // '1492341545873'
  now += now + Math.floor(Math.random() * 10);
  var length = now.length;
  return [now.slice(3, 9), now.slice(length - 2, length)].join("");
};
