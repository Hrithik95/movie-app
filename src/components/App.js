import React from "react";
import {data} from "../data";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
// import { ADD_MOVIES } from "../acitons";
import { addMovies,addFavourite,setShowFavourites } from "../acitons";
import { StoreContext } from "../index";

class App extends React.Component {
  
  componentDidMount(){
    const{store}=this.props;
    //1.make an api call
    //2.dispatch action
    store.subscribe(()=>{
      console.log("UPDATED");
      this.forceUpdate();//should never use this method to update our app.
    })
    store.dispatch(addMovies(data));
    console.log(store.getState());

  }

  isMovieFavourite=(movie)=>{
     const{movies}=this.props.store.getState();
     const index=movies.favourites.indexOf(movie);
     if(index !== -1){
     //found the movie
      return true;
     }
     return false;
  }

  onChangeTab=(val)=>{
    this.props.store.dispatch(setShowFavourites(val))
  }
  
  
  render(){
    const{movies,search}=this.props.store.getState(); //{movies:{}, search:{}}
    const {list,favourites,showFavourites}=movies;//list:[] and favourites:[]
    const displayMovies=showFavourites?favourites:list;
    // console.log("render");

    return (
      <div className="App">
        <Navbar dispatch={this.props.store.dispatch} search={search}/>
        <div className="main">
          <div className="tabs">
            <div className={` tab ${showFavourites?"":"active-tabs"} `} onClick={()=>this.onChangeTab(false)}>Movies</div>     {/* instead of passing the function we are calling it because we need to pass the val here.*/}
            <div className={` tab ${showFavourites?"active-tabs":""} `} onClick={()=>this.onChangeTab(true)}>Favourites</div>
          </div>
            <div className="list">
            {displayMovies.map((movie,index)=>(
              <MovieCard 
              movie={movie} 
              key={`movies-${index}`} 
              dispatch={this.props.store.dispatch}
              isFavourite={this.isMovieFavourite(movie)}
              />
  
            ))
            }
  
           </div>
           {displayMovies.length===0?<div className="no-movies">No Movies to display!</div>:null}
  
        </div>
      </div>
    );
  }
  
}

// class AppWrapper extends React.Component{
//   render(){
//     return(
//   <StoreContext.Consumer>
//     {(store)=>{<App store={store}/>}}{/*value named in Consumer component should be same as Provider component value name*/}
//   </StoreContext.Consumer>
//     );
//   }
// }

// function callback(state){
//   return{
//     movies:state.movies,
//     search:state.search
//   }
// }

// const connectedAppComponent=connect(callback)(App);

// export default connectedAppComponent;

// export default AppWrapper;
export default App;