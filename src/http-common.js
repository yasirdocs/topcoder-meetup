import axios from "axios";

export default axios.create({
  baseURL: "http://10.140.242.143:8000/api/",
  headers: {
    "Content-type": "application/json"
  }
});
