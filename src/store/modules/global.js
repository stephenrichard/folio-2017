import * as types from '../mutations-types'

const state = {
  loading: false,
  introSkipped: false,
  page: '',
  menuOpen: false,
  videoIntroPlay: false,
  indicatorsHidden: true
}

const getters = {
  isLoading: state => {
    return state.loading
  },
  isIntroSkipped: state => {
    return state.introSkipped
  },
  getPage: state => {
    return state.page
  },
  isMenuOpen: state => {
    return state.menuOpen
  },
  shouldPlay: state => {
    return state.videoIntroPlay
  },
  isIndicatorHidden: state => {
    return state.indicatorsHidden
  }
}

const mutations = {
  [types.SET_IS_LOADING] (state, loadingState) {
    state.loading = loadingState
  },
  [types.SET_INTRO_SKIPPED] (state, introState) {
    state.introSkipped = introState
  },
  [types.SET_PAGE] (state, page) {
    state.page = page
  },
  [types.SET_IS_MENU_OPEN] (state, menuState) {
    state.menuOpen = menuState
  },
  [types.BACKGROUND_VIDEO_STATE] (state, videoState) {
    state.videoIntroPlay = videoState
  },
  [types.CHANGE_INDICATORS_STATE] (state, indicatorState) {
    state.indicatorsHidden = indicatorState
  }
}

export default {
  state,
  getters,
  mutations
}
