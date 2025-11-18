import axios from "axios";
const res = await api.get("/usuarios");

export default axios.create({
  baseURL: "http://localhost:3000",
});
