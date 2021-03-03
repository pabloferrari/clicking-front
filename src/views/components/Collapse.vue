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
                      icon-pack="feather"
                      icon="icon-play"
                      color="primary"
                      type="border"
                      @click="startMeeting(classes)"
                      :disabled="buttonDisabled"
                    >
                      <span class="font-semibold">
                        {{ titleButton }}
                      </span></vs-button
                    >

                    <vs-button
                      color="primary"
                      type="border"
                      icon-pack="feather"
                      icon="icon-folder"
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
  </div>
</template>

<script>
// import ListIcon from "../components/icons/ListIcon";
import ButtonDropDown from './ButtonDropDown'

import CollapseBody from './CollapseBody'
export default {
  name: 'Collapse',
  components: {
    // ListIcon,
    ButtonDropDown,
    // Toolbars,
    CollapseBody
  },
  props: {
    classesList: Array,
    DropDownList: Array,
    courseStudents: null
  },
  data () {
    return {
      titleButton: 'Clase grabada',
      //   titleButton: 'clase grabada',
      showDetails: '',
      collapseBodyProp: null,
      dataStudents: [],
      users: [],
      buttonDisabled: false
    }
  },
  methods: {
    changeHadlerDropDown () {
      console.log('handler change dropwdown')
    },
    showModalClass (object, event) {
      const classId = object.id
      const assignmentId = event.id
      console.log(event, classId, assignmentId)

      this.$emit('input', { classId, action: event.action })
    },

    showContent () {
      // console.log(data);
      // this.$set(data, 'showDetails', !data.showDetails)
      // this.collapseBodyProp = data;
    },
    startMeeting (classes) {
      this.buttonDisabled = true
      const payload = { meeting_type: 8, model: 'class', model_id: classes.id, title: `${classes.title}: ${classes.description}` }
      this.$store.dispatch('bigBlueButton/create', payload)
    },
    getMeetingData () {

    }
  },
  watch: {
    '$store.state.bigBlueButton.users' (val) {
      this.users = val
      this.buttonDisabled = false
    }
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
