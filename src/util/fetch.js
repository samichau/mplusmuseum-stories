export function fetch(store, action, payload) {
  return store.dispatch('site/init', { action, payload });
}
