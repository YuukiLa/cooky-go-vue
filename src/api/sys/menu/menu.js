import axios from '@/utils/request'

export const fetchMenus = () => {
  return axios.request({
    url: '/menu',
    method: 'get'
  })
}

export const addMenu = (menu) => {
  return axios.request({
    url: '/menu',
    method: 'post',
    data: menu
  })
}

export const editMenu = (menu) => {
  return axios.request({
    url: '/menu',
    method: 'put',
    data: menu
  })
}

export const deleteMenu = (menuId) => {
  return axios.request({
    url: `/menu/${menuId}`,
    method: 'delete'
  })
}
