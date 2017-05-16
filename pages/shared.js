import axios from 'axios'
import token from '../api.config.js'

export async function storeSections ({store, redirect, isClient}) {
  if (isClient) return
  try {
    const sectionsPromise = axios.get(`http://manuelkern.com/cockpit/api/collections/get/section?token=${token}`)
    const sections = await sectionsPromise
    store.commit('init', sections.data.entries)
  } catch (err) {
    redirect('/error')
  }
}

export async function storePages ({store, redirect, isClient}) {
  if (isClient) return
  try {
    const pagesPromise = axios.get(`http://manuelkern.com/cockpit/api/collections/get/page?token=${token}`)
    const pages = await pagesPromise
    store.commit('initPages', pages.data.entries)
  } catch (err) {
    redirect('/error')
  }
}
