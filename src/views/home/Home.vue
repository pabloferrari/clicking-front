<template>
<div class="vx-row">
  <div class="vx-col w-full">
    <p class="primary">Hola, {{ activeUserInfo.name }}!</p>
  </div>
        <vs-button
        @click="notification()"
        color="success"
        type="flat">Notification Success</vs-button>
</div>
</template>

<script>

export default {
  name: 'home',
  data () {
    return {
    }
  },
  computed: {
    activeUserInfo () {
      return this.$store.state.auth.authUser
    }
  },
  methods: {
    notification () {
      Promise.all([
        this.$store.dispatch('notification/success', {title: 'Guardado exitoso....', text: 'se a creado una institucion'}),
        this.$store.dispatch('notification/danger', {title: 'Lorem ipsum dolor sit amet consectetur', text: 'Lorem ipsum dolor sit amet consectetur'}),
        this.$store.dispatch('notification/warning', {title: 'Alerta', text: 'Lorem ipsum dolor sit amet consectetur'})
      ])
    }
  }
}
</script>

<style lang="scss" scoped>
  .primary {
    font-family: Gilroy;
    font-style: normal;
    font-weight: 800;
    font-size: 28px;
    line-height: 44px;
    display: flex;
    align-items: center;
    color: #567DF4;
  }
</style>
