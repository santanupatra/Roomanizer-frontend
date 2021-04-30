import axios from "axios";
import { apiBaseUrl } from "../shared/helpers";
import { getAuthToken } from "../shared/helpers";
// console.log("cghf",localStorage.getItem('access-token'))
// console.log("loginuseId",localStorage.getItem('userId'))
// console.log("loginuseId",localStorage.getItem('userType'))

const axiosInstance = axios.create({
  baseURL: apiBaseUrl + "/web/",
  headers: { Authorization: `Bearer ${getAuthToken}` },
});
export default axiosInstance; 
export const axiosApiCall = axios.create({
  baseURL: apiBaseUrl + "/web/",
  headers: { Authorization: `Bearer ${getAuthToken}` },
});
export const axiosLogin = axios.create({
    baseURL: apiBaseUrl + "/web/",
});
export const callApi = (url, method, data) => {
  const dataObj = !data
    ? {}
    : {
        [["GET", "DELETE"].indexOf(method.toUpperCase()) !== -1
          ? "params"
          : "data"]: data,
      };
  //console.log("dataObj===>>>", dataObj);
  return new Promise((resolve, reject) => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('access-token')}` };
    return axiosInstance({
      url,
      method: method.toUpperCase(),
      headers,
      ...dataObj,
    })
      .then((response) => {
        // console.log("callApi===>>>>", response);
        if (response.status === 200) {
          resolve(response.data);
          //alert(response.data.details);
        } else {
          reject();
        }
      })
      .catch((error) => {
        reject();
        console.log(error);
      });
  });
};

