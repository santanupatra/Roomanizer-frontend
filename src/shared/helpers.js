
//export const apiBaseUrl = `http://127.0.0.1:5073`;
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

export const getAuthToken = localStorage.getItem("access-token");
export const getAuthUserId = localStorage.getItem("adminId");
export const getAuthUserImage = localStorage.getItem("profileImg");
export const getUserType = localStorage.getItem("userType");
export const getImageUrl = imgUrl => apiBaseUrl + imgUrl;