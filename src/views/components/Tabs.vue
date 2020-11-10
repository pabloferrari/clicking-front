<template>
  <div>
    <vs-tabs>
      <vs-tab v-for="tab in tabs" :key="tab.title" :label="tab.title">
        <div class="tab-text">
          {{ tab.component }}
        </div>
      </vs-tab>
    </vs-tabs>
  </div>
</template>
<script>
export default {
  name: "Tabs",
  props: {
    tabs: Array,
    component: null,
  },
};
</script>
