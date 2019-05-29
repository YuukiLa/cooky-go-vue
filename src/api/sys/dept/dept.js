import axios from '@/utils/request'

export const addDept = (dept) => {
  return axios.request({
    url: '/dept',
    method: 'post',
    data: dept
  })
}

export const getAllDept = () => {
  return axios.request({
    url: '/dept/tree'
  })
}
