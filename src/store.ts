import { observable, action } from 'mobx'
import { ApiTypes, RequestStatus } from './types'
import { actionAsync, task } from "mobx-utils"
import { API } from './api'
import { AxiosResponse } from 'axios'
import autobind from 'autobind-decorator'
const createBrowserHistory = require("history").createBrowserHistory

function checkMoviesLocaly() {
	const moviesLocal = localStorage.getItem('moviesLocal')
	return moviesLocal ? JSON.parse(moviesLocal) : null
}

class Store {
	@observable
	movies: ApiTypes.Movies | null = checkMoviesLocaly()

	@actionAsync
	async getMovies() {
		try {
			const response: AxiosResponse<any> = await task(API.getMovies())
			localStorage.setItem('moviesLocal', JSON.stringify(response.data))
			this.movies = response.data
		} catch (error) { }
	}

	@actionAsync
	async searchMovie(value: string) {
		try {
			const response: AxiosResponse<any> = await task(API.searchMovie(value))
			localStorage.setItem('moviesLocal', JSON.stringify(response.data))
			this.movies = response.data
		} catch (error) { }
	}

	@observable
	movieDetails: ApiTypes.Movie | null = null

	@observable
	getMovieDetailsStatus: RequestStatus = ''

	@actionAsync
	async getMovieDetails(id: string) {
		try {
			this.getMovieDetailsStatus = 'PENDING'
			const response: AxiosResponse<any> = await task(API.getMovieDetails(id))
			if(response.data){
				this.movieDetails = response.data
				this.getMovieDetailsStatus = 'SUCCESS'
			}
			
		} catch (error) { 
			this.getMovieDetailsStatus = 'ERROR'
		}
	}

	history = createBrowserHistory()
	@autobind goBack() {
		this.history.goBack()
	}

	@observable
	recomendationMovies: ApiTypes.Movies | null = null

	@actionAsync
	async getRecomendationMovies(id: string) {
		try {
			const response: AxiosResponse<any> = await task(API.getRecommendations(id))
			this.recomendationMovies = response.data
		} catch (error) { }
	}
}

export const store = new Store()
