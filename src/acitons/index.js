// {
//     type:"ADD_MOVIES",
//     movie:[{name:"Superman"}]
// }


//action types
export const ADD_MOVIES="ADD_MOVIES"; //this variable is used so if we want to change the type at multiple places we can simply change the variable value here only and the type value would be updated everywhere in the app.
export const ADD_FAVOURITE="ADD_FAVOURITE";
export const REMOVE_FROM_FAVOURITE="REMOVE_FROM_FAVOURITE";
export const SET_SHOW_FAVOURITES="SET_SHOW_FAVOURITES";
export const ADD_MOVIE_TO_LIST="ADD_MOVIE_TO_LIST";
export const ADD_SEARCH_RESULT="ADD_SEARCH_RESULT";


//action creators:- In React we use Action creator to return actions.

    export function addMovies(movies){
        return{
            type:ADD_MOVIES,
            // movie:movie  // Note:-short-hand to write this if the key and properties are having same shown below
            movies
        }
    }

    export function addFavourite(movie){
    return{
        type:ADD_FAVOURITE,
        movie
        }
    }

    export function removeFromFavourites(movie){
        return{
            type:REMOVE_FROM_FAVOURITE,
            movie
            }
        }

     export function setShowFavourites(val){
        return{
        type:SET_SHOW_FAVOURITES,
        val
            }
        }

    export function addMovieToList(movie){
        return{
        type:ADD_MOVIE_TO_LIST,
        movie
        }
    }

    export function handleMovieSearch(movie){
        const url=`http://www.omdbapi.com/?apikey=3ca5df7&t=${movie}`;
        return function(dispatch){
            fetch(url)
            .then(response=>response.json())
            .then(movie=>{
                console.log("movie",movie);

                //dispatch an action
                dispatch(addMovieSearchResult(movie));
            })
        }

    }

    export function addMovieSearchResult(movie){
        return{
            type:ADD_SEARCH_RESULT,
            movie
        };
    }
