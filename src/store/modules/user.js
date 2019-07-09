import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import {login} from '@/api/sys/user/user'
import {getUserInfo} from '@/api/sys/user/user'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  routes: [],
  rules: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROUTES: (state, routes) => {
    state.routes = routes
  },
  SET_RULES: (state, rules) => {
    state.rules = rules
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // const data = { roles: ['123'], name: 'yuuki', avatar: 'xx', introduction: 'xxxxxxxx' }

      getUserInfo().then(res => {
        const data = res.data
        const { user, menus } = data
        let rules=[],routes = []
        menus.forEach(menu => {
          if(menu.menuType===1) {
            routes.push(menu.componentName)
          }else {
            rules.push(menu.permission)
          }
        })
        commit('SET_ROUTES', routes)
        commit('SET_NAME', user.username)
        commit('SET_AVATAR', "avatar")
        commit('SET_INTRODUCTION', user.remark)
        commit('SET_RULES', rules)
        resolve(data)
      })
    })
  },

// user logout
logout({ commit, state }) {
  return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      commit('SET_ROUTES', [])
      removeToken()
      resetRouter()
      resolve()
  })
}
,

// remove token
resetToken({ commit })
{
  return new Promise(resolve => {
    commit('SET_TOKEN', '')
    commit('SET_ROUTES', [])
    removeToken()
    resolve()
  })
}
,

// dynamically modify permissions
changeRoles({ commit, dispatch }, role)
{
  return new Promise(async resolve => {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    resolve()
  })
}
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
