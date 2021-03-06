import apiUrl from '../apiConfig'
import axios from 'axios'

export const index = ({token}) => {
  return axios({
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${token}`
    },
    url: apiUrl + '/vinyls'
  })
}

export const create = (vinyl, {token}) => {
  return axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${token}`
    },
    url: `${apiUrl}/vinyls`,
    data: JSON.stringify({
      vinyl: {
        vinyl_id: vinyl.id,
        cover_image: vinyl.cover_image,
        collection_type: vinyl.collection_type
      }
    })
  })
}

export const destroy = (id, token) => {
  return axios({
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${token}`
    },
    url: `${apiUrl}/vinyls/${id}`
  })
}

export const mailer = (mail, {token}) => {
  return axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${token}`
    },
    url: `${apiUrl}/mailer`,
    data: JSON.stringify({
      mail: {
        from: mail.from,
        to: mail.to,
        subject: mail.subject,
        html: mail.html
      }
    })
  })
}
