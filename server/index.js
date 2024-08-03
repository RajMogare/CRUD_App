import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import route from "./routes/userRoute.js";
import emailRoute from './routes/emailRoute.js';

import cors from "cors";
const app = express();
const corsOrigin ={
    origin:'*', //or whatever port your frontend is using
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials:true,            
    optionSuccessStatus:200
}
app.use(cors(corsOrigin));

app.use(bodyParser.json());
dotenv.config();

const PORT = process.env.PORT || 7000;
const URL = process.env.MONGO_URI;

mongoose
  .connect(URL)
  .then(() => {
    console.log("DB Connected Successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((error) => console.log(error));

app.use("/", route);
app.use('/', emailRoute);
