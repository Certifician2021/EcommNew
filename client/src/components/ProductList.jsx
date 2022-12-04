import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {useState, useEffect} from 'react';
import axios from 'axios';
import Product from "./Product";
import auth from "../utils/auth";
import LogIn from "./LogIn";
import BuyProduct from "./BuyProduct";
import { useCallback } from "react";
import useRazorpay from "react-razorpay";
import { errorNotification } from "../utils/notification";
import OrderView from "./OrderView";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [openIndex, setOpenIndex] = useState();
    const [show, setShow] = useState(false);
    const [buyNow, setBuyNow] = useState()
    const [orderID, setOrderID] = useState("");
    const [transactionID, setTransactionID] = useState("")
    const [openOrder, setOpenOrder] = useState(false)
    const [logIn, setLogIn] = useState(false)

    const Razorpay = useRazorpay();

   
   useEffect(()=>{
    const loggedIn = auth.isLoggedIn();
    if(loggedIn){
      setLogIn(true)
    }else{
      setLogIn(false)
    }
   },[])

   const userID = auth.getUserInfo().userID;

    const fetchProducts = async () => {
        const productList = await axios.get('/api/product');
        setProducts(productList.data)
        console.log(productList.data)
    }
  
    useEffect(()=>{
          fetchProducts();
    },[])

    const handleShow = () => setShow(true);

    const handleBuyNow = (e,index) => {
        e.stopPropagation();
        console.log("hiii")
        setBuyNow(index)
        handleShow()
    }

    const token = auth.getToken();

   
    const handlePayment = useCallback(async(e, amount) => {
         e.stopPropagation()
      console.log(amount)
      const config = {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
      console.log(config)
      const {data} = await axios.post('/api/product/checkout', {
        amount:amount
      },config);

      console.log(data)
      let am = (Number(data.amount) * 100)
  
      const options = {
        key: "rzp_test_Xq7KPwJ1jtOcO8",
        amount: data.amount,
        currency: "INR",
        name: "FavShop",
        description: "Test Transaction",
        order_id: data.id,
        handler: async(res) => {
          const resp = await axios.post('/api/product/orderCompleted',{
            orderID:res.razorpay_order_id,
            transactionID:res.razorpay_payment_id,
            signature:res.razorpay_signature,
            userID:userID
          },config)
          setOrderID(res.razorpay_order_id);
          setTransactionID(res.razorpay_payment_id)
          setOpenOrder(true)
          handleShow()
        },
        prefill: {
          name: "Piyush Garg",
          email: "youremail@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
  
      const rzpay = new Razorpay(options);
      rzpay.open();
    }, [Razorpay]);

  return (
    <>
    <h1 style={{textAlign:"center",marginTop:"30px"}}>Products</h1>
        <div style={{flexWrap:"wrap"}} className="d-lg-flex justify-content-start">
            {
            products?.map((item, index)=>{
                return(
                <>
               {openIndex === index && logIn ? <Product show={show} setShow={setShow} data={item} closeModal={setOpenIndex} />:null}
               {openIndex === index && !logIn ? <LogIn show={show} setShow={setShow} data={item} closeModal={setOpenIndex} />:null}
               {buyNow === index && logIn ? <BuyProduct show={show} setShow={setShow} data={item} closeModal={setBuyNow} />:null } 
               {openOrder && logIn ? <OrderView show={show} setShow={setShow} orderID={orderID} transactionID={transactionID} closeModal={setOpenOrder} />:null } 
 


                <Card onClick={()=>{setOpenIndex(index);handleShow()}} key={index.toString()} style={{cursor:"pointer", width: "18rem", margin: "10px" }}>
                <Card.Img style={{height:"200px"}} variant="top" src={item.productImageUrl} />
                <Card.Body>
                  <Card.Title>{item.productName}</Card.Title>
                  <Card.Text>
                   <span style={{fontWeight:"500"}}>Price</span> - {item.productPrice} INR
                  </Card.Text>
                 {logIn ? 
                  <Button variant="primary" onClick={(e)=>{handlePayment(e,item.productPrice)}}>Buy Now</Button>: 
                  <Button variant="primary" onClick={(e)=>{setOpenIndex(index)}}>Buy Now</Button>
                  }
                </Card.Body>
              </Card>
                </>)
                
            })
            }
        </div>

     
    </>
  );
}

export default ProductList;
