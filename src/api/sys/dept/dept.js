import axios from '@/utils/request'

export const addDept = (dept) => {
  return axios.request({
    url: '/dept',
    method: 'post',
    data: dept
  })
}

export const fetchDepts = () => {
  return axios.request({
    url: '/dept'
  })
}

export const editDept = (dept) => {
  return axios.request({
    url: '/dept',
    method: 'put',
    data: dept
  })
}

export const deleteDept = (deptId) => {
  return axios.request({
    url: `/dept/${deptId}`,
    method: 'delete'
  })
}
