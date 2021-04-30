import {AUTH_SUCCESS, AUTH_LOGOUT, AUTH_FAIL} from '../actionTypes';
import { createBrowserHistory } from 'history';
import { NotificationManager } from 'react-notifications'
import 'react-notifications/lib/notifications.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import { callApi } from '../../api';
import {axiosLogin} from '../../api';
import { LOGIN_URL } from '../../shared/allApiUrl';
const history = createBrowserHistory()

/**
 * login api call
 * @param {Object} data
 */
export const login = (val) => {
    // console.log('value==>',val)
     //let data = val.client_id ='Bearer';
    //console.log('data==>',data)
    //console.log('value==>',val)
    return async dispatch => {
        try{
        if(val.email&&val.password){
            
            // let  data  = await callApi(LOGIN_URL, 'POST', val);
            let  {data}  = await axiosLogin.post(LOGIN_URL, val);
            const details = data.msg;
            // console.log(data.msg)
             //console.log('logindata====>>>>',data.data);
            if(data.ack===true) {
            // set token in localStorage
            localStorage.setItem('profileImg', data.data.userDetails.profilePicture);
            localStorage.setItem('username', data.data.userDetails.lastName?(data.data.userDetails.firstName+" "+data.data.userDetails.lastName):data.data.userDetails.firstName);
            localStorage.setItem('access-token', data.data.token);
            localStorage.setItem('userId', data.data.userDetails._id);
           // localStorage.setItem('itemName', "#")
            localStorage.setItem('userType', data.data.userDetails.userType?data.data.userDetails.userType:'');
            localStorage.setItem('permission', data.data.userDetails.permission?data.data.userDetails.permission:'');
        //    console.log(data.data.userDetails._id);
            const a = localStorage.getItem('userId')
            console.log(a,"userId",localStorage.getItem('access-token'))
         
            // set token in redux
            dispatch({ type: AUTH_SUCCESS, payload: {token: data.data.token, 
                userId:data.data.userDetails._id,
                profileImg:data.data.userDetails.profilePicture,userType:data.data.userDetails.userType?data.data.userDetails.userType:'',permission:data.data.userDetails.permission?data.data.userDetails.permission:''} });
            
           // return data;
        } else {
            //console.log(err)
            console.log(details)
            toast.error(details, {
                position: toast.POSITION.TOP_CENTER
            });
            dispatch({ type: AUTH_FAIL, payload: {} })
            
        }
    }else{
        toast.error('Please enter empty field', {
            position: toast.POSITION.TOP_CENTER
        });
    }
}catch{
    toast.error('Invalid email', {
        position: toast.POSITION.TOP_CENTER
    });
}
    }
}

/**
 * logout api call
 */
export const logout = () => {
    return async dispatch => {
        
            localStorage.removeItem("access-token");
            localStorage.removeItem('userId')
            localStorage.removeItem('userType')
        dispatch({ type: AUTH_LOGOUT, payload: {} })
    }
}