<template>
  <div id="form-model" class="grid-layout-container alignment-block">
    <div class="vx-row my-4">
      <div class="vx-col w-full">
        <p class="primary">¿En que podemos ayudarte?</p>
      </div>
    </div>

    <div class="vx-row my-4">
      <div class="vx-col w-full">
        <p>Te damos la bienvenida al área de soporte de Clicking, acá podés dejar tu consulta y te responderemos a la brevedad para solventar tu caso   </p>
      </div>
    </div>


    <div class="flex">
      <div class="w-full">
        <vs-textarea
          height="50px"
          label="Escriba aqui su consulta"
          v-model="message"
          name="message"
          v-validate="'required'"
          :danger="errors.has('message')"
        />
        <span class="text-danger text-sm" v-show="errors.has('message')">{{
          errors.first("message")
        }}</span>
      </div>
    </div>
    <div class="flex flex-wrap items-center justify-end">
      <div class="">
        <vs-button @click="createTicket()" size="small">Enviar consulta</vs-button>
      </div>

    </div>
    <!-- List of Posts Publish Institutions -->
    <div class="vx-row my-4" v-permission="['admin']">
        <DataTable
            v-if="this.dataList.length > 0"
            :rowList="dataList"
            :btnCreateShow="false"
            :btnCreateTitle="false"
            :btnCreateIcon="'icon-plus'"
            :btnCreateIconPack="'feather'"
            @create-action="showModal(true)"
            :columns="columnDefs"
            ref="dataTable"
        >
        </DataTable>

    </div>

  </div>
</template>

<script>
import ListInformation from '../components/Posts/List'
import DataTable from '../components/DataTable'
import { mapGetters } from 'vuex'
import  moment  from 'moment'

export default {
  name: 'Tickets',
  components: {
    // TicketCreate,
    DataTable,
    ListInformation
  },
  data () {
    return {
      activePrompt: false,
      dataList: [],
      message: '',
      columnDefs: [
        {
          headerName: 'Mensaje',
          field: 'message'
        },
        {
          headerName: 'Usuario',
          field: 'user'
        },
        {
          headerName: 'Email',
          field: 'email'
        },
        {
          headerName: 'Fecha',
          field: 'date'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      storeTickets: 'tickets/getTickets'
    })
  },
  watch: {
    storeTickets (data) {
      const rows = []
      data.map((element) => {
        const newRow = {
          message: element.message,
          status: element.status.name,
          date:  this.formatDateTime(element.created_at),
          user: element.user.name,
          email: element.user.email
        }
        console.log('element -> ', newRow)
        rows.push(newRow)
      })
      this.dataList = rows
    }
  },
  methods: {
    getTickets () {

      const { roles } = this.$store.state.auth.authUser
      const role = roles[0]
      if (role && (role.id == 1 || role.id == 2)) {
        this.$store.dispatch('tickets/getTickets')
      } else {
        console.log(`Role: ${role.name}`)
      }
    },
    formatDateTime (datetime) {
      if (!datetime) {
        return null
      }
      return moment(String(datetime)).format('DD/MM hh:mm A')
    },
    createTicket () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          const payload = { message: this.message }
          console.log(`Payload -> ${JSON.stringify(payload)}`)

          this.$store.dispatch('tickets/createTicket', payload)
          this.message = ''
        }
      })
    }
  },

  mounted () {
    this.getTickets()
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
