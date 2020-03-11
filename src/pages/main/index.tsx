import React from 'react'
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import { StoreTypes } from './../../store'
import { ApiTypes } from './../../types/api'

interface Props {
  store: StoreTypes
}

@inject('store')
@observer
export class Main extends React.Component<Props> {
  static defaultProps = { store: {} as StoreTypes }

  componentDidMount() {
    const { store } = this.props
    store.getMovies()
  }

  mapFilmsList = (movies: ApiTypes.Movies) => {
    if (!movies) return null

    const data = toJS(movies)
    const { results } = data

    if (results.length) {
      return results.map((item: ApiTypes.Movie) => {
        return <div key={item.id}>{item.title}</div>
      })
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