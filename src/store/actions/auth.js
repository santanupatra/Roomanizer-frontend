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
        
            // let  data  = await callApi(LOGIN_URL, 'POST', val);
            let  {data}  = await axiosLogin.post(LOGIN_URL, val);
            const details = data.msg;
            console.log(data.msg)
            console.log('logindata====>>>>',data);
            if(data.ack===true) {
            // set token in localStorage
            localStorage.setItem('profileImg', data.data.profilePicture);
            localStorage.setItem('access-token', data.token);
            localStorage.setItem('adminId', data.data._id);
            localStorage.setItem('userType', data.data.userType?data.data.userType:'');
            localStorage.setItem('permission', data.data.permission?data.data.permission:'');
            console.log(details)
            toast.info(details, {
                position: toast.POSITION.TOP_CENTER
            });
            
            //console.log("su")
            // set token in redux
            dispatch({ type: AUTH_SUCCESS, payload: {token: data.token, adminId: data.data._id,profileImg:data.data.profilePicture,userType:data.data.userType?data.data.userType:'',permission:data.data.permission?data.data.permission:''} });
            
           // return data;
        } else {
            //console.log(err)
            console.log(details)
            toast.error(details, {
                position: toast.POSITION.TOP_CENTER
            });
            dispatch({ type: AUTH_FAIL, payload: {} })
            
        }
    }
}

/**
 * logout api call
 */
export const logout = () => {
    return async dispatch => {
        localStorage.removeItem('access-token');
        localStorage.removeItem('adminId');
        dispatch({ type: AUTH_LOGOUT, payload: {} })
    }
}