const createStore = (config = {}) => {
  let state = config.initialState || {}
  const reducers = config.reducers
  const listens = []

  return {
    dispatch(name, data) {
      if (reducers[name]) {
        state = reducers[name](state, data)
        listens.forEach(fn => {
          fn(state)
        })
      }
    },
    getState() {
      return state
    },
    subscribe(fn) {
      listens.push(fn)
    }
  }
}

const store = createStore({
  initialState: {
    a: 1
  },
  reducers: {
    change(state, data) {
      return { ...state, a: data }
    }
  }
})

store.subscribe(() => console.log(store.getState()))
store.dispatch('change', 2)
