const express = require("express");
const app = express();
const path = require("path");
 require("dotenv").config();
// const port = process.env.PORT || 8500;
app.use(express.json());
const userRouter = require("./api/user/user.router");

app.use("/api/user",userRouter);

app.listen(process.env.PORT, () => {
        console.log(`listening to the port at ${process.env.PORT}`);
      });