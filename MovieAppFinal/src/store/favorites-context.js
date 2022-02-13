import { createContext,useState } from "react";

const FavoriteContext = createContext({
   favorites:[],
   total_favorites:0,
   addFavorite:(favoriteMovie)=>{},
   removeFavorite:(movieId)=>{},
   itemIsFavorite:(movieId)=>{}
});

export function FavoritesContextProvider(props){
    const [userFavorites,setUserFavorites]=useState([]);

    function addFavoriteHandler(favoriteMovie){
        setUserFavorites(userFavorites.concat(favoriteMovie));
    }
    function removeFavoriteHandler(movieId){
        setUserFavorites((prevUserFavorites)=>{
            return prevUserFavorites.filter(movie=> movie.id !== movieId);
        })
    }
    function itemtIsFavoriteHandler(movieId){
       return userFavorites.some(movie=>movie.id === movieId);
    }
    const context = {
        favorites:userFavorites,
        total_favorites:userFavorites.length,
        addFavorite:addFavoriteHandler,
        removeFavorite:removeFavoriteHandler,
        itemIsFavorite:itemtIsFavoriteHandler
    };

  
    return <FavoriteContext.Provider value={context}>
        {props.children}
    </FavoriteContext.Provider>
}

export default FavoriteContext;