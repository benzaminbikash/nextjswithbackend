import { headers, cookies } from "next/headers";
import jwt from "jsonwebtoken";
export const getUserData = async (req, res) => {
  try {
    //   const headinstance = headers();
    //   const token = headinstance.get("authorization").split(" ")[1];
    const headinstance = cookies();
    let token = headinstance.get("token")?.value;
    const decode = jwt.verify(token, process.env.SECRET);
    return decode._id;
  } catch (error) {
    throw new Error(error.message);
  }
};
