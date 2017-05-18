import axios from 'axios'
import token from '../api.config.js'

export async function storeMenu ({store, redirect, isClient}) {
  if (isClient) return
  try {
    const menuPromise = axios.get(`http://manuelkern.com/admin/api/collections/get/nav?token=${token}&populate=1`)
    const menu = await menuPromise
    store.commit('init', menu.data.entries)
  } catch (err) {
    redirect('/error')
  }
}
