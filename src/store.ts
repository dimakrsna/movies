import { observable, action } from 'mobx'
import { ApiTypes, RequestStatus } from './types'
import { actionAsync, task } from 'mobx-utils'
import { API } from './api'
import { AxiosResponse } from 'axios'
import autobind from 'autobind-decorator'
const createBrowserHistory = require('history').createBrowserHistory

class Store {
	@observable
	movies: ApiTypes.Movies | null = null

	@observable
	searchValue: string = ''

	@observable
	movieDetails: ApiTypes.Movie | null = null

	@observable
	getMovieDetailsStatus: RequestStatus = ''

	history = createBrowserHistory()

	@observable
	recomendationMovies: ApiTypes.Movies | null = null

	@actionAsync
	async getMovies() {
		try {
			const response: AxiosResponse<any> = await task(API.getMovies()) // tslint:disable-line
			this.movies = response.data
		} catch (error) {
			console.error(error)
		}
	}

	@action
	onSearchValueChanged = (value: string) => {
		this.searchValue = value
	}

	@actionAsync
	async onMovieSearch(value: string) {
		try {
			const response: AxiosResponse<any> = await task(API.onMovieSearch(value)) // tslint:disable-line
			this.movies = response.data
		} catch (error) { 
			console.error(error)
		}
	}

	@actionAsync
	async getMovieDetails(id: string) {
		try {
			this.getMovieDetailsStatus = 'PENDING'
			const response: AxiosResponse<any> = await task(API.getMovieDetails(id)) // tslint:disable-line
			if (response.data) {
				this.movieDetails = response.data
				this.getMovieDetailsStatus = 'SUCCESS'
			}
			
		} catch (error) { 
			console.error(error)
			this.getMovieDetailsStatus = 'ERROR'
		}
	}
	@autobind goBack() {
		this.history.goBack()
	}

	@actionAsync
	async getRecomendationMovies(id: string) {
		try {
			const response: AxiosResponse<any> = await task(API.getRecommendations(id)) // tslint:disable-line
			this.recomendationMovies = response.data
		} catch (error) {
			console.error(error)
		}
	}
}

export const store = new Store()
