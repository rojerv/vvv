<template lang="pug">
.task-card
  .task-card__text {{ text }}
  .task-card__action(v-if="!done" @click="doneTask(id)") Выполнить
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    text: {
      type: String,
      default: ''
    },
    done: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      required: true
    }
  },
  methods: {
    ...mapActions({
      doneTask: 'tasks/doneTask'
    })
  }
}
</script>

<style lang="stylus">
.task-card
  margin-top 10px
  display flex
  &__action
    margin-left 10px
    cursor pointer
    border 1px solid $mainColor
    padding 0 5px
    border-radius 10px
    transition $speed
    &:hover
      cursor pointer
      color $white
      background $mainColor
</style>
