// export const apiBaseUrl = `http://127.0.0.1:5073`;
export const apiBaseUrl = `http://111.93.169.90:7082`;
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

// export const firebaseConfig = {
//     apiKey: "AIzaSyD9tWbkQzOP6L9rf4w-tgodJPeOURgsybo",
//     authDomain: "neybor-f1cc9.firebaseapp.com",
//     databaseURL: "https://neybor-f1cc9.firebaseio.com",
//     projectId: "neybor-f1cc9",
//     storageBucket: "neybor-f1cc9.appspot.com",
//     messagingSenderId: "505568010159",
//     }
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