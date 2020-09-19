<template lang="pug">
div
  h1 Чек лист
  form(@submit.prevent="create()")
    .add-form
      BaseInput(v-model="text" placeholder="Текст задачи")
      BaseButton(type="submit" :disabled="loading") Добавить задачу
  div(v-for="list in lists" :key="list.title")
    h2 {{ list.title }}
    p(v-if="!getTasksByStatus(list.status).length") Пока нет таких задач
    TaskCard(v-for="t in getTasksByStatus(list.status)" :key="t.text" v-bind="t")
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  layout: 'profile',
  data () {
    return {
      text: '',
      lists: [
        { title: 'Список активных задач', status: false },
        { title: 'Список выполненных задач', status: true }
      ]
    }
  },
  middleware ({ store }) {
    store.dispatch('tasks/fetchTasks')
  },
  computed: {
    ...mapState({
      tasks: state => state.tasks.list,
      loading: state => state.tasks.loading
    }),
    ...mapGetters({
      getTasksByStatus: 'tasks/getTasksByStatus'
    })
  },
  methods: {
    ...mapActions({
      fetchTasks: 'tasks/fetchTasks',
      createTask: 'tasks/createTask'
    }),
    async create () {
      await this.createTask({ text: this.text })
      this.text = ''
    }
  }
}
</script>

<style lang="stylus">
.add-form
  display flex
</style>
