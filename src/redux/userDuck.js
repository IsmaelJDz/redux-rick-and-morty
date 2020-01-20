// constantes
let initialDate = {
  loggedIn: false
}
let LOGIN = "LOGIN"

// reducer
export default function reducer(state = initialDate, action) {
  switch (action.type) {
    case LOGIN: 
      return {

      }
  
    default: return state
  }
}

// action (action creator) 