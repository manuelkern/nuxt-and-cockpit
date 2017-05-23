import Vuex from 'vuex'

const store = new Vuex.Store({
  state: {
    sections: [],
    section: [],
    selectedLocale: 'en',
    locales: {
      'en': { 'lang': 'en' },
      'fr': { 'lang': 'fr' },
      'de': { 'lang': 'de' }},
    localizedFields: {},
    isLoading: true,
    menu: {
      sectionIndex: null,
      title: {
        en: 'MENU',
        fr: 'MENU',
        de: 'MENU'
      },
      isOpen: false
    }
  },
  mutations: {
    updateLocale (state, locale) {
      state.selectedLocale = locale
    },
    updateMenu (state) {
      if (!state.menu.isOpen) {
        state.menu.title.en = 'CLOSE'
        state.menu.title.fr = 'FERMER'
        state.menu.title.de = 'SCHLIESSEN'
      } else {
        state.menu.title.en = 'MENU'
        state.menu.title.fr = 'MENU'
        state.menu.title.de = 'MENU'
      }
      state.menu.isOpen = !state.menu.isOpen
    },
    updateSectionIndex (state, value) {
      state.menu.sectionIndex = value
    },
    storeLocalizedFields (state, value) {
      state.localizedFields = value
    },
    notLoading (state) {
      state.isLoading = false
    },
    initSectionsParams (state, value) {
      state.locales.en.slug = value.title_slug
      state.locales.fr.slug = value.title_fr_slug
      state.locales.de.slug = value.title_de_slug
    },
    initSections (state, sections) {
      state.sections = sections
    },
    initSection (state, section) {
      state.section = section
    }
  }
})

export default store
