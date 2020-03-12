import React from 'react'
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { StoreTypes } from './../../types/index'
import { ApiTypes } from './../../types/api'
import { Page404 } from './../404'
import {
  Title,
  AboutWrapper,
  Description,
  Info,
  Poster,
} from './styles'
import { Button } from './../../common/styles'

interface Props {
  store: StoreTypes
  match: any
  history: any
}

@inject("routing")
@inject("store")
@observer
export class AboutFilm extends React.PureComponent<Props> {

  static defaultProps = {
    store: {} as StoreTypes,
    match: {
      params: {
        id: ''
      }
    }
  }

  componentDidMount() {
    const { store } = this.props

    if (!store.movies) {
      store.getMovies()
    }
  }

  checkCurrentFilm = (results: ApiTypes.Movie[], id: number): boolean => {
    return results.some((item: ApiTypes.Movie) => item.id == id)
  }

  filterCurrentFilm = (movies: ApiTypes.Movies, id: number) => {
    const data = toJS(movies)
    const { results } = data
    const currentFilm = results.filter((item: ApiTypes.Movie) => item.id == id)[0]

    if(currentFilm){
      const {
        title,
        release_date,
        original_language,
        overview,
        poster_path,
        popularity,
      } = currentFilm
  
      return (
        <AboutWrapper>
          {poster_path && <Poster src={`https://image.tmdb.org/t/p/w500/${poster_path}`} />}
          <Title>{title}</Title>
          <Description>{overview}</Description>
          <Info>Release date: {release_date}</Info>
          <Info>language: {original_language}</Info>
          <Info>Popularity: {popularity}</Info>
          <Button onClick={this.props.store.goBack}>Go back</Button>
        </AboutWrapper>
      )
    } else {
      return <Page404/>
    }
  }

  render() {
    const { store, match } = this.props
    const { id } = match.params

    if (store.movies) {
      return <>{this.filterCurrentFilm(store.movies, id)}</>
    } else {
      return null
    }

  }
}

export default withRouter(AboutFilm)

