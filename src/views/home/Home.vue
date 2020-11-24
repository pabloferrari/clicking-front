<template>
<div class="vx-row">
  <div class="vx-col w-full">
    <p class="primary">Hola, {{ activeUserInfo.name }}!</p>
  </div>
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
  },
  mounted () {
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
