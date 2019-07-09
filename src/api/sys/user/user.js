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

export const addUser = (user) => {
  return axios.request({
    url: '/user',
    method: 'post',
    data: user
  })
}

export const editUser = (user) => {
  return axios.request({
    url: '/user',
    method: 'put',
    data: user
  })
}

export const deleteUser = (userId) => {
  return axios.request({
    url: `/user/${userId}`,
    method: 'delete'
  })
}

export const getUserInfo = () => {
  return axios.request({
    url: '/user/userInfo',
    method: 'get'
  })
}
