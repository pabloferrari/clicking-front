<template>
  <!-- <div class="vx-row"> -->
    <!-- <vx-card> -->
      <div class="w-full backgroud-internal mt-3 rounded-lg">
        <div class="">
          <p class="ml-1 p-3">
            <feather-icon icon="ClockIcon" svgClasses="h-4 w-4 m-0" />
            {{data.date}}</p>
          <p class="p-3 ml-2 font-bold text-title">{{data.title}}</p>
          <p class="p-3 ml-2">
            {{data.description}}
          </p>
        </div>
        <div class="flex p-3 ml-2">
          <ul class="user-comments-list">
            <li class="commented-user flex items-center mb-4">
              <div class="mr-3"><vs-avatar class="m-0" size="30px" /></div>
              <div class="leading-tight">
                <p class="font-bold text-title">Auther Red</p>
                <!-- <span class="text-xs"
                  >Lorem ipsum dolor sit, amet consectetur adipisicing
                  eli.</span
                > -->
              </div>
            </li>
          </ul>
        </div>
          <!-- <div class="flex mb-3" v-permission="['teacher']">
            <div class="w-full ml-2">
              <div class="chat__input flex p-4">
                <div class="">
                  <div class="mr-3 ml-2">
                    <vs-avatar class="m-0" size="30px" />
                  </div>
                </div>
                <vs-input
                  class="flex-1"
                  icon-pack="feather"
                  icon="icon-send"
                  icon-no-border
                  icon-after
                  placeholder="Type Your Message"
                  v-model="commentResponse"
                />
              </div>

            </div>
          </div> -->

      </div>
    <!-- </vx-card> -->
  <!-- </div> -->
</template>

<script>
export default {
  name: 'ListInformation',
  props: {
    data: Object
  },
  data () {
    return {
      commentResponse: null
    }
  }
}
</script>
<style>
.backgroud-internal {
  background: #eef7fe;
}
.text-red {
  color: #ff5a5a;
}
.text-title {
  color: #22215b;
}
</style>
