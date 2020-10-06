<template>
<div>
    <feather-icon v-if="this.params.buttonSearch" icon="SearchIcon" svgClasses="h-5 w-5 m-4 hover:text-success cursor-pointer" />
    <feather-icon v-if="this.params.buttonEdit" icon="Edit3Icon" svgClasses="h-5 w-5 m-4 hover:text-warning cursor-pointer" @click="editAction()" />
    <feather-icon v-if="this.params.buttonDelete" icon="TrashIcon" svgClasses="h-5 w-5 m-4 hover:text-danger cursor-pointer" @click="deleteAction()" />
</div>
</template>

<script>
export default {
  name: 'ButtonGroup',
  data () {
    return {
    }
  },
  methods: {
    searchAction () {
      this.params.actionSearch(this.params.value)
    },
    editAction () {
      this.params.actionEdit(this.params.value)
    },
    deleteAction () {
      this.params.actionDelete(this.params.value)
    }
  }
}
</script>

<style>

</style>
