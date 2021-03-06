import axios from 'axios'
const token = 'adf2709706ec77e0991eb74caf0380a5'

export const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org',
})

export const API = {
  getMovies: () => {
    return axiosInstance.get(`/3/trending/all/week?api_key=${token}`).then(response => {
      return response
    })
  },
  
  getMovieDetails: (id: string) => {
    return axiosInstance.get(`/3/movie/${id}?api_key=${token}`).then(response => {
      return response
    })
  },

  onMovieSearch: (value: string) => {
    return axiosInstance.get(`/3/search/movie?api_key=${token}&query=${value}`).then(response => {
      return response
    })
  },

  getRecommendations: (id: string) => {
    return axiosInstance.get(`/3/movie/${id}/recommendations?api_key=${token}`).then(response => {
      return response
    })
  },
}