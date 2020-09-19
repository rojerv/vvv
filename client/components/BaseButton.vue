<template lang="pug">
button.button(:type="type" :disabled="disabled")
  slot
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'submit'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="stylus">
.button
  background transparent
  border 2px solid $secondColor
  transition $speed
  margin 10px
  &:disabled
    border 2px solid transparent
    &:hover
      cursor none
      background tranparent
  &:hover
    cursor pointer
    background $secondColor
</style>
