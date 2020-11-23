<template>
  <div class="">
    <vs-button :to="{ path: path }" :size="size">{{ buttonTitle }}</vs-button>
  </div>
</template>

<script>
export default {
  name: "ButtonPath",
  props: {
    buttonTitle: String,
    path: String,

    size: String,
  },
  computed: {
    activeLink() {
      return true;
    },
  },
};
</script>
