const express = require("express");
const app = express();
const connection = require("./database/db");
const cors = require("cors");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const verifyRoute = require("./routes/verify");
const post = require("./routes/post");
// const requireLogin  = require('./middleware/requireLogin')

// database connection
connection();
// app.get("/protected",requireLogin, (req,res)=>{
//   res.send('Hello Word');
//   console.log(req.user);
// })
// middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/register", userRoutes);
app.use("/login", authRoutes);
app.use("/verifyEmailToken", verifyRoute);
app.use("/post", post);


app.listen(5000, () => {
  console.log("Server running....");
});
