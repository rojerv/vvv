export const state = () => ({
  list: [],
  loading: false
})

export const mutations = {
  setTasks (state, payload) {
    state.list = payload
  },
  setLoading (state, payload) {
    state.loading = payload
  }
}

export const getters = {
  getTasksByStatus: state => status => state.list.filter(e => e.done === status)
}

export const actions = {
  async fetchTasks ({ commit }) {
    try {
      const { tasks } = await this.$axios.$get('/tasks')
      commit('setTasks', tasks)
    } catch (error) {
      console.error(error)
      this.$toast.error('При запросе задач произошла ошибка', { duration: 3000 })
    }
  },
  async createTask ({ commit, dispatch }, payload) {
    try {
      commit('setLoading', true)
      const result = await this.$axios.$post('/tasks', payload)
      if (result.status === 'error') {
        this.$toast.error(result.message, { duration: 3000 })
        return
      } else {
        await dispatch('fetchTasks')
      }
    } catch (error) {
      console.error(error)
      this.$toast.error('При создании задачи произошла ошибка', { duration: 3000 })
    } finally {
      commit('setLoading', false)
    }
  },
  async doneTask ({ dispatch }, payload) {
    try {
      const result = await this.$axios.$patch(`/tasks/${payload}`)
      if (result.status === 'error') {
        this.$toast.error(result.message, { duration: 3000 })
        return
      } else {
        await dispatch('fetchTasks')
      }
    } catch (error) {
      console.error(error)
      this.$toast.error('При обновлении задачи произошла ошибка', { duration: 3000 })
    }
  }
}
