import { legacy_createStore as createStore, combineReducers } from 'redux'

import { userReducer } from './user.reducer'
import { stationsReducer } from './stations.reducer'
import { currentlyReducer } from './currently.reducer'

const rootReducer = combineReducers({
    stationsModule: stationsReducer,
    userModule: userReducer,
    currentlyModule: currentlyReducer,
})


const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer, middleware)

// For debug:
// store.subscribe(() => {
//     console.log('**** Store state changed: ****')
//     console.log('storeState:\n', store.getState())
//     console.log('*******************************')
// })



