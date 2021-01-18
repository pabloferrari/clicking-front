<template>
  <div class="">
    <div class="flex mb-3 ml-3">
      <div class="mr-0">
        <vs-avatar class="m-1" size="30px" :src="img" />
      </div>
      <div class="mb-1 w-1/2 h-0 p-0 m-0 mr-3">
        <p class="text-title font-semibold break-all">{{ user }}</p>

        <p class="ml-2">
          {{ comment }}
        </p>
      </div>
      <!-- <div class="flex ml-6 mt-0 m-2">

      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentChild',
  props: {
    user: String,
    comment: String,
    img: String
  },
  mounted () {
    console.log('si')
  }
}
</script>
<style  scoped>
.text-title {
  color: #22215b;
}
</style>
