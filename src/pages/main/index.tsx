import React from 'react'
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import { StoreTypes } from './../../store'
import { ApiTypes } from './../../types/api'
import { ListWrapper, ListLink } from './styles'

interface Props {
  store: StoreTypes
}

@inject('store')
@observer
export class Main extends React.Component<Props> {
  static defaultProps = {
    store: {} as StoreTypes,
  }

  componentDidMount() {
    const { store } = this.props
    store.getMovies()
  }

  mapFilmsList = (movies: ApiTypes.Movies) => {
    const data = toJS(movies)
    const { results } = data

    if (results.length) {
      return (
        <ListWrapper>
          {results.map((item: ApiTypes.Movie) => <ListLink
            to={`/about-film/${item.id}`}
            key={item.id}>
            {item.title}
          </ListLink>)}
        </ListWrapper>
      )

    } else {
      return <div>Nothing matching</div>
    }
  }

  render() {
    const { store } = this.props

    return (
      <>{(store.movies) ? this.mapFilmsList(store.movies) : <div>Nothing matching</div>}</>
    )
  }
}