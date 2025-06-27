import 'dotenv/config'
import express from "express"
import cors from "cors" //per komunikimin e serverit me frontin
import { connectDB } from "./config/db.js" //lidhja  DB
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'


//app configuration me port 4000
const app = express()
const port = 4000

//middleware
app.use(express.json()); // lejon express te lex JSON ne req.body per te marr te dhena nga fronti
app.use(cors())// aktivizon CORS per te lejuar qe kerkesat nga fronti te pranohen nga ky server

//db connection
connectDB();

//api endpoints
app.use("/api/food" , foodRouter);
app.use("/images" ,express.static('uploads'))//lejon akses publik te fotot ne folderin uploads
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

//test nese punon serveri
app.get("/" , (req,res) => {
    res.send("API Working")
})

//nis serverin
app.listen(port, () => { 
    console.log(`Server Started on http://localhost:${port}`)
})



