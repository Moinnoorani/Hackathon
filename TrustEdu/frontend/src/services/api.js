import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const createPrediction = (data) =>
  API.post("/predict", data);

export const chatWithTutor = (data) =>
  API.post("/tutor/chat", data);

export const verifyRecord = (recordId) =>
  API.get(`/verify/${recordId}`);
