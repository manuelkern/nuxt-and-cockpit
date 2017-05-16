export const state = {
  sections: [],
  pages: []
}

export const mutations = {
  init (state, sections) {
    state.sections = sections
  },
  initPages (state, pages) {
    state.pages = pages
  }
}
