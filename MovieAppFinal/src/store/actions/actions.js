import { ADD_TO_FAV } from "./type";

export function addToFav(movieInfo, quantity){
    return {
        type: ADD_TO_FAV,
        movieInfo,
        quantity
    }
}