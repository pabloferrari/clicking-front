<template>
    <div class="vx-col w-full section__color">
        <h2 class="font-bold text-title pb-4">{{ title }}</h2>

        <div class="flex p-2 body-card rounded space-y-6">
            <h6 class="text-title">{{ titleAssignment }}</h6>

            <p class="items-start">{{ typeAttach }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CardAction',
    props: {
      title: String,
      titleAssignment: String,
      typeAttach: String
    },
};
</script>

<style>
  .section__color {
    background: #eef7fe;
  }
</style>
