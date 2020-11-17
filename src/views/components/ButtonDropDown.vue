<template>
  <div class="dropdown-button-container">
    <vs-button
      class="btnx"
      icon-pack="feather"
      icon="icon-plus"
      type="filled"
      >{{ title }}</vs-button
    >

    <vs-dropdown>
      <vs-button class="btn-drop" type="filled" icon="expand_more"></vs-button>
      <vs-dropdown-menu>
        <vs-dropdown-item class="py-2 text-xl color-text-menu font-semibold">
          {{ itemOne }}
        </vs-dropdown-item>
        <vs-divider />
        <vs-dropdown-item
          class="py-2 text-xl color-text-menu font-semibold"
          v-for="item in items"
          :key="item.id"
        >
          {{ item.title }}
        </vs-dropdown-item>
      </vs-dropdown-menu>
    </vs-dropdown>
  </div>
</template>

<script>
export default {
  name: 'ButtonDropDown',
  props: {
    title: String,
    itemOne: String,
    items: Array
  }
}
</script>

<style lang="scss">
.con-vs-dropdown--menu {
  width: 18rem !important;
}
.dropdown-button-container {
  display: flex;
  align-items: center;

  .btnx {
    border-radius: 5px 0px 0px 5px;
  }
  .color-text-menu {
    color: #22215b;
  }
  .btn-drop {
    border-radius: 0px 5px 5px 0px;
    border-left: 1px solid rgba(255, 255, 255, 0.2);
  }
}
</style>
