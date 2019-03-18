export default function ({ store, redirect }) {
  if (!store.getters.getAdminToken) {
    return redirect('/admin/login')
  }
}
