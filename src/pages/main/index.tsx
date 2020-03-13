import React from 'react'
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import { StoreTypes, ApiTypes } from './../../types/index'
import {
  ListWrapper,
  ListLink,
  ListItem,
  FormWrapper,
  SearchInput,
  EmptyResult,
} from './styles'
import { Button } from './../../common/styles'

interface Props {
  store: StoreTypes
}

@inject('store')
@observer
export class Main extends React.Component<Props> {
  
  static defaultProps = {
    store: {} as StoreTypes,
  }

  onValueChanged = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    const { store } = this.props
    store.onSearchValueChanged(value)
  }

  ononMovieSearch = (event: React.FormEvent) => {
    event.preventDefault()

    const { store } = this.props

    if (store.searchValue) {
      store.onMovieSearch(store.searchValue)
    }
  }

  mapFilmsList = () => {
    const { store } = this.props
    const data = toJS(store.movies)
    
    const results = (data) ? data.results : []

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
      return <EmptyResult>Nothing matching</EmptyResult>
    }
  }

  componentDidMount() {
    const { store } = this.props

    if(!store.searchValue){
      store.getMovies()
    }

  }

  render() {
    const { store } = this.props
    return (
      <>
        <FormWrapper onSubmit={this.ononMovieSearch}>
          <SearchInput value={store.searchValue} onChange={this.onValueChanged} placeholder="Movie name" />
          <Button onClick={this.ononMovieSearch}>Search</Button>
        </FormWrapper>
        {this.mapFilmsList()}
      </>
    )
  }
}