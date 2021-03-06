import { loginWithGoogle, signOutGoogle } from "../firebase";
import { retreiveFavs } from "./charsDuck"

// constantes
let initialDate = {
  loggedIn: false,
  fetching: false
};

let LOGIN = "LOGIN";
let LOGIN_SUCCESS = "LOGIN_SUCCESS";
let LOGIN_ERROR = "LOGIN_ERROR";

let LOG_OUT = "LOG_OUT";

// reducer
export default function reducer(state = initialDate, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        fetching: true
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        fetching: false,
        ...action.payload,
        loggedIn: true
      };
    
    case LOG_OUT:
      return {
        ...initialDate,
      }

    case LOGIN_ERROR:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
}

//aux
function saveStorage(storage) {
  localStorage.storage = JSON.stringify(storage);
}

export let logOutAction = () => (dispatch, getState) => {
  signOutGoogle()
  dispatch({
    type: LOG_OUT
  })
  localStorage.removeItem('storage')
}

// action (action creator)

export let restoreSessionAcion = () => dispatch => {
  let storage = localStorage.getItem('storage')
  if (storage !== null){
    storage = JSON.parse(storage)
    if (storage && storage.user) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: storage.user
      })
    }
  }
}

export let doGoogleLoginAction = () => (dispatch, getState) => {
  dispatch({
    type: LOGIN
  });

  return loginWithGoogle()
    .then(user => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        }
      });
      saveStorage(getState());
      retreiveFavs()(dispatch, getState)
    })
    .catch(e => {
      console.log("====================================");
      console.log(e);
      dispatch({
        type: LOGIN_ERROR,
        payload: e.message
      });
      console.log("====================================");
    });
};
