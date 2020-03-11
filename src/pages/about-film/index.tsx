import React from 'react'
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { StoreTypes } from './../../store'
import { ApiTypes } from './../../types/api'
import {
  Title,
  AboutWrapper,
  Description,
  Info,
  Poster,
} from './styles'

interface Props {
  store: StoreTypes
  match: any
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

  filterCurrentFilm = (movies: ApiTypes.Movies, id: number) => {
    const data = toJS(movies)
    const { results } = data
    const currentFilm = results.filter((item: ApiTypes.Movie) => item.id == id)[0]

    const {
      title,
      release_date,
      original_language,
      overview,
      poster_path,
      popularity,
      media_type,
    } = currentFilm

    return (
      <AboutWrapper>
        <Poster src={`https://image.tmdb.org/t/p/w500/${poster_path}`} />
        <Title>{title}</Title>
        <Description>{overview}</Description>
        <Info>Release date: {release_date}</Info>
        <Info>language: {original_language}</Info>
        <Info>Popularity: {popularity}</Info>
      </AboutWrapper>
    )
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

