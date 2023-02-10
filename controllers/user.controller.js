const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const getLandingPage = (req, res) => {
  res.send("It works!!");
};
const registerUser = (req, res) => {
  const userDetails = req.body;
  userModel.findOne({ email: userDetails.email }, (err, result) => {
    if (err) {
      res.status(500).send({ message: "Internal server error", status: false });
    } else {
      if (result) {
        res.send({ message: "User already exists", status: false });
      } else {
        let form = new userModel(userDetails);
        form.save((err) => {
          if (err) {
            res
              .status(500)
              .send({ message: "Cannot sign up, try again", status: false });
          } else {
            res.send({ message: "Sign in successfully", status: true });
          }
        });
      }
    }
  });
  // res.send("Register user works!!")
};

const signIn = (req, res) => {
  const userDetail = req.body;
  const email = userDetail.email;
  userModel.findOne({ email: userDetail.email }, (err, user) => {
    if (err) {
      res.status(500).send({ message: "Internal server errors" });
    } else {
      if (!user) {
        res.send({ message: "Email not found" });
      } else {
        user.validatePassword(userDetail.password, (err, same) => {
          if (err) {
            res.status(500).send({ message: "Internal Server Error" });
          } else {
            if (!same) {
              res.send({ message: "Wrong Password", status: false });
            } else {
              const token = jwt.sign({ email }, "secret", { expiresIn: "8h" });
              console.log(token);
              res.send({ message: "Correct Details", token, status: true });
            }
          }
        });
      }
    }
  });
};

const getDashboard=(req,res)=>{
const token=req.headers.authorization.split(' ')[1];
jwt.verify(token,"secret",(err,result)=>{
if (err) {
  res.send({message:"jwt failed",err,status:false})
}else{
const email=result.email;
userModel.findOne({email:email},(err,result)=>{
  res.send({message:"Congratulations",status:true,result})
})
}
})
}

module.exports = { getLandingPage, registerUser, signIn,getDashboard };
