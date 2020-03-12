import { observable } from 'mobx'
import { ApiTypes } from './types/api'
import { actionAsync, task } from "mobx-utils"
import { API } from './api'
import { AxiosResponse } from 'axios'
import autobind from 'autobind-decorator'
const createBrowserHistory = require("history").createBrowserHistory
 

export interface StoreTypes {
	movies: ApiTypes.Movies | null
	getMovies: () => void
	goBack: () => void
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

	history = createBrowserHistory()

  @autobind goBack() {
    this.history.goBack()
  }
}

export const store = new Store()
