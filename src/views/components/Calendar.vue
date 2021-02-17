<template>
  <div>

    <div class="vx-col w-1/6 items-center sm:flex hidden">
      <vs-button icon-pack="feather" icon="icon-plus" @click="promptAddNewEvent(new Date())">Add</vs-button>
    </div>

    <full-calendar
      :events="events"
      :config="config"
    ></full-calendar>


    <vs-prompt
      class="calendar-event-dialog"
      title="Add Event"
      accept-text= "Add Event"
      @accept="addEvent"
      :is-valid="validForm"
      :active.sync="activePromptAddEvent">

      <div class="calendar__label-container flex">

        <vs-chip v-if="labelLocal != 0" class="text-white" :style="`background-color: ${labelGetColor(labelLocal)};`">{{ labelGetName(labelLocal) }}</vs-chip>

        <vs-dropdown vs-custom-content vs-trigger-click class="ml-auto my-2 cursor-pointer">
          <feather-icon icon="TagIcon" svgClasses="h-5 w-5" class="cursor-pointer" @click.prevent></feather-icon>
          <vs-dropdown-menu style="z-index: 200001">
            <vs-dropdown-item v-for="(type, index) in eventTypes" :key="index" @click="labelLocal = type.id">
              <div class="h-3 w-3 inline-block rounded-full mr-2" :style="`background-color: ${type.color};`"></div>
              <span>{{ type.name }}</span>
            </vs-dropdown-item>

          </vs-dropdown-menu>
        </vs-dropdown>
      </div>

      <vs-input name="event-name" v-validate="'required'" class="w-full" label-placeholder="Event Title" v-model="title"></vs-input>
      <div class="my-4">
        <small class="date-label">Fecha Inicio</small>
        <datepicker :language="es" name="start-date" v-model="startDate" :disabled="disabledFrom"></datepicker>
      </div>
      <div class="my-4">
        <small class="date-label">Fecha Final</small>
        <datepicker :language="es" :disabledDates="disabledDatesTo" name="end-date" v-model="endDate"></datepicker>
      </div>
      <vs-input name="event-url" v-validate="'url'" class="w-full mt-6" label-placeholder="Event URL" v-model="url" :color="!errors.has('event-url') ? 'success' : 'danger'"></vs-input>
    </vs-prompt>

  </div>
</template>

<script>
import { FullCalendar } from 'vue-full-calendar'
import 'fullcalendar/dist/locale/es'
import { es } from 'vuejs-datepicker/src/locale'

import moduleCalendar from '../../store/modules/calendar.js'
import { mapGetters } from 'vuex'
import Datepicker from 'vuejs-datepicker'
import moment from 'moment'

export default {
  components: {
    FullCalendar,
    Datepicker
  },
  data () {
    return {
      events: [],
      config: {
        locale: 'es'
      },
      es,
      eventTypes: [],
      // PROPS FROM CALLENDAR
      labelLocal: 0,
      activePromptAddEvent: false,
      title: '',
      startDate: new Date(),
      endDate: new Date(),
      url: 'https://meet.google.com',
      disabledFrom: false

    }
  },
  computed: {
    ...mapGetters({
      storeEvents: 'calendar/getEvents',
      storeEventTypes: 'calendar/getEventTypes'
    }),
    validForm () {
      return this.title !== '' && this.startDate !== '' && this.endDate !== '' && Date.parse(this.endDate) - Date.parse(this.startDate) >= 0 && !this.errors.has('event-url')
    },
    disabledDatesTo () {
      return { to: new Date(this.startDate) }
    }
  },
  methods: {
    addEvent () {
      // const obj = { title: this.title, startDate: this.startDate, endDate: this.endDate, label: this.labelLocal, url: this.url }
      // obj.classes = `event-${  this.labelColor(this.labelLocal)}`
      // this.$store.dispatch('calendar/addEvent', obj)
    },

    clearFields () {
      this.title = this.endDate = this.url = ''
      this.id = 0
      this.labelLocal = 'none'
    },
    promptAddNewEvent (date) {
      this.disabledFrom = false
      this.addNewEventDialog(date)
    },
    addNewEventDialog (date) {
      this.clearFields()
      this.startDate = date
      this.endDate = date
      this.activePromptAddEvent = true
    },
    openAddNewEvent (date) {
      this.disabledFrom = true
      this.addNewEventDialog(date)
    },
    openEditEvent (event) {
      const e = this.$store.getters['calendar/getEvent'](event.id)
      this.id = e.id
      this.title = e.title
      this.startDate = e.startDate
      this.endDate = e.endDate
      this.url = e.url
      this.labelLocal = e.label
      this.activePromptEditEvent = true
    },
    editEvent () {
      const obj = { id: this.id, title: this.title, startDate: this.startDate, endDate: this.endDate, label: this.labelLocal, url: this.url }
      obj.classes = `event-${  this.labelColor(this.labelLocal)}`
      this.$store.dispatch('calendar/editEvent', obj)
    },
    removeEvent () {
      this.$store.dispatch('calendar/removeEvent', this.id)
    },
    eventDragged (event, date) {
      this.$store.dispatch('calendar/eventDragged', {event, date})
    },
    thisMonth (d, h, m) {
      const t = new Date()
      return new Date(t.getFullYear(), t.getMonth(), d, h || 0, m || 0)
    },
    getCalendarTypes () {
      this.$store.dispatch('calendar/getEventTypes')
    },
    getCalendarEvents () {
      this.$store.dispatch('calendar/getEvents')
    },
    labelGetColor (id) {
      const el = this.eventTypes.filter(e => e.id = id)
      if (el.length == 1) return el[0].color
      return ''
    },
    labelGetName (id) {
      const el = this.eventTypes.filter(e => e.id = id)
      if (el.length == 1) return el[0].name
      return ''
    }
  },
  created () {
    // this.$store.registerModule('calendar', moduleCalendar)
    // this.$store.dispatch('calendar/fetchEvents')
    // this.$store.dispatch('calendar/fetchEventLabels')
  },
  beforeDestroy () {
    // this.$store.unregisterModule('calendar')
  },
  watch: {
    storeEventTypes (data) {
      const rows = []
      data.map((element) => {
        const newRow = {
          id: element.id,
          name: element.name,
          color: element.color
        }
        console.log('eventTypes -> ', newRow)
        rows.push(newRow)
      })
      this.eventTypes = rows
    },
    storeEvents (data) {
      const rows = []
      data.map((element) => {
        const newRow = {
          id: element.id,
          title: `${element.title} - ${element.type.name}`,
          backgroundColor: element.type.color,
          borderColor: element.type.color,
          url: element.external_link,
          textColor: '#000',
          start: element.start_date,
          end: element.end_date
        }
        console.log('events -> ', newRow)
        rows.push(newRow)
      })
      this.events = rows
    }
  },
  mounted () {
    this.getCalendarTypes()
    this.getCalendarEvents()
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/vuexy/apps/simple-calendar.scss";
</style>
