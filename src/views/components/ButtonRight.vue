<template>
  <div>
    <div class="text-right">
      <vs-button
        icon-pack="feather"
        @click="$emit('handler-click')"
        class=""
        icon="icon-plus"
        >{{ buttonTitle }}</vs-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "ButtonRight",
  props: {
    buttonTitle: String,
  },
};
</script>
