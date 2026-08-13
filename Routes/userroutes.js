const { Router } = require("express");

const router = Router();

router.get("/signin", (req, res) => {
    return res.render("signin", {title: "Sign In Page"});
});

router.get("/signup", (req, res) => {  
  return  res.render("signup", {title: "Sign Up Page"});
});

router.post("/signup", async (req, res) => {
    const {fullName, email, password} = req.body;
await User.create({
    fullName ,
    email,
    password,
}

)
    newUser.save()
    .then(() => {
        res.redirect("/signin");
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send("Error creating user");
    });

    return res.redirect("/");
});

module.exports = router;