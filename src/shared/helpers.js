export const apiBaseUrl = `http://127.0.0.1:5073`;
 //export const apiBaseUrl = `http://111.93.169.90:7082`;
 console.log("localStorage.getItem",localStorage.getItem("access-token"));
export const updateObject = (oldObj, newObj) => {
    return { ...oldObj, ...newObj };
}

export const getMethod = (type)=>{
    let obj = {
        ADD:"post",
        UPDATE:"put",
        DELETE:"delete",
        GET:"get",
        GET_ALL:"get"
    }
    return obj[type];
}

export const firebaseConfig = {
    apiKey: "AIzaSyDJF0iY63zqz4FfTZdY49ykHkP8wQQxPs0",
    authDomain: "roomanizer-9ca36.firebaseapp.com",
    databaseURL: "https://roomanizer-9ca36.firebaseio.com",
    projectId: "roomanizer-9ca36",
    storageBucket: "roomanizer-9ca36.appspot.com",
    messagingSenderId: "901923253397",
    appId: "1:901923253397:web:03b030e7c3d077d846bf9c",
    measurementId: "G-NG6536VMG9"
  };
export const getAuthToken = localStorage.getItem("access-token");
export const getAuthUserId = localStorage.getItem("adminId");
export const getAuthUserImage = localStorage.getItem("profileImg");
export const getUserType = localStorage.getItem("userType");
export const getImageUrl = imgUrl => apiBaseUrl + imgUrl;