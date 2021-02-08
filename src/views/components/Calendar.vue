<template>
  <div>
    {{ eventTypes }}
    <full-calendar 
      :events="events" 
      :config="config"
    ></full-calendar>
  
  
  </div>
</template>

<script>
import { FullCalendar } from 'vue-full-calendar'
import 'fullcalendar/dist/locale/es'

import moduleCalendar from '../../store/modules/calendar.js'
import { mapGetters } from 'vuex'
import moment from 'moment';

export default {
  components: {
    FullCalendar
  },
  data () {
    return {
      events: [],
      config: {
        locale: 'es',
      },

      eventTypes: []

    }
  },
  computed: {
    ...mapGetters({
      storeEvents: 'calendar/getEvents',
      storeEventTypes: 'calendar/getEventTypes'
    })
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
    thisMonth(d, h, m) {
			const t = new Date()
			return new Date(t.getFullYear(), t.getMonth(), d, h || 0, m || 0)
		},
    getCalendarTypes () {
      this.$store.dispatch('calendar/getEventTypes')
    },
    getCalendarEvents () {
      this.$store.dispatch('calendar/getEvents')
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
            console.log(`eventTypes -> `, newRow);
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
                end: element.end_date,
            }
            console.log(`events -> `, newRow);
            rows.push(newRow)
        })
        this.events = rows
    }
  },
  mounted() {
    this.getCalendarTypes();
    this.getCalendarEvents();
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/vuexy/apps/simple-calendar.scss";
</style>
