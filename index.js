const express = require ("express");    
const path = require ("path");
const app = express();
const PORT = 3000;


const userRoutes = require("./Routes/userroutes");
const router = require("./Routes/userroutes");

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use("/user",userRoutes);
app.use(express.static('public'));


app.set("view engine", "ejs");
app.set("views", path.resolve("./Views"));


app.get("/" , (req, res) => {
    res.render("home", {title: "Home Page"});
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
