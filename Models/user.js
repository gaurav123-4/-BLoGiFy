const { Schema, model } = require("mongoose");
const crypto = require("node:crypto");

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
    profileImageURL: {
      type: String,
      default: "/images/image.png",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  const salt = crypto.randomBytes(16).toString("hex");
  const hashPassword = crypto
    .createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  user.salt = salt;
  user.password = hashPassword;
  next();
});

userSchema.static("matchPassword", async function (email , password) {
 const user = await this.findOne({ email });
 if (!user) {
   throw new Error("User not found");
 }

 const salt = user.salt;
 const hashedPassword = user.password;

 const userProvidedHash = crypto
   .createHmac("sha256", salt)
   .update(password)
   .digest("hex");

    if (userProvidedHash !== hashedPassword) {
        throw new Error("Invalid password");
    }
    return user;
});

module.exports = model("User", userSchema);