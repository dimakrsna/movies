export declare namespace ApiTypes {

  export interface Movie {
    id: number
    title: string
    release_date: string
    original_language: string
    original_title: string
    backdrop_path: string
    overview: string
    poster_path: string
    popularity: number
    media_type: string
  }

  export interface Movies {
    results: Movie[]
  }

}