const state = {
    sidebarShow: 'responsive',
    sidebarMinimize: false
  }
  
  const mutations = {
    toggleSidebarDesktop (state) {
      const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
      state.sidebarShow = sidebarOpened ? false : 'responsive'
      console.log(state.sidebarShow);
    },
    toggleSidebarMobile (state) {
      const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
      state.sidebarShow = sidebarClosed ? true : 'responsive'
    },
    set (state, [variable, value]) {
      state[variable] = value
    }
  }

  const getters = {
    //TODO get token
    getSidebarShow: state => {
        return state.sidebarShow
    },
    getSidebarMinimize: state => {
      return state.sidebarMinimize
    }
}
  
  export default {
    state,
    mutations,
    getters
  }