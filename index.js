const express = require ("express");    
const path = require ("path");
const app = express();
const PORT = 3000;
const mongoose = require("mongoose");

const userRoutes = require("./Routes/userroutes");
const router = require("./Routes/userroutes");


// mongoose.connect("mongodb://



app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use("/user", userRoutes);
app.use(express.static('public'));

app.set("view engine", "ejs");
app.set("views", path.resolve("./Views"));


app.use(express.urlencoded({ extended: false })); 


app.get("/signup", (req, res) => {
    res.render("signup", { title: "Sign Up Page" });
});

app.get("/signin", (req, res) => {
    res.render("signin", { title: "Sign In Page" });
});

app.get("/" , (req, res) => {
    res.render("home", {title: "Home Page"});
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
