const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");

//* sendOtp
exports.sendOTP = async (req, res) => {
  try {
    // fetch email from request body
    const { email } = req.body;

    // check if user is already exist
    const checkUserPresent = await User.findOne({ email });

    //if user already exist , then return a response
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "user already registered",
      });
    }

    //? generate otp
    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log("OTP generated: ", otp);

    //check unique otp or not
    const result = await OTP.findOne({ otp: otp });

    while (result) {
      otp = otpGenerator(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
    }

    
  } catch (error) {

  }
};

//sign up

//log in

//changePassword
