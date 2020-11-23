<template>
  <div class="collapse">
    <vs-collapse :type="type">
      <vs-collapse-item v-for="item in items" :key="item.id" class="bg-white">
        <div slot="header">
          <p class="font-bold object-center">
            <feather-icon
              icon="CheckIcon"
              svgClasses="h-6 w-7 text-success"
            />{{ item.title }}
          </p>
          <!-- <vs-button color="primary" type="border">Primary</vs-button> -->
        </div>
        <div class="rounded-lg m1-1 backgroud-internal">Content</div>
      </vs-collapse-item>
    </vs-collapse>
  </div>
</template>

<script>
export default {
  name: 'Collapse',
  props: {
    items: Array
  },
  data () {
    return {
      type: 'margin'
    }
  }
}
</script>
<style>
.backgroud-internal {
  background: #eef7fe;
}
</style>
