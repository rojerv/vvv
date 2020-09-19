<template lang="pug">
.login-page
  .login-form
    h1 Вход/Регистрация
    form(@submit.prevent="join()")
      BaseInput(v-model="form.login" type="text" placeholder="Логин" title="Введите логин")
      BaseInput(v-model="form.password" type="password" placeholder="Пароль" title="Введите пароль")
      BaseButton(type="submit") Ок
</template>

<script>
export default {
  data () {
    return {
      form: { login: '', password: '' }
    }
  },
  methods: {
    async join () {
      this.$toast.clear()

      try {
        await this.$auth.login({ data: this.form })
        this.$router.push({ path: '/' })
      } catch (err) {
        this.$toast.error(err.message, { duration: 3000 })
      }
    }
  }
}
</script>

<style lang="stylus">
.login-page
  height 100vh
  display flex
  justify-content center
  align-items center

.login-form
  border 1px solid $mainColor
  padding 30px
  border-radius 8px
  text-align center
</style>
