import userModel from "../models/userModel.js"

//add items to user cart
const addToCart = async (req,res) => {
try {
    let userData = await userModel.findById(req.body.userId);//gjen te dhenat e prdsit nga DB duke prd userId qe vjen nga body i kerkeses
    let cartData = await userData.cartData;//merr te dhenat aktuale te karroces se atij prdsi.
    if(!cartData[req.body.itemId])//nese produkti sekz ne karroc
    {
        cartData[req.body.itemId] =1;
    }
    else {
        cartData[req.body.itemId] +=1;
    }
    await userModel.findByIdAndUpdate(req.body.userId,{cartData});
    res.json({success:true,message:"Added To Cart!"});// run carten e updatume ne DB
} catch (error) {
    console.log(error);
    res.json({success:false, message:"Error"})
    
    
}
}


//remove items from users cart
const removeFromCart = async(req,res) => {
try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    //nese sasia e prod eshte > 0, e ul me 1
    if(cartData[req.body.itemId]>0) {
        cartData[req.body.itemId] -=1;
    }
    await userModel.findByIdAndUpdate(req.body.userId,{cartData});
    res.json({success:true,message:"Removed From Cart"})
} catch (error) {
    console.log(error);
    res.json({succes:false,message:"Error"})

}
}

//fetch user cart data 
const getCart = async (req,res) => {
 try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    res.json({success:true,cartData})
 } catch (error) {
    console.log(error);
    res.json({succes:false,message:"Error"})
    
 }
}

export {addToCart,removeFromCart,getCart} 