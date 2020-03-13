import React from 'react'
import { observer, inject } from 'mobx-react'
import { toJS } from 'mobx'
import { StoreTypes, ApiTypes } from './../../../types'
import { withRouter } from 'react-router-dom'
import { ListLink, ListItem, ListWrapper } from './styles'

interface Props {
  store: StoreTypes
  match: any
  history: any
}

@inject("routing")
@inject("store")
@observer
class Recomendations extends React.PureComponent<Props> {

  static defaultProps = {
    store: {} as StoreTypes,
    match: {
      params: {
        id: ''
      }
    }
  }

  componentDidMount(){
    const { store, match } = this.props
    const { id } = match.params
    
    store.getRecomendationMovies(id)
  }

  filterList = (recomendationMovies: ApiTypes.Movie[]): ApiTypes.Movie[] => {
    if(recomendationMovies.length){
      return recomendationMovies.filter((item, counter: number) => counter < 5)
    } else {
      return []
    }
  }

  mapRecomedations = (recomendationMovies: ApiTypes.Movies) => {
    const data = toJS(recomendationMovies)
    const { results } = data

    const movies = this.filterList(results)

    if (movies.length) {
      return (
        <ListWrapper>
          {movies.map((item: ApiTypes.Movie) => (
            <ListItem key={item.id}>
              <ListLink to={`/about-film/${item.id}`}>
                {item.title}
              </ListLink>
            </ListItem>
          ))}
        </ListWrapper>
      )

    } else {
      return <div>No recomendations find</div>
    }
  }

  render(){
    const { store } = this.props
    if(store.recomendationMovies){
      return (
        <>
          <h3>Recomendations:</h3>
          {this.mapRecomedations(store.recomendationMovies)}
        </>
      )
    }
  }
}

export default withRouter(Recomendations)
