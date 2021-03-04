<template>
  <div class="vx-row">
    <div
      class="vx-col w-full sm:w-1/2 lg:w-1/3 mb-base"
      v-for="note in notes"
      :key="note.id"
    >
      <vx-card
        :card-background="getColor(note.color)"
        :content-color="getColorText(note.color)"
        :title-color="getColorText(note.color)"
      >
        <vs-row vs-type="flex" class="mb-base">
          <vs-col
            vs-type="flex"
            vs-justify="flex-start"
            vs-align="center"
            vs-w="6"
          >
            <h4 :style="'color:' + getColorText(note.color)">
              {{ note.title }}
            </h4>
          </vs-col>
          <vs-col
            vs-type="flex"
            vs-justify="flex-end"
            vs-align="center"
            vs-w="6"
          >
            <ButtonDropDown
              :dataSelected="[]"
              :items="itemsDropdown(note)"
            ></ButtonDropDown>
          </vs-col>
        </vs-row>

        <vs-row
          class="mb-base"
          v-for="content in note.note_contents"
          :key="content.id"
          vs-w="12"
        >
          <vs-col
            vs-type="flex"
            vs-justify="flex-center"
            vs-align="center"
            vs-w="12"
            v-if="content.type === 1"
          >
            <p>{{ content.content }}</p>
          </vs-col>
          <vs-col
            vs-type="flex"
            vs-justify="center"
            vs-align="center"
            vs-w="2"
            v-if="content.type !== 1"
          >
            <vs-checkbox
              class="mt-2"
              v-if="content.type === 2 || content.type === 3"
              v-model="content.checkValue"
              @change="checkValue(content, note)"
            />
          </vs-col>
          <vs-col
            vs-type="flex"
            vs-justify="star"
            vs-align="center"
            vs-w="9"
            v-if="content.type !== 1"
          >
            <p>{{ content.content }}</p>
          </vs-col>
          <vs-col
            vs-type="flex"
            vs-justify="center"
            vs-align="center"
            vs-w="1"
            v-if="content.type !== 1"
          >
            <ButtonDropDown
              :dataSelected="[]"
              :items="itemsDropdownContent(note, content)"
            ></ButtonDropDown>
          </vs-col>
        </vs-row>

      </vx-card>
    </div>
  </div>
</template>

<script>
import ButtonDropDown from '../components/ButtonDropDown.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Notes',
  components: {
    ButtonDropDown
  },
  data () {
    return {
      notes: [],
      colorList: [
        { id: 1, name: 'primary' },
        { id: 2, name: 'info' },
        { id: 3, name: 'success' },
        { id: 4, name: 'warning' },
        { id: 5, name: 'danger' },
        { id: 6, name: 'default' }
      ]
    }
  },
  computed: {
    ...mapGetters({ notesStore: 'notes/getNotes' })
  },
  watch: {
    notesStore (data) {
      this.notes = data
    }
  },
  methods: {
    getCheckValue (type) {
      return type === 3 ? 1 : 0
    },
    getColor (color) {
      const colorName = this.colorList.find(x => {
        if (x.id === parseInt(color)) {
          return x.name
        }
      }).name
      if (colorName === 'info') {
        return '#00cfe8'
      } else if (colorName) {
        return colorName
      } else {
        return 'default'
      }
    },
    getColorText (color) {
      const colorName = this.colorList.find(x => {
        if (x.id === parseInt(color)) {
          return x.name
        }
      }).name
      if (colorName && colorName !== 'default') {
        return '#fff'
      } else {
        return '#5e5873'
      }
    },
    itemsDropdown (data) {
      const list = data.note_contents.filter(x => x.type === 2 || x.type === 3)
      const items = list.length > 0 || data.note_contents.length === 0 ? [{id: `c.${data.id}`, title: 'Agregar', action: this.addNoteContent }] : []
      items.push(
        {
          id: `u.${data.id}`,
          title: 'Editar',
          action: this.editNote
        },
        {
          id: `d.${data.id}`,
          title: 'Eliminar',
          action: this.deleteNote
        }
      )

      return items
    },
    itemsDropdownContent (note, content) {
      return [
        {
          id: `u.${note.id}.${content.id}`,
          title: 'Editar',
          action: this.editNoteContent
        },
        {
          id: `d.${note.id}.${content.id}`,
          title: 'Eliminar',
          action: this.deleteNoteContent
        }
      ]
    },
    getNotes () {
      this.$store.dispatch('notes/getData').then(response => {
        this.notes = JSON.parse(JSON.stringify(response)).map(item => {
          item.note_contents = item.note_contents.map(content => {
            content.checkValue = content.type === 3 ? 1 : 0
            return content
          })
          return item
        })
      })
    },
    editNote (data) {
      this.$emit('editNote', data.target.dataset.id.replace('u.', ''))
    },
    deleteNote (data) {
      this.$emit('deleteNote', data.target.dataset.id.replace('d.', ''))
    },
    addNoteContent (data) {
      this.$emit('addNoteContent', data.target.dataset.id.replace('c.', ''))
    },
    editNoteContent (data) {
      this.$emit('editNoteContent', data.target.dataset.id.replace('u.', ''))
    },
    deleteNoteContent (data) {
      this.$emit('deleteNoteContent', data.target.dataset.id.replace('d.', ''))
    },
    checkValue (content, note) {
      const newContent = Object.assign({}, content)
      newContent.note_id = note.id
      newContent.type = newContent.checkValue ? 2 : 3
      this.$store.dispatch('noteContents/updateNote', newContent)
    }
  },
  mounted () {
    this.getNotes()
  }
}
</script>

<style lang="scss" scoped></style>
