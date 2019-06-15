import axios from '@/utils/request'

export const fetchMenus = () => {
  return axios.request({
    url: '/menu',
    method: 'get'
  })
}
