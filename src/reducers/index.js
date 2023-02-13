import { combineReducers } from "redux";
import { ADD_MOVIES, ADD_SEARCH_RESULT} from "../acitons";
import { ADD_FAVOURITE } from "../acitons";
import { REMOVE_FROM_FAVOURITE } from "../acitons";
import { SET_SHOW_FAVOURITES } from "../acitons";
import { ADD_MOVIE_TO_LIST } from "../acitons";

const initialMovieState={
    list:[],
    favourites:[],
    showFavourites:false
}


export function movies(state=initialMovieState,action){
    console.log("MOVIES_REDUCER");
    // if(action.type === ADD_MOVIES){
    //     return{
    //         ...state,
    //         list:action.movie
    //     }
    // }
    // return state;
    switch(action.type){
        case ADD_MOVIES:
            return{             //Note:- The return type of reducer function will depend upon the initial State of the Application i.e. if the initial state of the App is an array or an object the return type of the reducer function will be an array or and object respectively;
                                          //Since here the initialMovieState is an object here so each return statement here is returning an object only. 
                ...state,    // ...state:- Here spread operator has been used.
                list:action.movies
            }
        case ADD_FAVOURITE:
            return{
                ...state,
                favourites:[action.movie,...state.favourites]
            }
        case REMOVE_FROM_FAVOURITE:
            const filteredArray=state.favourites.filter(
                movie=>movie.Title!==action.movie.Title
                );    
                return{
                 ...state,
                 favourites:filteredArray
                }
         case SET_SHOW_FAVOURITES:
            return{
                ...state,
                showFavourites:action.val
            }
         case ADD_MOVIE_TO_LIST:
            return{
                ...state,
                list:[action.movie,...state.list]
            };

            default:
                return state;
    }

}

         const initialSearchState={
           result:{},
           showSearchResult:false
         }

        export function search(state=initialSearchState,action){
            // ADD_SEARCH_RESULT
            console.log("SEARCH_REDUCER");
           switch(action.type){
            case ADD_SEARCH_RESULT:
                return{
                    ...state,
                    result: action.movie,
                    showSearchResult:true
                }
            case ADD_MOVIE_TO_LIST:
                return{
                    ...state,
                   showSearchResult:false
                };  

            default: return state;
           }
        }

        // const initialRootState={
        //     movies:initialMovieState,
        //     search:initialSearchState
        // }

         //we can have only one export default function.
        // export default function rootReducer(state=initialRootState,action){  //here we will return the state.
        //     return{
        //         movies:movies(state.movies,action),
        //         search:search(state.search,action)
        //     }
        // }

        export default combineReducers({  //here we are passing the objects and redux will take care of everything.
            movies,
            search
        });