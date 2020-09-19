<template lang="pug">
.input
  .input__title(v-if="title") {{ title }}
  input(v-model="model" :type="type" :placeholder="placeholder")
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Введите значение'
    },
    title: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  computed: {
    model: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>

<style lang="stylus">
.input
  margin 10px
</style>
