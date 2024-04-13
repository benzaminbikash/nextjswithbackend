import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import { User } from "@/model/User";
import { DatabaseConnection } from "./DatabaseConnection";

DatabaseConnection();

export async function EmailConfiguration({ email, emailType, user }) {
  try {
    const hashedToken = await bcrypt.hash(user.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(user, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 60 * 60 * 1000,
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(user, {
        $set: {
          forgetPasswordToken: hashedToken,
          forgetPasswordToken: Date.now() + 60 * 60 * 1000,
        },
      });
    }
    var transport = nodemailer.createTransport({
      host: process.env.HOST,
      port: process.env.TRANSPORT_PORT,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    const info = await transport.sendMail({
      from: "benzaminbikash@gmail.com", // sender address
      to: email,
      subject:
        emailType == "VERIFY"
          ? "Please Verify your account"
          : "Reset your password",

      html: `<p>Click <a href='${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}'>here</a> to ${
        emailType == "VERIFY" ? "Verify your account" : "Reset your account"
      } </p> <h1>${hashedToken}</h1> `, // html body
    });
    return info;
  } catch (error) {
    throw new Error(error.message);
  }
}
