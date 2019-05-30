import axios from '@/utils/request'

export const fetchRoles = ()=> {
  return axios.request({
    url: '/role',
    method: 'get'
  })
}
