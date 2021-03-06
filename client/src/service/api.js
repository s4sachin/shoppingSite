import axios from "axios";
const url = "";

export const authenticateLogin = async (user) => {
  try {
    return await axios.post(`${url}/login`, user);
  } catch (error) {
    console.log("error while calling login API: ", error);
  }
};

export const authenticateSignup = async (user) => {
  try {
    return await axios.post(`${url}/signup`, user);
  } catch (error) {
    console.log("error while calling Signup API: ", error);
  }
};

export const getProductById = async (id) => {
  try {
    return await axios.get(`${url}/product/${id}`);
  } catch (error) {
    console.log("Error while getting product by id response", error);
  }
};

export const sendMail = async () => {
  try {
    return await axios.get(`${url}/sendmail`);
  } catch (error) {
    console.log("Error while sending mail", error);
  }
};
