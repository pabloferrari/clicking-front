<template>
  <div>
    <div id="form-model" class="grid-layout-container alignment-block">
      <div class="vx-row">
        <div class="vx-col w-full">
          <p class="primary">Mis Anotaciones</p>
        </div>
      </div>
      <vs-row vs-type="flex" vs-justify="flex-end" class="mb-base">
        <vs-col vs-type="flex" vs-justify="flex-end" vs-align="center">
          <vs-button
            class="mb-4 md:mb-0"
            :icon="'icon-plus'"
            :icon-pack="'feather'"
            @click="showModal(true)"
            >{{ btnTitle }}</vs-button
          >
        </vs-col>
      </vs-row>

      <!-- Modal -->
      <vs-prompt
        @accept="accept"
        :title="`${actionModal} Nota`"
        accept-text="Guardar"
        cancel-text="Cancelar"
        :active.sync="activePrompt"
      >
        <div class="con-exemple-prompt">
          <NoteFrom
            ref="NoteFrom"
            :isCreate="this.iscreated"
            :idEdit="this.idEdit"
            @close-modal="closeModal()"
          />
        </div>
      </vs-prompt>
      <!-- Modal -->

      <Notes
        @editNote="editNote($event)"
        @deleteNote="deleteNote($event)"
        @addNoteContent="addNoteContent($event)"
        @editNoteContent="editNoteContent($event)"
        @deleteNoteContent="deleteNoteContent($event)"
      />

      <!-- Modal -->
      <vs-prompt
        @accept="acceptDelete"
        title="Elminar Nota"
        text="esta seguro de eliminar?"
        accept-text="Guardar"
        cancel-text="Cancelar"
        :active.sync="activePromptDelete"
      >
      </vs-prompt>
      <!-- Modal -->

      <!-- Modal -->
      <vs-prompt
        @accept="acceptContent"
        :title="`${actionModalContent} `"
        accept-text="Guardar"
        cancel-text="Cancelar"
        :active.sync="activePromptContent"
      >
        <div class="con-exemple-prompt">
          <NoteContentFrom
            ref="NoteContentForm"
            :isCreate="this.iscreatedContent"
            :note="this.note"
            :noteContent="this.noteContent"
            @close-modal="closeModalContent()"
          />
        </div>
      </vs-prompt>
      <!-- Modal -->
    </div>
  </div>
</template>

<script>
import Notes from './Notes'
import NoteFrom from './NoteFrom'
import NoteContentFrom from './NoteContentFrom'

export default {
  name: 'MyNotes',
  components: {
    Notes,
    NoteFrom,
    NoteContentFrom
  },
  data () {
    return {
      note: {},
      noteContent: {},
      btnTitle: 'Crear Nota',
      activePrompt: false,
      idEdit: null,
      actionModal: '',
      actionModalContent: '',
      iscreated: null,
      iscreatedContent: null,
      idDeleted: null,
      idDeletedContent: null,
      activePromptDelete: false,
      activePromptContent: false
    }
  },
  methods: {
    accept () {
      this.activePrompt = true
      this.$refs.NoteFrom.save()
    },
    showModal (iscreated) {
      this.actionModal = iscreated ? 'Añadir' : 'Editar'
      this.iscreated = iscreated
      this.activePrompt = true
    },
    closeModal () {
      this.idEdit = null
      this.activePrompt = false
    },
    closeModalContent () {
      this.noteConent = null
      this.note = null
      this.actionModalContent = ''
      this.activePromptContent = false
    },
    editNote (noteId) {
      this.iscreated = false
      this.idEdit = noteId
      this.showModal(false)
    },
    deleteNote (noteId) {
      this.idDeleted = noteId
      this.showModalConfirm()
    },
    showModalConfirm () {
      this.activePromptDelete = true
    },
    acceptDelete () {
      if (this.idDeletedContent) {
        this.$store.dispatch('noteContents/deleteNoteContent', this.idDeletedContent)
        this.idDeletedContent = null
      } else {
        this.$store.dispatch('notes/deleteNote', this.idDeleted)
        this.idDeleted = null
      }
    },
    addNoteContent (data) {
      this.note = this.$store.state.notes.notes.find(
        x => x.id === parseInt(data)
      )
      this.actionModalContent = 'Añadir'
      this.activePromptContent = true
      this.iscreatedContent = true
    },
    editNoteContent (data) {
      const ids = data.split('.')
      this.note = this.$store.state.notes.notes.find(
        x => x.id === parseInt(ids[0])
      )
      this.noteContent = this.note.note_contents.find(
        x => x.id === parseInt(ids[1])
      )
      this.actionModalContent = 'Editar'
      this.activePromptContent = true
      this.iscreatedContent = false
    },
    deleteNoteContent (data) {
      const ids = data.split('.')
      this.idDeletedContent = ids[1]
      this.showModalConfirm()
    },
    acceptContent () {
      this.activePromptContent = true
      this.$refs.NoteContentForm.save()
    }
  }
}
</script>

<style lang="scss" scoped>
.primary {
  font-family: Gilroy;
  font-style: normal;
  font-weight: 800;
  font-size: 28px;
  line-height: 44px;
  display: flex;
  align-items: center;
  color: #567df4;
}
</style>
