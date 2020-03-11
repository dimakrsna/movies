import { observable, action } from 'mobx'
import { ApiTypes } from './types/api'
import { actionAsync, task } from "mobx-utils"
import { API } from './api'
import { AxiosResponse } from 'axios'

export interface StoreTypes {
	movies: ApiTypes.Movies | null
	getMovies: () => void
}

class Store {
	@observable
	movies: ApiTypes.Movies | null = null

	@actionAsync
	async getMovies () {
		
		try {
			const response: AxiosResponse<any> = await task(API.getMovies())
			this.movies = response.data
		} catch (error) {}

	}
}

export const store = new Store()
