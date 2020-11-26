<template>
  <vs-popup :title="ModalTitle" :active.sync="action">

    <ClassroomForm></ClassroomForm>

  </vs-popup>
</template>

<script>
import ClassroomForm from './ClassroomForm'

export default {
  name: 'ModalSection',
  components: {
    ClassroomForm
  },
  props: {
    ModalTitle: '',
    action: null,
    children: null
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="css">
  .con-vs-popup .vs-popup {
    width: 900px !important;
  }
  .btn-right {
    position: absolute;
    right: 1rem;
    z-index: 999;
  }
</style>
