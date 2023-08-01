import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import Reactotron from '../ReactotronConfig'
import thunk from 'redux-thunk'


//import reducers

import { 
    authReducer
} from './reducers/authReducer'
import { RESET_AUTH } from './constants/authConstants'
import { profileReducer } from './reducers/profileReducer'
import { homeReducer } from './reducers/homeReducer'




const reducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    home: homeReducer 
})

const rootReducer = (state, action) => {
    if (action.type === RESET_AUTH) {
      return reducer(undefined, action)
    }
  
    return reducer(state, action)
}

const middleware = [ thunk ];


const store = createStore(rootReducer, compose(applyMiddleware(...middleware), Reactotron.createEnhancer()));

export default store; 