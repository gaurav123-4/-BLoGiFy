const express = require ("express");    
const path = require ("path");
const app = express();
const PORT = 3000;



app.set("view engine", "ejs");
app.set("views", path.resolve("./Views"));


app.get("/" , (req, res) => {
    res.render("home", {title: "Home Page"});
});


app.listen (PORT, () => { console.log(`Server is running on port ${PORT}`); });