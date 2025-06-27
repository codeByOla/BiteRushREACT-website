//kod router ne expres 
import express from "express"
import { addFood, listFood ,removeFood} from "../controllers/foodController.js"
import multer from "multer" //bibliotek e prd per ngarkim foto ne server.

// Krijon një router tr ri me Express
const foodRouter = express.Router();


//Image Storage Engine
//diskStorage lokalisht ne disk, te ruhen te gjitha fotot tek uploads, i ndryshon emrin fotos duke i shtuar kohen kur u ngarkua per tshmang emra te njejte
const storage = multer.diskStorage({
  destination: "uploads",
    filename:(req,file,cb) => {
          return cb(null, `${Date.now()} ${file.originalname}`)

    }
})

const upload = multer({storage: storage})

foodRouter.post("/add", upload.single("image"),addFood)
foodRouter.get("/list", listFood)
foodRouter.post("/remove", removeFood);



export default foodRouter;
