import axiosInstance from "./axios/axiosInstance";

export async function patchCreateMessage(message: string, userId: string) {
  if (message) {
    const fetchdata = await axiosInstance.patch(
      `/message/create/${userId}`,
      {message:message},
      { headers: { "content-type": "application/x-www-form-urlencoded" } }
    );
    return fetchdata;
  }
}
export async function postCreateUser(fullname: string) {
  if (fullname) {
    const fetchdata = await axiosInstance.post(
      `/message/create`,
      { fullname: fullname },
      {
        headers: { "content-type": "application/x-www-form-urlencoded" },
      }
    );
    return fetchdata;
  }
}
export async function getMessages() {
 
    const fetchdata = await axiosInstance.get("/message/get");
    return fetchdata;
  
}
export async function getUserDetails(userId: string) {
  if (userId) {
    const fetchdata = axiosInstance.get(`message/user/${userId}`);
    return fetchdata;
  }
}
