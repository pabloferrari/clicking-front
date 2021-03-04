<template>
  <div class="the-navbar__user-meta flex items-center" v-if="activeUserInfo.name">

    <div class="text-right leading-tight hidden sm:block">
      <p class="font-semibold">{{ activeUserInfo.name }}</p>
      <!-- <small>Available</small> -->
    </div>
 
    <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
      <div class="con-img ml-3">
        <img key="onlineImg" :src="activeUserInfo.image || defaultUser.photoURL" alt="user-img" width="50" height="50" class="rounded-full shadow-md cursor-pointer block" />
      </div>

      <vs-dropdown-menu class="vx-navbar-dropdown">
        <ul style="min-width:9rem;font-weight:bold;">

          <!-- <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
            <feather-icon icon="UserIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Profile</span>
          </li>

          <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
            <feather-icon icon="MailIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Inbox</span>
          </li>

          <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
            <feather-icon icon="CheckSquareIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Tasks</span>
          </li>

          <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
            <feather-icon icon="MessageSquareIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Chat</span>
          </li>

          <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
            <feather-icon icon="HeartIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Wish List</span>
          </li> -->

          <!-- <vs-divider class="m-1" /> -->
          <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="ticket">
            <feather-icon icon="HelpCircleIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Ayuda</span>
          </li>

          <vs-divider class="m-1" />

          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="logout">
            <feather-icon icon="LogOutIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Logout</span>
          </li>
        </ul>
      </vs-dropdown-menu>
    </vs-dropdown>
  </div>
</template>

<script>
export default {
  computed: {
    activeUserInfo () {
      return this.$store.state.auth.authUser
    },
    defaultUser () {
      return this.$store.state.AppActiveUser
    }
  },
  methods: {
    logout () {
      localStorage.removeItem('userAuth')
      localStorage.removeItem('token')
      // This is just for demo Purpose. If user clicks on logout -> redirect
      this.$router.push('/pages/login').catch(() => {})
    },
    ticket () {
      this.$router.push('/tickets').catch(() => {})
    }
  }
}
</script>
