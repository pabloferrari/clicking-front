<template>
    <div id="simple-calendar-app">
        <div class="vx-card no-scroll-content">
    
            <calendar-view
                ref="calendar"
                class="theme-default"
                eventContentHeight="1.65rem"
                eventBorderHeight="0px"
                :eventTop="'3rem'"
                :items="eventos"
                style="height: 500px !important"
                >

                <div slot="header" class="mb-4">

                    <div class="vx-row no-gutter">

                        <div class="vx-col w-1/3 items-center sm:flex hidden">
                            <vs-button icon-pack="feather" icon="icon-plus" @click="promptAddNewEvent(new Date())">Add</vs-button>
                        </div>

                        <div class="vx-col sm:w-1/3 w-full sm:my-0 my-3 flex sm:justify-end justify-center order-last">
                            <div class="flex items-center">
                                <feather-icon
                                    :icon="$vs.rtl ? 'ChevronRightIcon' : 'ChevronLeftIcon'"
                                    @click="updateMonth(-1)"
                                    svgClasses="w-5 h-5 m-1"
                                    class="cursor-pointer bg-primary text-white rounded-full" />

                                <span class="mx-3 text-xl font-medium whitespace-no-wrap">{{ showDate | month }}</span>

                                <feather-icon
                                    :icon="$vs.rtl ? 'ChevronLeftIcon' : 'ChevronRightIcon'"
                                    @click="updateMonth(1)"
                                    svgClasses="w-5 h-5 m-1"
                                    class="cursor-pointer bg-primary text-white rounded-full" />
                            </div>
                        </div>

                        <div class="vx-col sm:w-1/3 w-full flex justify-center">
                            <template v-for="(view, index) in calendarViewTypes">
                                <vs-button
                                    v-if="calendarView === view.val"
                                    :key="String(view.val) + 'filled'"
                                    type="filled"
                                    class="p-3 md:px-8 md:py-3"
                                    :class="{'border-l-0 rounded-l-none': index, 'rounded-r-none': calendarViewTypes.length !== index+1}"
                                    @click="calendarView = view.val"
                                    >{{ view.label }}</vs-button>
                                <vs-button
                                    v-else
                                    :key="String(view.val) + 'border'"
                                    type="border"
                                    class="p-3 md:px-8 md:py-3"
                                    :class="{'border-l-0 rounded-l-none': index, 'rounded-r-none': calendarViewTypes.length !== index+1}"
                                    @click="calendarView = view.val"
                                    >{{ view.label }}</vs-button>
                            </template>
                        </div>
                    
                    </div>

                    <div class="vx-row sm:flex hidden mt-4">
                    
                        <div class="vx-col w-full flex">
                            <div class="flex flex-wrap sm:justify-start justify-center">
                                <div v-for="(type, index) in eventTypes" :key="index" class="flex items-center mr-4 mb-2">
                                    <div class="h-3 w-3 inline-block rounded-full mr-2" :style="`background-color: ${type.color};`"></div>
                                    <span>{{ type.name }}</span>
                                </div>
                            </div>
                        </div>
                    
                    </div>
                    
                </div>

            </calendar-view>
        
        </div>

        <vs-prompt
            class="calendar-event-dialog"
            title="Add Event"
            accept-text= "Add Event"
            @accept="addEvent"
            :is-valid="validForm"
            :active.sync="activePromptAddEvent">

            <div class="calendar__label-container flex">

                <vs-chip v-if="labelLocal != 'none'" class="text-white" :class="'bg-' + labelColor(labelLocal)">{{ labelLocal }}</vs-chip>

                <vs-dropdown vs-custom-content vs-trigger-click class="ml-auto my-2 cursor-pointer">

                    <feather-icon icon="TagIcon" svgClasses="h-5 w-5" class="cursor-pointer" @click.prevent></feather-icon>

                    <vs-dropdown-menu style="z-index: 200001">
                        <vs-dropdown-item v-for="(type, index) in eventTypes" :key="index" @click="labelLocal = type.id">
                            <div class="h-3 w-3 inline-block rounded-full mr-2" :class="'bg-' + type.color"></div>
                            <span>{{ type.name }}</span>
                        </vs-dropdown-item>

                        <vs-dropdown-item @click="labelLocal = 'none'">
                            <div class="h-3 w-3 mr-1 inline-block rounded-full mr-2 bg-primary"></div>
                            <span>None</span>
                        </vs-dropdown-item>
                    </vs-dropdown-menu>
                </vs-dropdown>

            </div>

            <vs-input name="event-name" v-validate="'required'" class="w-full" label-placeholder="Event Title" v-model="title"></vs-input>
            <div class="my-4">
                <small class="date-label">Start Date</small>
                <datepicker :language="$vs.rtl ? langHe : langEn" name="start-date" v-model="startDate" :disabled="disabledFrom"></datepicker>
            </div>
            <div class="my-4">
                <small class="date-label">End Date</small>
                <datepicker :language="$vs.rtl ? langHe : langEn" :disabledDates="disabledDatesTo" name="end-date" v-model="endDate"></datepicker>
            </div>
            <vs-input name="event-url" v-validate="'url'" class="w-full mt-6" label-placeholder="Event URL" v-model="url" :color="!errors.has('event-url') ? 'success' : 'danger'"></vs-input>

        </vs-prompt>

        <vs-prompt
            class="calendar-event-dialog"
            title="Edit Event"
            accept-text= "Submit"
            cancel-text = "Remove"
            button-cancel = "border"
            @cancel="removeEvent"
            @accept="editEvent"
            :is-valid="validForm"
            :active.sync="activePromptEditEvent">

            <div class="calendar__label-container flex">

                <vs-chip v-if="labelLocal != 'none'" class="text-white" :class="'bg-' + labelColor(labelLocal)">{{ labelLocal }}</vs-chip>

                <vs-dropdown vs-custom-content class="ml-auto my-2 cursor-pointer">

                    <feather-icon icon="TagIcon" svgClasses="h-5 w-5" @click.prevent></feather-icon>

                    <vs-dropdown-menu style="z-index: 200001">
                            <vs-dropdown-item v-for="(label, index) in calendarLabels" :key="index" @click="labelLocal = label.value">
                                <div class="h-3 w-3 inline-block rounded-full mr-2" :class="'bg-' + label.color"></div>
                                <span>{{ label.text }}</span>
                            </vs-dropdown-item>

                            <vs-dropdown-item @click="labelLocal = 'none'">
                                <div class="h-3 w-3 mr-1 inline-block rounded-full mr-2 bg-primary"></div>
                                <span>None</span>
                            </vs-dropdown-item>
                    </vs-dropdown-menu>
                </vs-dropdown>

            </div>

            <vs-input name="event-name" v-validate="'required'" class="w-full" label-placeholder="Event Title" v-model="title"></vs-input>
            <div class="my-4">
                <small class="date-label">Start Date</small>
                <datepicker :language="$vs.rtl ? langHe : langEn" :disabledDates="disabledDatesFrom" name="start-date" v-model="startDate"></datepicker>
            </div>
            <div class="my-4">
                <small class="date-label">End Date</small>
                <datepicker :language="$vs.rtl ? langHe : langEn" :disabledDates="disabledDatesTo" name="end-date" v-model="endDate"></datepicker>
            </div>
            <vs-input name="event-url" v-validate="'url'" class="w-full mt-6" label-placeholder="Event URL" v-model="url" :color="!errors.has('event-url') ? 'success' : 'danger'"></vs-input>

        </vs-prompt>
  
    </div>
</template>

<script>

import { CalendarView, CalendarViewHeader } from 'vue-simple-calendar'
require('vue-simple-calendar/static/css/default.css')
import moduleCalendar from '../../store/modules/calendar.js'
import { mapGetters } from 'vuex'
import Datepicker from 'vuejs-datepicker'
import { es, en, he } from 'vuejs-datepicker/src/locale'
import moment from 'moment'

export default {
  components: {
    CalendarView,
    CalendarViewHeader,
    Datepicker
  },
  data () {
    return {
      showDate: moment(String(new Date())).format('DD/MM/YYYY'),
      showDate: new Date(),
      disabledFrom: false,
      locale: es,
      id: 0,
      title: '',
      startDate: '',
      endDate: '',
      labelLocal: 'none',
      month: 2,

      langHe: he,
      langEn: en,

      url: '',
      calendarView: 'month',

      activePromptAddEvent: false,
      activePromptEditEvent: false,

      calendarViewTypes: [
        {
          label: 'month',
          val: 'month'
        },
        {
          label: 'Week',
          val: 'week'
        },
        {
          label: 'Year',
          val: 'year'
        }
      ],

      eventos: [
        {
          title  : 'event1',
          start  : '2021-02-01'
        },
        {
          title  : 'event2',
          start  : '2021-02-05',
          end    : '2021-02-07'
        },
        {
          title  : 'event3',
          start  : '2021-02-09T12:30:00',
          allDay : false
        }
			  ],
      config: {
        locale: 'es'
      },

      eventTypes: []
      // id - A unique identifier for the item. This is required and must be unique.
      // startDate - The date the item starts on the calendar. This must be either passed as a JavaScript date object or as a string following an ISO-like form of "yyyy-mm-dd HH:MM:SS" (time is optional, and within time, minutes and seconds are both optional).
      // endDate - The date the item ends on the calendar. Defaults to the same date as startDate. This must be either passed as a JavaScript date object, or as a string following an ISO-like form of yyyy-mm-dd HH:MM:SS (time is optional, and within time, minutes and seconds are both optional).
      // title - The name of the item shown on the calendar. Defaults to "Untitled".
      // url - The URL associated with the item. The component has no built-in action associated with this, but it does add a "hasUrl" class to the item. To "follow" the URL, you'll need to listen for the click-item event and take the appropriate action.
      // classes - An array of strings with any additional CSS classes you wish to assign to the item.
      // style - A string with any additional CSS styles you wish to apply to the item.
    }
  },
  computed: {
    // simpleCalendarEvents () {
    //   return this.$store.state.calendar.events
    // },
    // validForm () {
    //   return this.title !== '' && this.startDate !== '' && this.endDate !== '' && Date.parse(this.endDate) - Date.parse(this.startDate) >= 0 && !this.errors.has('event-url')
    // },
    // disabledDatesTo () {
    //   return { to: new Date(this.startDate) }
    // },
    // disabledDatesFrom () {
    //   return { from: new Date(this.endDate) }
    // },
    // calendarLabels () {
    // //   return this.$store.state.calendar.eventLabels
    //     this.$store.dispatch('calendar/getEventTypes')
    // },
    // labelColor () {
    //   return (label) => {
    //     if      (label === 'business') return 'success'
    //     else if (label === 'work')     return 'warning'
    //     else if (label === 'personal') return 'danger'
    //     else if (label === 'none')     return 'primary'
    //   }
    // },
    // windowWidth () {
    //   return this.$store.state.windowWidth
    // },
    // ...mapGetters({
    //   storeEventTypes: 'calendar/getEventTypes'
    // })
  },
  methods: {
    // addEvent () {
    //   const obj = { title: this.title, startDate: this.startDate, endDate: this.endDate, label: this.labelLocal, url: this.url }
    //   obj.classes = `event-${  this.labelColor(this.labelLocal)}`
    //   this.$store.dispatch('calendar/addEvent', obj)
    // },
    // updateMonth (val) {
    //   this.showDate = this.$refs.calendar.getIncrementedPeriod(val)
    // },
    // clearFields () {
    //   this.title = this.endDate = this.url = ''
    //   this.id = 0
    //   this.labelLocal = 'none'
    // },
    // promptAddNewEvent (date) {
    //   this.disabledFrom = false
    //   this.addNewEventDialog(date)
    // },
    // addNewEventDialog (date) {
    //   this.clearFields()
    //   this.startDate = date
    //   this.endDate = date
    //   this.activePromptAddEvent = true
    // },
    // openAddNewEvent (date) {
    //   this.disabledFrom = true
    //   this.addNewEventDialog(date)
    // },
    // openEditEvent (event) {
    //   const e = this.$store.getters['calendar/getEvent'](event.id)
    //   this.id = e.id
    //   this.title = e.title
    //   this.startDate = e.startDate
    //   this.endDate = e.endDate
    //   this.url = e.url
    //   this.labelLocal = e.label
    //   this.activePromptEditEvent = true
    // },
    // editEvent () {
    //   const obj = { id: this.id, title: this.title, startDate: this.startDate, endDate: this.endDate, label: this.labelLocal, url: this.url }
    //   obj.classes = `event-${  this.labelColor(this.labelLocal)}`
    //   this.$store.dispatch('calendar/editEvent', obj)
    // },
    // removeEvent () {
    //   this.$store.dispatch('calendar/removeEvent', this.id)
    // },
    // eventDragged (event, date) {
    //   this.$store.dispatch('calendar/eventDragged', {event, date})
    // },
    // thisMonth(d, h, m) {
    // 	const t = new Date()
    // 	return new Date(t.getFullYear(), t.getMonth(), d, h || 0, m || 0)
    // },
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
    // storeEventTypes (data) {
    //     const rows = []
    //     data.map((element) => {
    //         const newRow = {
    //             id: element.id,
    //             name: element.name,
    //             color: element.color
    //         }
    //         console.log(`eventTypes -> `, newRow);
    //         rows.push(newRow)
    //     })
    //     this.eventTypes = rows
    // }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/vuexy/apps/simple-calendar.scss";
</style>
