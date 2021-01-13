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
    console.log('value==>',val)
     //let data = val.client_id ='Bearer';
    //console.log('data==>',data)
    //console.log('value==>',val)
    return async dispatch => {
        try{
        if(val.email&&val.password){
            
            // let  data  = await callApi(LOGIN_URL, 'POST', val);
            let  {data}  = await axiosLogin.post(LOGIN_URL, val);
            const details = data.msg;
            console.log(data.msg)
            console.log('logindata====>>>>',data);
            if(data.ack===true) {
            // set token in localStorage
            localStorage.setItem('profileImg', data.data.userDetails.profilePicture);
            localStorage.setItem('username', data.data.userDetails.lastName?(data.data.userDetails.firstName+" "+data.data.userDetails.lastName):data.data.userDetails.firstName);
            localStorage.setItem('access-token', data.data.token);
            localStorage.setItem('userId', data.data.userDetails._id);
           // localStorage.setItem('itemName', "#")
            localStorage.setItem('userType', data.data.userDetails.userType?data.data.userDetails.userType:'');
            localStorage.setItem('permission', data.data.permission?data.data.permission:'');
           console.log(data.data.userDetails._id);
           const a = localStorage.getItem('userId')
             //console.log(a)
          // console.log(details)
        //   if(localStorage.getItem('userType')=='landlord'||localStorage.getItem('userType')=='customer'){
        //     toast.info(details, {
        //         position: toast.POSITION.TOP_CENTER
        //     });
        // }
            
            
            //console.log("su")
            // set token in redux
            dispatch({ type: AUTH_SUCCESS, payload: {token: data.data.token, 
                userId:data.data.userDetails._id,
                profileImg:data.data.profilePicture,userType:data.data.userType?data.data.userType:'',permission:data.data.permission?data.data.permission:''} });
            
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
        
        localStorage.removeItem('access-token');
        localStorage.removeItem('itemName')
        localStorage.removeItem('adminId');
        dispatch({ type: AUTH_LOGOUT, payload: {} })
    }
}