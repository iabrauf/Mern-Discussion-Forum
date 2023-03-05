const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "mrabdulrauf6@gmail.com",
    pass: "gqmasmhygbzkxwnt ",
  },
});
module.exports = {
  verifyUserEmail: async function verifyUserEmail(id,name, email, token) {
    try {
      let info = await transporter.sendMail({
        from: "mrabdulrauf6@gmail.com",
        to: email,
        subject:
          "Hello " + name + " Please verify your email by clicking the link",
        html: "http://localhost:3000/" + "verifyUserEmail/" + id + "/" + token,
      });
    } catch (error) {
      console.log("email not sent!");
      console.log(error);
    }
  },
};
