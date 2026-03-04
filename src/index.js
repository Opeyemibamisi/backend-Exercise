// create variables for routes to use and imports from other files

const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("../config/db");
const dns = require("node:dns/promises");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
dotenv.config();
const productRoute = require("./routes/product");

const { transporter } = require("./email/mailer");
const cors = require("cors");

// initialize express app
const app = express();

app.use(express.json());

const port = process.env.PORT;
const userRoute = require("./routes/user");

// define a simple route for the root path
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.get("/", (req, res) => {
  res.send("welcome to express js");
});

// use the imported routes
app.use("/auth", userRoute);
app.use("/product", productRoute);

connectDB();


transporter.verify((error, success) => {
  if (error) {
    console.error(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});



// const users = [
//   { name: "opeyemi", id: 1 },
//   { name: "favour", id: 2 },
// ];

// app.post("/register", (req, res) => {
//   const name = req.body.name;
//  console.log(name);
//   res.send(`your name is ${name}`);
// });

// app.post("/register", (req, res) => {
//   const { name, email, password } = req.body;
//   if (!name || !email || !password) {
//     return res.status(401).json("All fields are required");
//   }

//   const existingUser = users.find((user) => user.email === email);
//   if (existingUser) {
//     return res.status(400).json({ message: "User already exists" });
//   }

//   console.log(name, email, password);

//   const detail = {
//     name: name,
//     email: email,
//     password: password,
//   };
//   users.push(detail);
//   res.json({ message: detail });
// });

// app.get("/users", (req, res) => {
//   res.send(users);
// });

// app.get("/", (req, res) => {
//   res.send("january Node is running smoothly!");
// });

// const products = {
//   name: "DELL",
//   price: 5000,
//   category: "Laptop",
// };

// app.get("/product", (req, res) => {
//   res.send(products);
// });
