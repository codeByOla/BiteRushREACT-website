import { createContext, useEffect, useState } from "react";
import axios from "axios"; //per thirrjet http


export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

const [cartItems, setCartItems] = useState({});//shporta eshte bosh
const url = "http://localhost:4000"; //backendi per serverin
const [token,setToken] = useState("");
const [food_list,setFoodList] = useState([])

//shtoj produktin ne shporte
const addToCart = async (itemId) => {
if(!cartItems[itemId]) {
    setCartItems((prev)=>({...prev,[itemId]:1}))// nese ushqimi seshet ne shporte vendos 1 si sasi

} else {
    setCartItems((prev)=> ({...prev,[itemId]:prev[itemId]+1}))
}
 if(token) {
    await axios.post(url +"/api/cart/add",{itemId},{headers:{token}})//nese ka perdoruesi token dergon te dhenat ne server
 }
    
}
const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({...prev,[itemId]:prev[itemId]-1}))
    if(token) {
        await axios.post(url + "/api/cart/remove",{itemId},{headers:{token}})//dergon ndryshimin ne server nese ekziston token
    }
} 

const getTotalCartAmount = () => {
    let totalAmount = 0;
    for(const item in cartItems) {
        if(cartItems[item] > 0) {
            let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
        }
        
    }
    return totalAmount;
}

const fetchFoodList = async () => {
    const response = await axios.get(url+"/api/food/list");
    setFoodList(response.data.data) //ruaj te dhenat ne state
}
// merr te dhenat e shportes se perdoruesit nga serveri duke perdor token
const loadCartData = async (token) => {
    const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
    setCartItems(response.data.cartData);//vendos shporten me te dhenat e marra
}


//prd useEffect per te ngarku te dhenat kur nje komponent behet load
useEffect(()=> {
async function loadData() {
    await fetchFoodList();
    //nese ke token ne lokal disk
if(localStorage.getItem("token")) {
    setToken(localStorage.getItem("token"));//vendos token -in
    await loadCartData(localStorage.getItem("token"));//ngarko shporten
}
}
loadData();// thrras funksionin
},[])//vetem njeher kur komponenti ngarkohet

//Vlerat e disponueshme per te gjithe komponentet
    const contextValue = {
food_list,
cartItems,
setCartItems,
addToCart,
removeFromCart,
getTotalCartAmount,
url,
token,
setToken
    }

    //kthen nje komponent qe siguron contextValue per komponentet femije qe perdorin ate context
    //ndan vlerat qe jane brenda contextValue me te gjithe komponentet qe jane brenda StoreContext.Provider
    return (
        <StoreContext.Provider value={contextValue}> 
            {props.children} 
        </StoreContext.Provider>
    );
    //props.children <App/>
};

export default StoreContextProvider;