import { observable } from 'mobx'
import { ApiTypes } from './types/api'
import { actionAsync, task } from "mobx-utils"
import { API } from './api'
import { AxiosResponse } from 'axios'
import autobind from 'autobind-decorator'
const createBrowserHistory = require("history").createBrowserHistory

function checkMoviesLocaly(){
	const moviesLocal = localStorage.getItem('moviesLocal')
	return moviesLocal ? JSON.parse(moviesLocal) : null
}

class Store {
	@observable
	movies: ApiTypes.Movies | null = checkMoviesLocaly()

	@actionAsync
	async getMovies () {
		try {
			const response: AxiosResponse<any> = await task(API.getMovies())
			localStorage.setItem('moviesLocal', JSON.stringify(response.data))
			this.movies = response.data
		} catch (error) {}
	}

	@actionAsync
	async searchMovie (value: string) {
		try {
			const response: AxiosResponse<any> = await task(API.searchMovie(value))
			localStorage.setItem('moviesLocal', JSON.stringify(response.data))
			this.movies = response.data
		} catch (error) {}
	}

	history = createBrowserHistory()
  @autobind goBack() {
    this.history.goBack()
	}
}

export const store = new Store()
