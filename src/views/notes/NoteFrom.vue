<template>
  <div id="form-form">
    <form action="form" method="post">
      <div class="vx-row mb-2">
        <div class="vx-col w-full">
          <vs-input
            class="w-full"
            label-placeholder="Titulo"
            v-model="form.title"
            name="Titulo"
            v-validate="'required'"
            :danger="errors.has('Titulo')"
          />
          <span class="text-danger text-sm" v-show="errors.has('Titulo')">{{
            errors.first("Titulo")
          }}</span>
        </div>
      </div>

      <div class="vx-row mb-2">
        <div class="vx-col w-full">
          <vs-select v-model="form.color" class="mt-5 w-full" name="Color" v-validate="'required'">
              <vs-select-item key="" value="" selected text="Color" />
              <vs-select-item :key="item.id" :value="item.id" :text="item.name" v-for="item in colorList" />
          </vs-select>
          <span class="text-danger text-sm" v-show="errors.has('Color')">{{ errors.first('Color') }}</span>
        </div>
      </div>

      <div class="vx-row mb-6">
        <div class="vx-col w-full">
          <vs-select v-model="form.type" class="mt-5 w-full" name="Tipo" v-validate="'required'">
              <vs-select-item key="" value="" selected text="Tipo" />
              <vs-select-item :key="item.id" :value="item.id" :text="item.name" v-for="item in typeList" />
          </vs-select>
          <span class="text-danger text-sm" v-show="errors.has('Tipo')">{{ errors.first('Tipo') }}</span>
        </div>
      </div>

      <div class="vx-row" v-if="form.type === 1">
        <div class="vx-col w-full">
          <vs-textarea height="70px" name="Contenido" counter="200" :counter-danger.sync="counterDanger" label="Contenido" v-model="form.content" v-validate="'required|max:200'" />
          <span class="text-danger text-sm" v-show="errors.has('Contenido')">{{ errors.first('Contenido') }}</span>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: 'NoteFrom',
  props: {
    isCreate: Boolean,
    idEdit: null
  },
  data () {
    return {
      list: false,
      counterDanger: false,
      form: {
        id: null,
        userId: null,
        title: '',
        color: '',
        content: '',
        type: ''
      },
      colorList: [
        {id: 1, name: 'primary'},
        {id: 2, name: 'info'},
        {id: 3, name: 'success'},
        {id: 4, name: 'warning'},
        {id: 5, name: 'danger'},
        {id: 6, name: 'default'}
      ],
      typeList: [
        {id: 1, name: 'Texto'},
        {id: 2, name: 'Lista'}
      ]
    }
  },
  mounted () {
    this.setData()
  },
  methods: {
    setData () {
      if (this.idEdit) {
        const note = Object.assign({}, this.$store.state.notes.notes.find(x => x.id === parseInt(this.idEdit)))
        this.form.id = note.id
        this.form.title = note.title
        this.form.color = parseInt(note.color)
        this.form.content = note.note_contents[0].content
        this.form.type = note.note_contents[0].type
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
      this.$validator.validateAll().then((result) => {
        if (result) {
          const payload = {
            id: null,
            userId: null,
            title: this.form.title,
            color: this.form.color,
            contents: this.form.content ? [{content: this.form.content, type: this.form.type}] : []
          }
          this.$store.dispatch('notes/createNote', payload)
          this.$emit('close-modal')
        }
      })
    },
    update () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          const payload = {
            id: this.form.id,
            userId: null,
            title: this.form.title,
            color: this.form.color,
            contents: this.form.content ? [{content: this.form.content, type: this.form.type}] : []
          }
          this.$store.dispatch('notes/updateNote', payload)
          this.$emit('close-modal')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
