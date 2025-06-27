import jwt from "jsonwebtoken" //perdoret per te verikuar token

//middleware funksion asinkron prd ne rruget e backend per te kontrollu autorizimin, kerkesa , pergjigja, per te kalu ne middleware tjt
const authMiddleware = async (req,res,next) => {
const {token} = req.headers; //nxjerr tokenin nga header-i i krrkesrs HTTP
//nese ska token i kthen nje pergjigje JSON me sukses false dhe mesazh qe duhet te rilogohen.
if(!token) {
    return res.json({success:false,message:"Not Authorized Login Again!"})
}
try {
    const token_decode = jwt.verify(token,process.env.JWT_SECRET); //verifikon tokenin JWT me celes sekret
    if (!req.body) req.body = {}; 
    req.body.userId = token_decode.id; //vendos userId ne req.body per te dit se kush suer po ben kerkesen
    
    next();
} catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
    
}

} 

export default authMiddleware;