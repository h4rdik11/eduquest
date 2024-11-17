import axios from "./axiosConfig";

export async function getConfigApi() {
  return await axios.get(`/api/config`);
}

export async function updateConfigApi(data: any) {
  return await axios.post(
    `/api/config${data?._id ? `/${data?._id}` : ""}`,
    data
  );
}
