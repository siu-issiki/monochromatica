export default function ({ store, redirect }) {
  // ユーザーが認証されていないとき
  if (!store.getters.getAdminToken) {
    return redirect('/admin')
  }
}
