import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors"
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js"
import courseRoute from "./routes/course.route.js"
import mediaRoute from "./routes/media.route.js"
import purchaseRoute from "./routes/purchaseCourse.route.js"
import courseProgressRoute from "./routes/courseProgress.route.js"
import path from "path";

dotenv.config({}); 

connectDB();
const app=express();
const PORT=process.env.PORT || 3000;

const _dirname=path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    
    origin:"https://skill-sync-1-f5p6.onrender.com",
    credentials:true
}))

app.use("/api/v1/media",mediaRoute)
app.use("/api/v1/user",userRoute)
app.use("/api/v1/course",courseRoute)
app.use("/api/v1/purchase",purchaseRoute)
app.use("/api/v1/progress", courseProgressRoute);

app.use(express.static(path.join(_dirname,"/client/dist")))
app.get('*',(_,res)=>{
    res.sendFile(path.resolve(_dirname,"client","dist","index.html"));
})

app.listen(PORT,()=>{
    console.log(`Server listen at port ${PORT}`);
})