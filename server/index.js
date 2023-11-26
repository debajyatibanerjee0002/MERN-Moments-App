import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postRoutes from "./routes/posts.js";
import userRouters from "./routes/users.js";

dotenv.config();

const PORT = process.env.PORT || 4000;
const CONNECTION_URL = process.env.MONGO_URI;

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);
app.use("/user", userRouters);

app.get("/", (req, res) => {
  res.send("Hello to Moments API");
});

mongoose
  .connect(CONNECTION_URL)
  .then(() => {
    console.log(`Database connected...`);
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server starts at port ${PORT}`);
    });
  })
  .catch((error) => console.log(error.message));
