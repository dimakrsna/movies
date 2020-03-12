
import { ApiTypes } from './api'

export interface StoreTypes {
	movies: ApiTypes.Movies | null
	getMovies: () => void
	searchMovie: (value: string) => void
	goBack: () => void
}