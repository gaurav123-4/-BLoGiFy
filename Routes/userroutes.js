const { Router } = require("express");

const router = Router();

router.get("/signin", (req, res) => {
  return res.render("signin", { title: "Sign In Page" });
});

router.get("/signup", (req, res) => {
  return res.render("signup", { title: "Sign Up Page" });
});


router.post("/signup", (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return res.status(400).send("All fields are required.");
  }
  console.log("New user signup:", { fullName, email });
  return res.redirect("/user/signin");
});


router.post("/signin", async (req, res) => {
  const { fullName ,email, password } = req.body;
const user = await User.matchPassword(email, password);
console.log('User' , user)
  return res.redirect("/");
});


module.exports = router;