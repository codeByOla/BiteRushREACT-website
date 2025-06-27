import mongoose from "mongoose"
//Skem prrcak si duhet te duken te dhenat e prds ne DB.

const userSchema = new mongoose.Schema({
    name: {type:String,required:true},
    email: {type:String,required:true,unique:true}, //ska 2 prd-sa me te njt email
    password: {type:String,required:true},
    cartData: {type:Object, default:{}} //vlere default objt bosh
},{minimize:false})
//kontrollon nese modeli user esht kriju me pare dhe nese nuk ekziston, krijon modelin duke prd userSchema
const userModel = mongoose.models.user || mongoose.model("user",userSchema);

export default userModel;