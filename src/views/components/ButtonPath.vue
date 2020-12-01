<template>
  <div class="">
    <vs-button
    :to="{ path: path }"
    :size="size"
    :color="color"
    :type="type"
    :icon-pack="iconPack"
    :icon="icon"
    >{{ buttonTitle }}</vs-button>
  </div>
</template>

<script>
export default {
  name: 'ButtonPath',
  props: {
    buttonTitle: String,
    path: String,
    size: String,
    color: String,
    type: String,
    iconPack: String,
    icon: String
  },
  computed: {
    activeLink () {
      return true
    }
  }
}
</script>
