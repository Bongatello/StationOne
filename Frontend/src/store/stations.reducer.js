//export const SET_CARS = 'SET_CARS'
//export const SET_CAR = 'SET_CAR'
//export const REMOVE_CAR = 'REMOVE_CAR'
//export const ADD_CAR = 'ADD_CAR'
//export const UPDATE_CAR = 'UPDATE_CAR'
//export const ADD_CAR_MSG = 'ADD_CAR_MSG'

//export const SET_STATIONS
//export const SET_STATION
//export const REMOVE_STATION

//const initialState = {
//cars: [],
//car: null
//}
//
//export function carReducer(state = initialState, action) {
//    var newState = state
//    var cars
//    switch (action.type) {
//        case SET_CARS:
//            newState = { ...state, cars: action.cars }
//            break
//        case SET_CAR:
//            newState = { ...state, car: action.car }
//            break
//        case REMOVE_CAR:
//            const lastRemovedCar = state.cars.find(car => car._id === action.carId)
//            cars = state.cars.filter(car => car._id !== action.carId)
//            newState = { ...state, cars, lastRemovedCar }
//            break
//        case ADD_CAR:
//            newState = { ...state, cars: [...state.cars, action.car] }
//            break
//        case UPDATE_CAR:
//            cars = state.cars.map(car => (car._id === action.car._id) ? action.car : car)
//            newState = { ...state, cars }
//            break
//        case ADD_CAR_MSG:
//            newState = { ...state, car: { ...state.car, msgs: [...state.car.msgs || [], action.msg] } }
//            break
//        default:
//    }
//    return newState
//}

const initialState = {
    station: [],
    songs: null,
}

export function stationsReducer(state = initialState, action = {}) {
    //switch (action.type) {
    //    case SET_REVIEWS:
    //        return { ...state, currentlyPlaying: action.currentlyPlaying }
    //    case ADD_REVIEW:
    //        return { ...state, reviews: [...state.reviews, action.review] }
    //    case REMOVE_REVIEW:
    //        return { ...state, reviews: state.reviews.filter(review => review._id !== action.reviewId) }
    //    case UPDATE_REVIEW:
    //        return {
    //            ...state,
    //            reviews: state.reviews.map(review =>
    //                review._id === action.review._id ? action.review : review
    //            )
    //        }
    //        default:
            return state
    //}
}