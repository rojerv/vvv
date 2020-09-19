<template lang="pug">
.profile-layout
  .profile-info
    span.profile-info__text Ваш логин: {{ $auth.user.login }}
    span.profile-info__action(@click="$auth.logout()") Выход
  nuxt
</template>

<style lang="stylus">
.profile-layout
  padding 50px
.profile-info
  text-align center
  &__text
    margin-right 30px
  &__action
    cursor pointer
    font-weight bold
    &:hover
      text-decoration underline
</style>
