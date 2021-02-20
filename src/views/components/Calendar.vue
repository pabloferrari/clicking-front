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
      title="Crear evento"
      accept-text= "Crear evento"
      @accept="addEvent"
      :is-valid="validForm"
      :active.sync="activePromptAddEvent">

      <div class="calendar__label-container flex">

        <vs-chip v-if="labelLocal != 0" class="text-white" :style="`background-color: ${eventTypeColor};`">{{ eventTypeName }}</vs-chip>

        <vs-dropdown vs-custom-content vs-trigger-click class="ml-auto my-2 cursor-pointer">
          <feather-icon icon="TagIcon" svgClasses="h-5 w-5" class="cursor-pointer" @click.prevent></feather-icon>
          <vs-dropdown-menu style="z-index: 200001">
            <vs-dropdown-item v-for="(type, index) in eventTypes" :key="index" @click="setEventType(type)">
              <div class="h-3 w-3 inline-block rounded-full mr-2" :style="`background-color: ${type.color};`"></div>
              <span>{{ type.name }}</span>
            </vs-dropdown-item>

          </vs-dropdown-menu>
        </vs-dropdown>
      </div>

      <vs-input name="event-name" v-validate="'required'" class="w-full" label-placeholder="Titulo" v-model="form.title"></vs-input>
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
      <vs-input name="external_link" class="w-full mt-6" label-placeholder="URL" v-model="form.external_link" :color="!errors.has('event-url') ? 'success' : 'danger'"></vs-input>
      
      <vs-input name="notes" class="w-full mt-6" label-placeholder="Notas" v-model="form.notes" :color="!errors.has('event-url') ? 'success' : 'danger'"></vs-input>

    </vs-prompt>

  </div>
</template>

<script>

import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'

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
    Datepicker,
    flatPickr
  },
  data () {

    const now = new Date();
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
        end_date: new Date(now.getTime() + 30*60000),
        
      },
      eventTypeColor: '',
      eventTypeName: ''
    }
  },
  computed: {
    ...mapGetters({
      storeEvents: 'calendar/getEvents',
      storeEventTypes: 'calendar/getEventTypes'
    }),
    validForm () {

      console.log('title ', this.form.title !== '')
      console.log('start_date ', this.form.start_date !== '', this.form.start_date, this.dateToDateTime(this.parseDate(this.form.start_date)))
      console.log('end_date ', this.form.end_date !== '', this.form.end_date, this.dateToDateTime(this.parseDate(this.form.end_date)))
      console.log('diff ', Date.parse(this.form.start_date) - Date.parse(this.form.end_date) >= 0, (Date.parse(this.form.start_date) - Date.parse(this.form.end_date)))
      
      return this.form.title !== ''   
        && this.form.start_date !== '' 
        && this.form.end_date !== '' 
        && Date.parse(this.parseDate(this.form.end_date)) - Date.parse(this.parseDate(this.form.start_date)) >= 0 
        && this.form.event_type_id != 0
    },
    disabledDatesTo () {
      return { to: new Date(this.startDate) }
    }
  },
  methods: {
    parseDate(date) {
      // this function has to return format Y-m-d H:i
      const isValid = new Date(date);
      if(isValid.getTime() === isValid.getTime()) return isValid;
      
      const dates = date.split(' ')[0];
      const hours = date.split(' ')[1];
      const dmy = dates.split('-');
      return new Date(`${dmy[2]}-${dmy[1]}-${dmy[0]} ${hours}`);

    },
    dateToDateTime(date) {
      return `${date.getFullYear()}-${this.parseNumber(date.getMonth()+1)}-${this.parseNumber(date.getDate())} ${this.parseNumber(date.getHours())}:${this.parseNumber(date.getMinutes())}`;
    },
    parseNumber(num) {
      return num < 10 ? `0${num}` : `${num}`;
    },
    setEventType(eventType) {
      this.eventTypeColor = eventType.color;
      this.eventTypeName = eventType.name;
      this.labelLocal = eventType.id;
      this.form.event_type_id = eventType.id;
    },
    addEvent () {
      const obj = { title: this.form.title, event_type: this.form.event_type_id, start_date: this.dateToDateTime(this.parseDate(this.form.start_date)), end_date: this.dateToDateTime(this.parseDate(this.form.end_date)), external_link: this.form.external_link, notes: this.form.notes }
      console.log(`New Event -> ${JSON.stringify(obj)}`);
      // obj.classes = `event-${  this.labelColor(this.labelLocal)}`
      // this.$store.dispatch('calendar/addEvent', obj)
    },

    clearFields () {
      // this.title = this.endDate = this.url = ''
      // this.id = 0
      // this.labelLocal = 0
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

      console.log(`labelGetName(${id})`);
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
      data.map(element => {
        if(this.form.event_type_id == 0) {
          this.form.event_type_id = element.id;
          this.eventTypeName = element.name;
          this.eventTypeColor = element.color;
          this.labelLocal = element.id;
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
