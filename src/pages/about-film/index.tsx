import React from 'react'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { StoreTypes } from './../../types/index'
import { Page404 } from './../404'
import Recomendations from './recomendations'
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
@inject("history")
@observer
class AboutFilm extends React.Component<Props> {

  static defaultProps = {
    store: {} as StoreTypes,
    match: {
      params: {
        id: ''
      }
    }
  }

  componentDidMount() {
    const { store, match } = this.props
    const { id } = match.params
    store.getMovieDetails(id)
  }

  componentWillReceiveProps(nextProps){
    const { store, match } = this.props
    const prevId = match.params.id
    const nextId = nextProps.match.params.id

    if(prevId != nextId){
      store.getMovieDetails(nextId)
    }
  }

  render() {
    const { store } = this.props

    if (store.movieDetails) {

      const {
        title,
        release_date,
        original_language,
        overview,
        poster_path,
        popularity,
      } = store.movieDetails

      return (
        <AboutWrapper>
          {poster_path && <Poster src={`https://image.tmdb.org/t/p/w500/${poster_path}`} />}
          <Title>{title}</Title>
          <Description>{overview}</Description>
          <Info>Release date: {release_date}</Info>
          <Info>language: {original_language}</Info>
          <Info>Popularity: {popularity}</Info>
          <Button onClick={this.props.store.goBack}>Go back</Button>
          <Button onClick={() => this.props.history.push("/")}>Go to index</Button>
          <Recomendations />
        </AboutWrapper>
      )
    }

    if(store.getMovieDetailsStatus === 'PENDING'){
      return null
    }
    
    else return <Page404 />
  }
}

export default withRouter(AboutFilm)

