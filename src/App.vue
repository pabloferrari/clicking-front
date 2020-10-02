<!-- =========================================================================================
  File Name: App.vue
  Description: Main vue file - APP
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div id="app" :class="vueAppClasses">
    <router-view @setAppClasses="setAppClasses" />
  </div>
</template>

<script>
import themeConfig from '@/../themeConfig.js'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      vueAppClasses: []
    }
  },
  computed: {
    ...mapGetters({
      notifications: 'notification/getNotifications'
    })
  },
  watch: {
    notifications (newValue) {
      if (newValue.length > 0) this.showNotifications(newValue)
    },
    '$store.state.theme' (val) {
      this.toggleClassInBody(val)
    },
    '$vs.rtl' (val) {
      document.documentElement.setAttribute('dir', val ? 'rtl' : 'ltr')
    }
  },
  methods: {
    showNotifications (newValue) {
      newValue.forEach(element => {
        this.$vs.notify({
          title: element.title,
          text: element.text,
          color: element.color,
          iconPack: element.iconPack,
          icon: element.icon,
          position: element.position
        })
      })
      this.$store.commit('notification/deleteNotification')
    },
    toggleClassInBody (className) {
      if (className === 'dark') {
        if (document.body.className.match('theme-semi-dark')) document.body.classList.remove('theme-semi-dark')
        document.body.classList.add('theme-dark')
      } else if (className === 'semi-dark') {
        if (document.body.className.match('theme-dark')) document.body.classList.remove('theme-dark')
        document.body.classList.add('theme-semi-dark')
      } else {
        if (document.body.className.match('theme-dark'))      document.body.classList.remove('theme-dark')
        if (document.body.className.match('theme-semi-dark')) document.body.classList.remove('theme-semi-dark')
      }
    },
    setAppClasses (classesStr) {
      this.vueAppClasses.push(classesStr)
    },
    handleWindowResize () {
      this.$store.commit('UPDATE_WINDOW_WIDTH', window.innerWidth)
      // Set --vh property
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`)
    },
    handleScroll () {
      this.$store.commit('UPDATE_WINDOW_SCROLL_Y', window.scrollY)
    }
  },
  mounted () {
    this.toggleClassInBody(themeConfig.theme)
    this.$store.commit('UPDATE_WINDOW_WIDTH', window.innerWidth)
    const vh = window.innerHeight * 0.01
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  },
  async created () {
    const dir = this.$vs.rtl ? 'rtl' : 'ltr'
    document.documentElement.setAttribute('dir', dir)
    window.addEventListener('resize', this.handleWindowResize)
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('resize', this.handleWindowResize)
    window.removeEventListener('scroll', this.handleScroll)
  }
}

</script>

<style lang="scss">
@import url('https://cdn.rawgit.com/mfd/09b70eb47474836f25a21660282ce0fd/raw/e06a670afcb2b861ed2ac4a1ef752d062ef6b46b/Gilroy.css');
</style>
