import { loginFailure, loginStart, loginSuccess , registerFailure, registerStart, registerSuccess} from "./userSlice.js";
import { publicRequest } from "../requestMethods";



export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    const { accessToken } = res.data;

    // Save the token in localStorage
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    }

    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};


// export const login = async (dispatch, user) => {
//   dispatch(loginStart());
//   try {
//     const res = await publicRequest.post("/auth/login", user);
//     dispatch(loginSuccess(res.data));
//   } catch (err) {
//     dispatch(loginFailure());
//   }
// };


export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    const { accessToken } = res.data;
    
    // Save the token in localStorage
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    }

    dispatch(registerSuccess(res.data));
  } catch (err) {
    dispatch(registerFailure());
  }
};

// export const register = async(dispatch, user) => {
//   dispatch(registerStart());
//   try{
//     const res = await publicRequest.post("/auth/register", user);
//     dispatch(registerSuccess(res.data));
//     } catch(err) {
//       dispatch(registerFailure());
//     }
// }