import axios from 'axios'
import {baseUrl, token} from '../api.config.js'

export async function storeSections ({store, redirect, isClient}) {
  if (isClient) return
  try {
    let locales = {}
    locales.title_slug = []
    locales.title_fr_slug = []
    locales.title_de_slug = []
    const sections = await axios.get(`${baseUrl}/admin/api/collections/get/section?token=${token}&populate=1`)
    const s = sections.data.entries
    Object.keys(s).forEach(function (key) {
      locales.title_slug.push(s[key].title_slug)
      locales.title_fr_slug.push(s[key].title_fr_slug)
      locales.title_de_slug.push(s[key].title_de_slug)
    })
    store.commit('initSectionsParams', locales)
    store.commit('initSections', sections.data)
  } catch (err) {
    redirect('/error')
  }
}
