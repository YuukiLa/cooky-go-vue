import axios from '@/utils/request'

export const login = (data) => {
  return  axios.request({
    url: '/login',
    method: 'post',
    data
  })
}

export const fetchUsers = (query) => {
  return axios.request({
    url: '/user',
    method: 'get',
    params: query
  })
}
