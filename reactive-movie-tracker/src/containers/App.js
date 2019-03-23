import React, { Component } from 'react';
import  MovieHolder  from './MovieHolder'
import { fetchData } from '../utilities/api'
import { APIkey } from '../utilities/key.js'
import { connect } from 'react-redux'
import { addMovies } from '../actions'
import Header  from './Header'
import { Route, Switch, Redirect } from 'react-router-dom'
import Login from './Login'
import { cleanMovies } from '../utilities/cleaner'
import { MovieDetails } from '../components/MovieDetails'
import { PageNotFound } from '../components/PageNotFound'


class App extends Component {
  componentDidMount () {
    this.getMovieData()
  }
  getMovieData = async () => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${APIkey}&language=en-US&page=1`
    const response = await fetchData(url)
    const finalData = cleanMovies(response.results)
    this.props.addMovies(finalData)
  }
  findMovieToRender = (id) => {
    const MovieToRender = this.props.movies.find(movie => movie.id === id)
    const movie =  < MovieDetails { ...MovieToRender } />
    return MovieToRender ? movie : false
  }
  render() {
    
    return (
      <div className="App">
        <Route path='/' component={Header}/>
        <Switch>
          <Route exact path='/' component={MovieHolder}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/movie/:id' render={({match}) => {
            const movie = this.findMovieToRender(parseInt(match.params.id))
            return movie || <PageNotFound /> 
          }}/>
          <Route component={PageNotFound}/>
        </Switch>
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  movies: state.movies,
  activeUser: state.activeUser
})

export const mapDispatchtoProps = (dispatch) => ({
  addMovies: (movies) => dispatch(addMovies(movies))
})

export default connect(mapStateToProps, mapDispatchtoProps)(App);
