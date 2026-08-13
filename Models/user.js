const {Schema , model }= require("mongoose");

const {createHmac} = require("node :crypto");

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },

    password:{
        type: String,
        required: true,
        unique: true
    },

    salt : {
        type: String,
        required: true
    },
    profileImageURL: {
        type: String,
        default: "/images/image.png"
    },
    
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
},
{ timestamps: true }
);

userSchema.pre("save", function(next){
   const user = this;

   if (!user.isModified("password")) return next();

   const salt = crypto.randomBytes(16).toString("hex");
   const hashPassword = createHmac("sha256", salt)
   .update(user.password)
   .digest("hex");
   this.salt= salt;
   this.password = hashPassword;
   next();
});