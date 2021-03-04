<template>
  <div id="form-form">
        <form action="form" method="post">
          <div class="vx-col w-full">
            <vs-textarea height="70px" name="Contenido" counter="200" :counter-danger.sync="counterDanger" label="Contenido" v-model="form.content" v-validate="'required|max:200'" />
            <span class="text-danger text-sm" v-show="errors.has('Contenido')">{{ errors.first('Contenido') }}</span>
          </div>
        </form>
  </div>
</template>


<script>
// import { mapGetters } from 'vuex'
export default {
  name: 'NoteContentForm',
  props: {
    isCreate: Boolean,
    note: {},
    noteContent: {}
  },

  data () {
    return {
      form: {
        id: null,
        content: '',
        type: null
      },
      counterDanger: false
    }
  },
  mounted () {
    this.setData()
  },
  methods: {
    setData () {
      if (this.note) {
        this.form = Object.assign({}, this.noteContent)
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
          payload.type = 2
          payload.note_id = this.note.id
          this.$store.dispatch('noteContents/createNoteContent', payload)
          this.$emit('close-modal')
        }
      })
    },
    update () {
      const  payload = this.form
      payload.note_id = this.note.id
      this.$store.dispatch('noteContents/updateNote', payload)
      this.$emit('close-modal')
    }
  }
}
</script>
