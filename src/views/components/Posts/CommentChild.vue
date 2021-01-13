<template>
  <div class="">
    <div class="flex mb-3">
      <div class="mr-0">
        <vs-avatar class="m-1" size="30px" />
      </div>
      <div class="flex w-1/2 h-0 p-0 m-0 mr-3">Usuario</div>
    </div>
    <div class="flex ml-6 mt-0 m-2">
      {{ comment }}
    </div>
    <!-- <div class="flex ml-1">
      <div class="w-full ml-8">
        <p>
          {{ comment }}
        </p>
      </div>
    </div> -->
    <div class="divider"></div>
  </div>
</template>

<script>
export default {
  name: 'CommentChild',
  props: {
    comment: String
  },
  mounted () {
    console.log(this.comment)
  }
}
</script>
