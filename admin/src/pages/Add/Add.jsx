import React, {  useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify' //njofitme te perkoheshme
// add merr nje url si properties
const Add = ({url}) => {
    
    const [image,setImage] = useState(false);
    // 'data' esgt nje objt qe permban te dhenat e ushqimit qe do te shtohet
    const [data,setData] = useState({
        name: "",
        description:"",
        price:"",
        category:"Salad"
    })

//funksion qe updaton gjendjen 'data' kur prdsit shkruan ne input e formularit
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;// ,err vln qe eshte shkr
        setData(data => ({...data,[name]:value})) // prditeson fushen pa prekur te tjt
    }
// funks q ekz kur prds dorezon formularin
  const onSubmitHandler = async (event) => {
  event.preventDefault();// ndalohet rifreskimi i faqes
  // krijohet nje objt FormData qe mund te permbaje eë dhena dhe file
  const formData = new FormData();
  formData.append("name",data.name)
  formData.append("description",data.description)
  formData.append("price", Number(data.price))
    formData.append("category",data.category)
      formData.append("image",image)
const response = await axios.post(`${url}/api/food/add`,formData); // Ben nje kerkese POST per te dërguar te dhënat tek serveri
 if(response.data.success) // Nese pergjigja nga serveri eshte pozitive
     { // pastrimi i inputeve kthimi ne vlera bosh
     setData({
        name: "",
        description:"",
        price:"",
        category:"Salad"
    })
     setImage(false) // hiqet imazhi i perzgjedhur
     toast.success(response.data.message)
 }
 else {
toast.error(response.data.message)
 }


  }

  return (
    <div className='add'>
        <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
         <p>Upload Image</p>
         <label htmlFor="image">
            <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" /> 
         </label>
         <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>
        <div className="add-product-name flex-col">
            <p>Product Name</p>
            <input onChange={onChangeHandler} value={data.name}  type="text" name='name' placeholder='Type Here' />
        </div>
        <div className="add-product-description flex-col">
            <p>Product Description</p>
            <textarea  onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write Content Here' required></textarea>
        </div>
        <div className="add-category-price">
        <div className="add-category flex-col">
            <p>Product Category</p>
            <select   onChange={onChangeHandler} name="category">
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Deserts">Deserts</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pure Veg">Pure VEG</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>

            </select>
        </div>
        <div className="add-price flex-col">
            <p>Product Price</p>
            <input onChange={onChangeHandler} value ={data.price} type="Number" name='price' placeholder='$20' />
        </div>
        </div>
        <button type='submit' className='add-btn'>ADD</button>
        </form>
        
    </div>
  )
}

export default Add