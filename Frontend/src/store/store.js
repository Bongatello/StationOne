import { legacy_createStore as createStore, combineReducers } from 'redux'

import { carReducer } from './car.reducer'
import { userReducer } from './user.reducer'
import { reviewReducer } from './review.reducer'
import { stationsReducer } from './stations.reducer'
import { currentlyReducer } from './currently.reducer'

const rootReducer = combineReducers({
    carModule: carReducer,
    stationsModule: stationsReducer,
    userModule: userReducer,
    currentlyModule: currentlyReducer,
    
    reviewModule: reviewReducer,
})


const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer, middleware)

// For debug:
// store.subscribe(() => {
//     console.log('**** Store state changed: ****')
//     console.log('storeState:\n', store.getState())
//     console.log('*******************************')
// })



