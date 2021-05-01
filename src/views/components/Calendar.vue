/* eslint-disable multiline-ternary */
<template>
  <div>
    <div class="vx-row">
      <div class="vx-col w-2/3">
        <vx-card class="title-card active-card my-1" :title="'Calendario'">
          <div class="vx-col w-1/6 items-center sm:flex hidden mb-4">
            <vs-button
              size="small"
              icon-pack="feather"
              @click="promptAddNewEvent(new Date())"
              >Crear Evento</vs-button
            >
          </div>
          <full-calendar :events="events" :config="config"></full-calendar>
        </vx-card>
      </div>

      <div class="vx-col w-1/3">

        <vx-card class="title-card active-card my-1 mb-2" :title="'Resumen'" v-permission="['student', 'teacher']">
          <!-- <div v-permission="['student']"> -->
          <div v-if="resumen.classes">
            <ul v-if="resumen.classes">
              <li>Clases: {{ resumen.classes }}</li>
              <li>Evaluaciones: {{ resumen.exams }}</li>
              <li>Trabajos Practicos: {{ resumen.tps }}</li>
              <li>Tareas: {{ resumen.tasks }}</li>
              <li>Asistencias: {{ resumen.assistance }}</li>
              <li>Ausencias: {{ resumen.absences }}</li>
            </ul>
            <div v-else>
              No hay informacion disponible
            </div>
          </div>
          <!-- 
          <div v-permission="['institution', 'admin', 'root']">
            No hay informacion disponible
          </div>
          -->
        </vx-card>
        <vx-card
          class="title-card active-card my-1"
          :title="'Proximos Eventos'"
        >
          <vx-card-inverse
            class="title-card active-card my-1"
            v-for="(event, index) in nextEvents"
            :key="index"
            :title="event.title"
            :supratitle="parseMoment(event.start, 'DD-MM-YYYY hh:mm')"
          >
          </vx-card-inverse>
          <div v-if="nextEvents.length === 0">
            No hay eventos disponibles
          </div>
        </vx-card>
      </div>
    </div>

    <vs-prompt
      class="calendar-event-dialog"
      title="Crear evento"
      accept-text="Crear evento"
      @accept="addEvent"
      :is-valid="validForm"
      :active.sync="activePromptAddEvent"
    >
      <div class="calendar__label-container flex">
        <vs-chip
          v-if="labelLocal != 0"
          class="text-white"
          :style="`background-color: ${eventTypeColor};`"
          >{{ eventTypeName }}</vs-chip
        >

        <vs-dropdown
          vs-custom-content
          vs-trigger-click
          class="ml-auto my-2 cursor-pointer"
        >
          <feather-icon
            icon="TagIcon"
            svgClasses="h-5 w-5"
            class="cursor-pointer"
            @click.prevent
          ></feather-icon>
          <vs-dropdown-menu style="z-index: 200001">
            <vs-dropdown-item
              v-for="(type, index) in eventTypes"
              :key="index"
              @click="setEventType(type)"
            >
              <div
                class="h-3 w-3 inline-block rounded-full mr-2"
                :style="`background-color: ${type.color};`"
              ></div>
              <span>{{ type.name }}</span>
            </vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
      </div>

      <vs-input
        name="event-name"
        v-validate="'required'"
        class="w-full"
        label-placeholder="Titulo"
        v-model="form.title"
      ></vs-input>
      <div class="my-4">
        <flat-pickr
          class="w-full"
          :config="configdateTimePicker"
          v-model="form.start_date"
          placeholder="Fecha Inicio"
          name="Fecha Inicio"
          v-validate="'required'"
          :danger="errors.has('Fecha Inicio')"
        />
      </div>
      <div class="my-4">
        <flat-pickr
          class="w-full"
          :config="configdateTimePicker"
          v-model="form.end_date"
          placeholder="Fecha Final"
          name="Fecha Final"
          v-validate="'required'"
          :danger="errors.has('Fecha Final')"
        />
      </div>
      <vs-input
        name="external_link"
        class="w-full mt-6"
        label-placeholder="URL"
        v-model="form.external_link"
        :color="!errors.has('event-url') ? 'success' : 'danger'"
      ></vs-input>

      <vs-input
        name="notes"
        class="w-full mt-6"
        label-placeholder="Notas"
        v-model="form.notes"
        :color="!errors.has('event-url') ? 'success' : 'danger'"
      ></vs-input>

      <vs-input
        name="guestsFinder"
        class="w-full mt-6"
        label-placeholder="Buscar invitado"
        @input="findGuests"
        v-model="guestsFinder"
      ></vs-input>

      <vs-select
        v-model="form.guests"
        label="Asignar A"
        multiple
        :dir="$vs.rtl ? 'rtl' : 'ltr'"
        class="selectExample w-full sm:w-auto mt-5"
        name="Asignar A"
        v-validate="'required'"
        :danger="errors.has('Asignar A')"
      >
        <vs-select-item
          :key="index"
          :value="guest.id"
          :text="guest.name"
          v-for="(guest, index) in this.guestsList"
        />
      </vs-select>
    </vs-prompt>

    <vs-prompt
      class="calendar-event-dialog"
      :title="currentEvent.title"
      v-if="activePromptShowEvent"
      :active.sync="activePromptShowEvent"
    >
      <div class="calendar__label-container flex">
        <vs-chip
          class="text-white"
          :style="`background-color: ${currentEvent.type.color};`"
          >{{ currentEvent.type.name }}</vs-chip
        >
      </div>

      <div class="eventItem">
        Comienza:
        <span class="itemAlignRight"
          >{{
            parseMoment(currentEvent.start_date, "DD-MM-YYYY hh:mm")
          }}
          hs.</span
        >
      </div>

      <div class="eventItem">
        Finaliza:
        <span class="itemAlignRight"
          >{{
            parseMoment(currentEvent.end_date, "DD-MM-YYYY hh:mm")
          }}
          hs.</span
        >
      </div>

      <div class="eventItem">
        Link:
        <span class="itemAlignRight">{{ currentEvent.external_link }}</span>
      </div>

      <div class="eventItem">
        Notas: <span class="itemAlignRight">{{ currentEvent.notes }}</span>
      </div>

      <div class="eventItem">
        Creador:
        <span class="itemAlignRight">
          <vs-avatar
            :src="
              currentEvent.creator.image ||
                require('@/assets/images/portrait/small/incognito.png')
            "
            size="30px"
            class="border-2 border-white border-solid -m-1"
          ></vs-avatar>
          {{ currentEvent.creator.name }}
        </span>
      </div>

      <div class="eventItem">Invitados</div>

      <ul class="guestList">
        <li v-for="(user, index) in currentEvent.users" :key="index">
          <vs-avatar
            :src="
              user.user.image ||
                require('@/assets/images/portrait/small/incognito.png')
            "
            size="30px"
            class="border-2 border-white border-solid -m-1"
          ></vs-avatar>
          <span style="padding: 5px;">
            {{ user.user.name }}
            <b-badge :variant="getUserTypeColor(user.user)">
              {{ getUserType(user.user) }}
            </b-badge>
          </span>
        </li>
      </ul>
    </vs-prompt>
  </div>
</template>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<script>
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'

import { FullCalendar } from 'vue-full-calendar'
import 'fullcalendar/dist/locale/es'
import { es } from 'vuejs-datepicker/src/locale'

import { mapGetters } from 'vuex'
import Datepicker from 'vuejs-datepicker'
import moment from 'moment'

import vSelect from 'vue-select'
import Multiselect from 'vue-multiselect'
import { BBadge } from 'bootstrap-vue'

export default {
  components: {
    FullCalendar,
    Datepicker,
    flatPickr,
    'v-select': vSelect,
    Multiselect,
    BBadge
  },
  data () {
    const now = new Date()
    return {
      events: [],
      nextEvents: [],
      resumen: [],
      config: {
        locale: 'es',
        slotMinTime: '07:00:00',
        scrollTime: '07:00:00',
        eventClick: this.eventClick
      },
      es,
      eventTypes: [],
      // PROPS FROM CALLENDAR
      labelLocal: 0,
      activePromptAddEvent: false,
      activePromptShowEvent: false,
      disabledFrom: false,
      configdateTimePicker: {
        enableTime: true,
        dateFormat: 'd-m-Y H:i'
      },
      form: {
        id: null,
        title: '',
        external_link: '',
        event_type_id: 0,
        notes: '',
        start_date: now,
        // eslint-disable-next-line no-mixed-operators
        end_date: new Date(now.getTime() + 30 * 60000),
        guests: []
      },
      eventTypeColor: '',
      eventTypeName: '',
      currentEvent: {},
      guestsFinder: '',
      guestsList: []
    }
  },
  computed: {
    ...mapGetters({
      storeEvents: 'calendar/getEvents',
      storeNextEvents: 'calendar/getNextEvents',
      storeEventTypes: 'calendar/getEventTypes',
      storeUserList: 'calendar/getUsers',
      storeResumen: 'dashboard/getResumen'
    }),
    validForm () {
      return (
        this.form.title !== '' &&
        this.form.start_date !== '' &&
        this.form.end_date !== '' &&
        Date.parse(this.parseDate(this.form.end_date)) -
          Date.parse(this.parseDate(this.form.start_date)) >=
          0 &&
        this.form.event_type_id !== 0
      )
    },
    disabledDatesTo () {
      return { to: new Date(this.startDate) }
    }
  },
  methods: {
    parseDate (date) {
      // this function has to return format Y-m-d H:i
      const isValid = new Date(date)
      if (isValid.getTime() === isValid.getTime()) return isValid

      const dates = date.split(' ')[0]
      const hours = date.split(' ')[1]
      const dmy = dates.split('-')
      return new Date(`${dmy[2]}-${dmy[1]}-${dmy[0]} ${hours}`)
    },

    dateToDateTime (date) {
      // this function parse it the Javascript Date to DATETIME
      return `${date.getFullYear()}-${this.parseNumber(
        date.getMonth() + 1
      )}-${this.parseNumber(date.getDate())} ${this.parseNumber(
        date.getHours()
      )}:${this.parseNumber(date.getMinutes())}`
    },

    parseNumber (num) {
      return num < 10 ? `0${num}` : `${num}`
    },

    parseMoment (date, format) {
      const validDate = new Date(date.replace(/-/g, '/'))
      return moment(validDate).format(format)
    },

    getUserType (user) {
      if (user.student) return 'estudiante'
      if (user.teacher) return 'profesor'
      return 'administrador'
    },

    getUserTypeColor (user) {
      if (user.student) return 'success'
      if (user.teacher) return 'warning'
      return 'danger'
      // <b-badge variant="primary">Primary</b-badge>
      // <b-badge>Secondary</b-badge>
      // <b-badge variant="success">Success</b-badge>
      // <b-badge variant="danger">Danger</b-badge>
      // <b-badge variant="warning">Warning</b-badge>
      // <b-badge variant="info">Info</b-badge>
      // <b-badge variant="dark">Dark</b-badge>
    },

    setEventType (eventType) {
      this.eventTypeColor = eventType.color
      this.eventTypeName = eventType.name
      this.labelLocal = eventType.id
      this.form.event_type_id = eventType.id
    },

    addEvent () {
      const payload = {
        title: this.form.title,
        event_type: this.form.event_type_id,
        start_date: this.dateToDateTime(this.parseDate(this.form.start_date)),
        end_date: this.dateToDateTime(this.parseDate(this.form.end_date)),
        external_link: this.form.external_link,
        notes: this.form.notes,
        guests: this.form.guests
      }
      this.$store.dispatch('calendar/addEvent', payload)
      this.clearFields()
    },

    eventClick (event) {
      console.log(event)
      const currentEvent = this.events.filter(e => e.id === event.id)
      this.currentEvent = currentEvent[0].data
      console.log(`Current -> ${JSON.stringify(currentEvent[0])}`)
      this.promptShowEvent()
    },

    clearFields () {
      this.form.title = this.form.notes = this.form.url = ''
      this.getCalendarEvents()
      // this.id = 0
      // this.labelLocal = 0
    },

    promptAddNewEvent (date) {
      this.disabledFrom = false
      this.addNewEventDialog(date)
    },

    promptShowEvent () {
      console.log(this.currentEvent)
      this.activePromptShowEvent = true
    },

    findGuests () {
      this.$store.dispatch('calendar/getUsers', this.guestsFinder)
    },

    addNewEventDialog () {
      this.clearFields()
      this.form.start_date = new Date()
      // eslint-disable-next-line no-mixed-operators
      this.form.end_date = new Date(new Date().getTime() + 30 * 60000)
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
      const obj = {
        id: this.id,
        title: this.title,
        startDate: this.startDate,
        endDate: this.endDate,
        label: this.labelLocal,
        url: this.url
      }
      obj.classes = `event-${this.labelColor(this.labelLocal)}`
      this.$store.dispatch('calendar/editEvent', obj)
    },

    removeEvent () {
      this.$store.dispatch('calendar/removeEvent', this.id)
    },

    eventDragged (event, date) {
      this.$store.dispatch('calendar/eventDragged', { event, date })
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
      this.$store.dispatch('calendar/getNextEvents')
    },
    getResumen () {
      this.$store.dispatch('dashboard/getResumenDashboard')
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
      data.map(element => {
        if (this.form.event_type_id === 0) {
          this.form.event_type_id = element.id
          this.eventTypeName = element.name
          this.eventTypeColor = element.color
          this.labelLocal = element.id
        }

        const newRow = {
          id: element.id,
          name: element.name,
          color: element.color
        }
        rows.push(newRow)
      })
      this.eventTypes = rows
    },
    storeEvents (data) {
      const rows = []
      data.map(element => {
        const newRow = {
          id: element.id,
          title: `${element.title} - ${element.type.name}`,
          backgroundColor: element.type.color,
          borderColor: element.type.color,
          url: element.external_link,
          textColor: '#000',
          start: element.start_date,
          end: element.end_date,
          data: element
        }
        rows.push(newRow)
      })
      this.events = rows
    },
    storeNextEvents (data) {
      const rows = []
      data.map(element => {
        const newRow = {
          id: element.id,
          title: `${element.title} - ${element.type.name}`,
          backgroundColor: element.type.color,
          borderColor: element.type.color,
          url: element.external_link,
          textColor: '#000',
          start: element.start_date,
          end: element.end_date,
          data: element
        }
        rows.push(newRow)
      })
      this.nextEvents = rows
    },
    storeUserList (data) {
      const rows = []
      data.map(element => {
        const type = element.student ? ' estudiante ' : element.teacher ? ' teacher ' : ' admin '
        const row = { id: element.id, name: `${element.name} - ${type}` }
        rows.push(row)
      })
      this.guestsList = rows
    },
    storeResumen (data) {
      this.resumen = data
    }
  },
  mounted () {
    this.getCalendarTypes()
    this.getCalendarEvents()
    this.getResumen()
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/vuexy/apps/simple-calendar.scss";

.eventItem {
  padding: 5px;
}

.itemAlignRight {
  text-align: right;
  float: right;
}

.guestList {
  padding-left: 25px;
}

.guestLitsEmail {
  font-style: italic;
  font-size: 10px;
}

.badge {
  display: inline-block;
  font-size: 85%;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  vertical-align: baseline;
  -webkit-transition: color 0.15s ease-in-out,
    background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
    background 0s, border 0s, -webkit-box-shadow 0.15s ease-in-out;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, background 0s, border 0s,
    -webkit-box-shadow 0.15s ease-in-out;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, background 0s,
    border 0s;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, background 0s,
    border 0s, -webkit-box-shadow 0.15s ease-in-out;
  color: #fff;
  padding: 0.3rem 0.5rem;
  text-align: center;
  border-radius: 0.358rem;
}

.badge.primary {
  background-color: #7367f0;
}
.badge-secondary {
  background-color: #82868b;
}
.badge-success {
  background-color: #28c76f;
}
.badge-danger {
  background-color: #ea5455;
}
.badge-warning {
  background-color: #ff9f43;
}
.badge-info {
  background-color: #00cfe8;
}
.badge-dark {
  background-color: #4b4b4b;
}
</style>
