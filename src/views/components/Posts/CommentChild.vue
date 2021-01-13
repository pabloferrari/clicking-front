<template>
  <div class="">
    <div class="flex mb-3 mr-4">
      <div class="mr-0">
        <vs-avatar class="m-1" size="30px" :src="img" />
      </div>
      <div class="flex w-1/2 h-0 p-0 m-0 mr-3 ">
        <p class="text-title font-semibold">{{user}}</p>
      </div>
    </div>
    <div class="flex ml-6 mt-0 m-2">
      {{ comment }}
    </div>
    <div class="divider"></div>
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
    console.log(this.comment)
  }
}
</script>
<style  scoped>
.text-title {
  color: #22215b;
}
</style>
