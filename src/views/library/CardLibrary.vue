<template>
  <div class="flex backgroud-internal my-3">
    <div class="w-1/12 m-16">
      <strong class="p-5 text-title">PDF</strong>
    </div>
    <div class="w-full">
      <p class="ml-1 pt-4 text-title">
        <feather-icon icon="ClockIcon" svgClasses="h-4 w-4 m-0" />
        {{ data.date }}
      </p>
      <p class="p-1 ml-1 font-bold text-title">{{ data.title }}</p>
      <p class="p-1 ml-1">
        {{ data.description }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name:'CardLibrary',
  props: {
    data:Object
  }
}
</script>
<style scoped>
.text-title {
  color: #22215b;
}
.backgroud-internal {
  background: #eef7fe;
}
</style>
