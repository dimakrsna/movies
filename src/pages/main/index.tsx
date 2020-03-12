import React from 'react'
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import { StoreTypes } from './../../store'
import { ApiTypes } from './../../types/api'
import {
  ListWrapper,
  ListLink,
  ListItem,
  FormWrapper,
  SearchInput,
} from './styles'
import { Button } from './../../common/styles'

interface Props {
  store: StoreTypes
}

interface State {
  inputValue: string
}

@inject('store')
@observer
export class Main extends React.Component<Props, State> {
  static defaultProps = {
    store: {} as StoreTypes,
  }

  state = {
    inputValue: ''
  }

  componentDidMount() {
    const { getMovies } = this.props.store
    getMovies()
  }

  onValueChanged = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget

    this.setState({
      inputValue: value
    })
  }

  onSearchMovie = (event: React.FormEvent) => {
    event.preventDefault()

    const { inputValue } = this.state
    const { store } = this.props

    if (inputValue) {
      store.searchMovie(inputValue)
    }
  }


  mapFilmsList = (movies: ApiTypes.Movies) => {
    const data = toJS(movies)
    const { results } = data

    if (results.length) {
      return (
        <ListWrapper>
          {results.map((item: ApiTypes.Movie) => (
            <ListItem key={item.id}>
              <ListLink to={`/about-film/${item.id}`}>
                {item.title}
              </ListLink>
            </ListItem>
          ))}
        </ListWrapper>
      )

    } else {
      return <div>Nothing matching</div>
    }
  }

  render() {
    const { store } = this.props

    return (
      <>
        <FormWrapper onSubmit={this.onSearchMovie}>
          <SearchInput onChange={this.onValueChanged} placeholder="Movie name" />
          <Button onClick={this.onSearchMovie}>Search</Button>
        </FormWrapper>
        {(store.movies) ? this.mapFilmsList(store.movies) : <div>Nothing matching</div>}
      </>
    )
  }
}