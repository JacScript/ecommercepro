import { loginFailure, loginStart, loginSuccess , registerFailure, registerStart, registerSuccess, logoutFailure, logoutStart, logoutSuccess} from "./userSlice.js";
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


// export const logout = async (dispatch) => {
//   // Start the logout process by dispatching a logoutStart action
//   dispatch(logoutStart());
//   try {
//     // Send a logout request to the server
//     const res = await publicRequest.post("/auth/logout");

//     // Destructure the accessToken from the server response
//     const { accessToken } = res.data;

//     // Remove the access token from local storage if it exists
//     if (accessToken) {
//       localStorage.removeItem("accessToken");
//     }

//     // Dispatch a logoutSuccess action with the response data
//     dispatch(logoutSuccess(res.data));
//   } catch (err) {
//     // If an error occurs, dispatch a logoutFailure action
//     dispatch(logoutFailure());
//   }
// };

export const logout = async (dispatch) => {
  dispatch(logoutStart()); // Start the logout process
  
  try {
    // Send a logout request to the server
    await publicRequest.post("/auth/signout");

    // Remove any access token or user data from local storage
    localStorage.removeItem("accessToken");

    // Dispatch success action to update the state
    dispatch(logoutSuccess());
  } catch (err) {
    // Dispatch failure action if an error occurs
    dispatch(logoutFailure());
  }
};
