import axios from "./axiosConfig";

export async function getQuestionsFromTopicsApi(topics: string[]) {
  return await axios.get(`/api/question?topic=${topics[0]}&topic=${topics[1]}`);
}

export async function getAllQuestionsApi() {
  return await axios.get(`/api/question/all`);
}

export async function addQuestionApi(data: any) {
  return await axios.post("/api/question", {
    data,
  });
}

export async function deleteQuestionApi(id: string) {
  return await axios.delete(`/api/question/${id}`);
}
