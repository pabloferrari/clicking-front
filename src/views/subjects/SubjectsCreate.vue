<template>
  <div id="form-form">
        <form action="form" method="post">
            <div class="vx-row mb-2">
                <div class="vx-col w-full">
                    <vs-input
                    class="w-full"
                        label-placeholder="Nombre Materia"
                        v-model="form.name"
                        name="name"
                        v-validate="'required'" :danger="errors.has('name')"
                    />
                    <span class="text-danger text-sm" v-show="errors.has('name')">{{ errors.first('name') }}</span>
                </div>
            </div>
            
        </form>
  </div>
</template>


<script>
// import { mapGetters } from 'vuex'
export default {
  name: 'SubjectsCreate',
  props: {
    isCreate: Boolean,
    subject: {}
  },

  data () {
    return {
      form: {
        id: null,
        name: ''
      }
    }
  },
  mounted () {
    this.setData()
  },
  methods: {
    setData () {
      if (this.subject) {
        this.form = Object.assign({}, this.subject)
      }
    },
    save () {
      if (!this.isCreate) {
        this.update()
      } else {
        this.create()
      }
    },
    create () {
      this.$validator.validateAll().then(result => {
        if (result) {
          const  payload = this.form
          this.$store.dispatch('subject/createSubject', payload)
          this.$emit('close-modal')
        }
      })
    },

    update () {
      const  payload = this.form
      this.$store.dispatch('subject/updateSubject', payload)
      this.$emit('close-modal')
    }
  }
}
</script>
