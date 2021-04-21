<template>
  <div class="collapse">
    <div
      class="vx-row my-2"
      v-for="(classes, index) in classesList"
      :key="index"
    >
      <div class="w-full p-1">
        <div class="flex justify-between">
          <div class="w-full bg-white rounded-full">
            <div class="flex justify-between">
              <div
                class="text-center px-4 py-2 m-2 cursor-pointer"
                @click="showContent(classes.assignments)"
              >
                <div class="px-6 py-2">
                  <div class=" ">
                    <feather-icon
                      icon="CheckIcon"
                      svgClasses="h-8 w-8 text-success "
                    />
                    <span class="text-xl text-title font-semibold text-justify">
                      {{ index + 1 }}.
                      {{ classes.title }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="text-center px-2 py-2 m-2">
                <div class="items-end">
                  <div class="flex space-x-4">
                    <vs-button
                      v-if="!isLive(classes.id) && isTeacher()"
                      icon-pack="feather"
                      icon="icon-play"
                      color="primary"
                      type="border"
                      @click="startMeeting(classes)"
                      :disabled="buttonDisabled"
                      >
                        <span class="font-semibold">{{ titleButton }}</span>
                    </vs-button>

                    <vs-button
                      v-if="isLive(classes.id)"
                      icon-pack="feather"
                      icon="icon-close"
                      color="danger"
                      type="border"
                      @click="endMeeting()"
                      >
                        <span class="font-semibold">Finalizar clase</span>
                    </vs-button>

                    <vs-button
                      v-if="isLive(classes.id)"
                      icon-pack="feather"
                      icon="icon-play"
                      color="success"
                      type="border"
                      >
                      <a
                        v-if="isLive(classes.id)"
                        :href="meetingUrl"
                        target="__blank">
                        <span class="font-semibold">Ingresar a la clase</span>
                      </a>
                    </vs-button>
                    <vs-button
                      v-if="classes.folder"
                      color="primary"
                      type="border"
                      icon-pack="feather"
                      icon="icon-folder"
                      @click="goToFolder(classes.folder.id)"
                    ></vs-button>

                    <ButtonDropDown
                      :dataSelected="classes"
                      v-permission="['teacher']"
                      :items="DropDownList"
                    ></ButtonDropDown>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full backgroud-internal-content mx-10">
        <div
          class=""
          v-for="(assignments, index) in classes.assignments"
          :key="index"
        >
          <CollapseBody
            :dataCollapseBody="assignments"
            :studentsList="courseStudents"
          ></CollapseBody>
        </div>
      </div>
    </div>

    <div v-for="(user, i) in users" :key="i + '_part'">
      {{ user.type == "moderator" ? "moderador" : `participante ${i}` }} ->
      <a :href="user.public_url" target="'_blank'"> {{ user.public_url }}</a
      ><br /><br />
    </div>


    <!-- Popup Link -->
    <vs-prompt
      v-if="isTeacher()"
      @accept="saveLink"
      title="Cargar link de clase"
      accept-text="Guardar"
      cancel-text="Cancelar"
      :active.sync="activePromptLink"
    >
      <LinkForm
        @close-modal-class="closeModalLink(false)"
        :classId="this.classId"
        ref="LinkForm"
      ></LinkForm>
    </vs-prompt>
    <!-- END MODAL -->

  </div>
</template>

<script>
// import ListIcon from "../components/icons/ListIcon";
import ButtonDropDown from './ButtonDropDown'
import LinkForm from './LinkForm'
import CollapseBody from './CollapseBody'
export default {
  name: 'Collapse',
  components: {
    // ListIcon,
    ButtonDropDown,
    // Toolbars,
    CollapseBody,
    LinkForm
  },
  props: {
    classesList: Array,
    DropDownList: Array,
    courseStudents: null
  },
  data () {
    return {
      titleButton: 'Cargar link de clase en vivo',
      liveMeeting: [],
      meetingId: null,
      meetingUrl: null,
      showDetails: '',
      collapseBodyProp: null,
      dataStudents: [],
      users: [],
      buttonDisabled: false,
      activePromptLink: false,
      classId: null
    }
  },
  methods: {
    changeHadlerDropDown () {
      console.log('handler change dropwdown')
    },
    showModalClass (object, event) {
      const classId = object.id
      // const assignmentId = event.id
      this.$emit('input', { classId, action: event.action })
    },

    goToFolder (id) {
      this.$router.push(`/courses/folders/files/${id}`)
    },

    showContent () {
      // console.log(data);
      // this.$set(data, 'showDetails', !data.showDetails)
      // this.collapseBodyProp = data;
    },
    startMeeting (classes) {
      this.classId = classes.id
      this.activePromptLink = true
    },
    endMeeting () {
      this.$store.dispatch('meeting/finish', { id:this.meetingId })
    },

    isLive (id) {
      const meet = this.liveMeeting.find(e => e.id === id)
      if (!meet) return false
      return meet.live
    },

    saveLink () {
      this.$refs.LinkForm.saveLink()
      // const meeting = this.$store.state.meeting.meeting;
      // this.meetingId = meeting.id;
      // this.meetingUrl = meeting.link;
      // this.liveMeeting = true;
    },
    getMeetingData () {

    },
    isTeacher () {
      const { roles } = this.$store.state.auth.authUser
      let isTeacher = false
      roles.forEach(r => {
        if (r.slug === 'teacher') isTeacher = true
      })
      return isTeacher
    }

  },
  watch: {
    '$store.state.bigBlueButton.users' (val) {
      this.users = val
      this.buttonDisabled = false
    },
    '$store.state.meeting.meeting' (meeting) {
      this.meetingId = meeting.id
      this.meetingUrl = meeting.link
      this.liveMeeting.forEach(c => {
        if (c.id === meeting.model_id) c.live = true
        else c.live = false
      })
    }
  },
  mounted () {
    this.isTeacher()
    this.liveMeeting = []
    this.$props.classesList.map(cl => {
      this.liveMeeting.push({ id: cl.id, live: false })
    })
  }
}
</script>
<style>
.backgroud-internal {
  background: #eef7fe;
}
.text-red {
  color: #ff5a5a;
}
.text-title {
  color: #22215b;
}
.success {
  color: green;
}
.backgroud-internal-content {
  border-left: 2px solid;
}
.show {
  display: none;
}
</style>
