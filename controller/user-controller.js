import User from "../model/userSchema.js";
import nodemailer from "nodemailer";
export const userLogIn = async (request, response) => {
  try {
    let user = await User.findOne({
      username: request.body.username,
      password: request.body.password,
    });
    if (user) {
      return response
        .status(200)
        .json(`${request.body.username} login successfull`);
    } else {
      return response.status(401).json("Invalid Login");
    }
  } catch (error) {
    response.json("Error: ", error.message);
  }
};

export const userSignUp = async (request, response) => {
  try {
    const exist = await User.findOne({ username: request.body.username });
    if (exist) {
      return response
        .status(401)
        .messagejson({ message: "User already exist" });
    }
    const user = request.body;
    const newUser = new User(user);
    await newUser.save();
    response
      .status(200)
      .json(`${user.firstName} has been successfully registered`);
  } catch (error) {
    response.json("Error: ", error.message);
  }
};

export const sendMailConfirmation = (req, res) => {
  //   const nodemailer = require("nodemailer");

  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "sachinpurohit.text@gmail.com", // generated ethereal user
        pass: "vvtssfmuyiroxvsy", // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Ecomm" <sachinpurohit.text@gmail.com>', // sender address
      to: "sachinpurohit1995@protonmail.com, sachinpurohit.text@gmail.com", // list of receivers
      subject: "Order Conifrmation ✔", // Subject line
      html: "<b>The Details of your orders:</b>", // html body
    });
    if (info.messageId) {
      res.send("Order email sent.");
    } else {
      res.send("Error sending Order mail.");
    }
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  }

  main().catch(console.error);
};
