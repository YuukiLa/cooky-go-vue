import axios from '@/utils/request'

export const fetchRoles = ()=> {
  return axios.request({
    url: '/role',
    method: 'get'
  })
}

export const addRole = (role) => {
  return axios.request({
    url: '/role',
    method: 'post',
    data: role
  })
}

export const editRole = (role) => {
  return axios.request({
    url: '/role',
    method: 'put',
    data: role
  })
}

export const deleteRole = (roleId) => {
  return axios.request({
    url: `/role/${roleId}`,
    method: 'delete'
  })
}
