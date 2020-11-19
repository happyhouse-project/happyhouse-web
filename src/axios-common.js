import axios from "axios";

//axios 객체 미리 setting
export default axios.create({
  baseURL: "http://localhost/happyhouse",
  headers: {
    "Content-type": "application/json",//json으로 보내요~to server
  }
});