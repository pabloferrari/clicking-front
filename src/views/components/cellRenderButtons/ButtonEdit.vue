<template>
    <div >
        <feather-icon icon="Edit3Icon" svgClasses="h-5 w-5 mr-4 hover:text-warning cursor-pointer" @click="editRecord" />
        <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 mr-4 hover:text-danger cursor-pointer" @click="deleteRecord" />
    </div>
</template>


<script>

export default {
  name:'ButtonEdit',
  props:{
    activePrompt: Boolean
  },
  data () {
    return {
      form: {}
    }
  },
  // mounted() {
  //     this.editRecord()
  // },
  methods: {
    editRecord () {
      this.params.edit(this.params.value)
    },
    deleteRecord () {
      this.params.delete(this.params.value)
    }  
  },
  computed:{
    // country() {
    //     this.editRecord()
    // },
    // ...mapState({
    //         country: state => state.country
    //     })
  }
}
</script>