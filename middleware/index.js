export default function ({ store, route, params, error, redirect }) {
  if (route.fullPath === '/') {
    redirect('/en')
  }
}
