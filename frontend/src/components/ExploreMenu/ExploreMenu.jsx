import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
 <h1>Check Out Our Menu</h1>
<p className='explore-menu-text'>Dive into a world of flavor with our vibrant and diverse menu! From crave-worthy classics to bold new bites, every dish is crafted to thrill your taste buds and turn every meal into a celebration. Your next unforgettable dining experience starts here!</p>
<div className="explore-menu-list">

{menu_list.map ((item,index)=>{
    return (
        <div onClick= {()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key= {index} className="explore-menu-list-item">

            <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
            <p>{item.menu_name}</p>
        </div>
    )
})}

</div>
<hr />
    </div>
  )
}

export default ExploreMenu