import mongoose from "mongoose";

export const connectDB = async ()=>{
    try{
        const connectionstring = "mongodb+srv://doctoraidhealth:13mm9HP2taCpPtha@doctoraidcluster01.wxts6.mongodb.net/?retryWrites=true&w=majority&appName=DoctorAidCluster01";
        await mongoose.connect(connectionstring);
        console.log("Conected to the database...!");
    }catch(error){
        console.log(error);
        console.log("Error while connecting to the database..!")
    }
};