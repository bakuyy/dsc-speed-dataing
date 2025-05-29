import axios from "axios";

export const sendSignInInfo = (values: { email: string; password: string; secretKey: string }) =>
  axios.post("/api/login", values);