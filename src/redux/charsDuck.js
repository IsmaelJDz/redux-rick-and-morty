import axios from "axios";

//Constantes
let initialData = {
  fetching: false,
  array: [],
  current: {}
}

let URL = "https://rickandmortyapi.com/api/character";
let GET_CHARACTERS = "GET_CHARACTERS";
let GET_CHARACTERS_SUCCESS = "GET_CHARACTERS_SUCCESS";
let GET_CHARACTERS_ERROR = "GET_CHARACTERS_ERROR";

//Reducer
export default function reducer(state = initialData, action) {
  switch (action.type) {
    case GET_CHARACTERS:

    return {
      ...state,
      fetching: true
    }

    case GET_CHARACTERS_SUCCESS: 

    return {
      ...state,
      array: action.payload,
      fetching: false
    }

    case GET_CHARACTERS_ERROR:
    return {
      ...state,
      fetching: false,
      error: action.payload
    }
  
    default: return state;

  }
}

//Actions (thunks)

export let getCharacteresAction = () => (dispatch, getState) => {

  dispatch({
    type: GET_CHARACTERS,  
  })

  return axios.get(URL)
    .then(res => {
      dispatch({
        type: GET_CHARACTERS_SUCCESS,
        payload: res.data.results
      })
    })   
    .catch(err => {
      dispatch({
        type: GET_CHARACTERS_ERROR,
        payload: err.response.message
      })
    }) 

}

