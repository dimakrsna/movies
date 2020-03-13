
import { ApiTypes } from './api'

export type RequestStatus = 'SUCCESS' | 'PENDING' | 'ERROR' | ''

export interface StoreTypes {
	movies: ApiTypes.Movies | null
	recomendationMovies: ApiTypes.Movies | null
	movieDetails: ApiTypes.Movie | null
	getMovieDetailsStatus: RequestStatus
	getMovies: () => void
	searchMovie: (value: string) => void
	getMovieDetails: (id: string) => void
	goBack: () => void
	getRecomendationMovies: (id: string) => void
}