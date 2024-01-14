// package
import axios from "axios";

//  url
import { URLS } from "./Config/URL";

//api key
const apikey = "460ede70f28006cdd5dbe5510d0323a1";

// get trending list
export const GET_TRENDING_MOVIE_LIST = async (currPage) => {
  return await axios.get(`${URLS.GET_MOVIE_LIST}/3/trending/all/day?api_key=${apikey}&page=${currPage}&total_page=36106`)
}

// get movie list
export const GET_MOVIE_LIST = async (currPage) => {
  return await axios.get(`${URLS.GET_MOVIE_LIST}/3/movie/popular?api_key=${apikey}&page=${currPage}&total_page=36106`)
}

// get tvshow list
export const GET_TVSHOW_LIST = async (currPage) => {
  return await axios.get(`${URLS.GET_MOVIE_LIST}/3/tv/popular?api_key=${apikey}&page=${currPage}&total_pages=36106`)
}

// get search list
export const GET_SERACH_LIST = async (mediaType, searchMovies, currPage) => {
  return await axios.get(`${URLS.GET_MOVIE_LIST}/3/search/${mediaType}?api_key=${apikey}&query=${searchMovies}&page=${currPage}`)
}

//get movie detail list
export const GET_MOVIE_DETAIL = async (id, medType) => {
  return await axios.get(`${URLS.GET_MOVIE_LIST}/3/${medType}/${id}?api_key=${apikey}`)
}

//get movie reviews
export const GET_MOVIE_REVIEWS = async (movie_id, medType) => {
  return await axios.get(`${URLS.GET_MOVIE_LIST}/3/${medType}/${movie_id}/reviews?api_key=${apikey}`)
}

// Token = 4510b001baa2f28476c128cea6f79ce1038d05b2