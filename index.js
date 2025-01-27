//import required modules
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import moment from "moment";
import dotenv from "dotenv";
dotenv.config();
//create instance of express
const app= express();
//set port number
const PORT = 1920;
//configure middlewares
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))
//routes
app.get("/",(req,res)=>{
    res.render("index.ejs")
})
app.post("/weather",async (req,res)=>{
    const city=req.body.cityName;
    const ApiKey=process.env.API_KEY;
    const ApiURL= `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${ApiKey}`
    try{
        const response=await axios.get(ApiURL)
        const data=response.data;
        // const sunriseTime=moment.unix(data.sys.sunrise).utcOffset(data.timezone/60).format('HH:mm')
        // const sunsetTime=moment.unix(data.sys.sunset).utcOffset(data.timezone/60).format('HH:mm')
        const sunriseTime=moment.utc(data.sys.sunrise,'X').add(data.timezone,'seconds').format('hh:mm A');
        const sunsetTime=moment.utc(data.sys.sunset,'X').add(data.timezone,'seconds').format('hh:mm A');
        res.render("weather.ejs",{
            weatherData: data,
            sunrise: sunriseTime,
            sunset:sunsetTime,
        })
    }catch(error){
        console.error("Error:",error.message)
        res.render("weather.ejs",{
            weatherData: null,
            date: dateAndTime,
            error:("Oops! Unable to fetch weather data: ",error.message)
        })
    }
})
app.listen(PORT,()=>{
    console.log("Server is running on the port no: ",+ PORT)
})
