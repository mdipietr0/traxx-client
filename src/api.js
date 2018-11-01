import apiUrl from './apiConfig'
import axios from 'axios'

export const search = (query) => {
  return axios({
    method: 'get',
    url: apiUrl + `/search?q=${query}`
  })
}
