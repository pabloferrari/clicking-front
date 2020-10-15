<template>
<div id="form-form">
    <form action="form" method="post">
        <div class="vx-row mb-2">
            <div class="vx-col w-full">
                <vs-input class="w-full" label-placeholder="Nombre y Apellido" v-model="form.name" name="Nombre y Apellido" v-validate="'required'" :danger="errors.has('Nombre y Apellido')" />
                <span class="text-danger text-sm" v-show="errors.has('Nombre y Apellido')">{{ errors.first('Nombre y Apellido') }}</span>
            </div>
        </div>
        <div class="vx-row mb-2">
            <div class="vx-col w-full">
                <vs-input class="w-full" label-placeholder="Email" v-model="form.email" name="email" v-validate="'required|email'" :danger="errors.has('email')" />
                <span class="text-danger text-sm" v-show="errors.has('email')">{{ errors.first('email') }}</span>
            </div>
        </div>
        <div class="vx-row mb-2">
            <div class="vx-col w-full">
                <vs-input class="w-full" label-placeholder="Telefono" v-model="form.phone" :danger="errors.has('phone')" />

            </div>
        </div>
        <div class="vx-row mb-2">
            <div class="vx-col w-full">
                <vs-select   v-model="form.dataTurns" @change="changeCommission($event)" label="Turno" class="mt-5 w-full" name="Turno" v-validate="'required'">
                    <!-- <vs-select-item key="" value="" text="seleccione plan" /> -->
                    <vs-select-item  :key="item.id" :value="item.id" :text="item.name" v-for="item in turnList" />
                </vs-select>
                <span class="text-danger text-sm" v-show="errors.has('Turno')">{{ errors.first('Turno') }}</span>
            </div>
        </div>

        <div class="vx-row mb-2">
            <div class="vx-col w-full">
                <vs-select

                v-model="form.dataCommissions"
                label="Comisión"
                class="mt-5 w-full"
                name="Comisión"
                v-validate="'required'">
                    <!-- <vs-select-item key="" value="" selected text="seleccione país" /> -->
                    <vs-select-item  :key="item.id" :value="item.id" :text="item.name" v-for="item in commissionList" />
                </vs-select>
                <span class="text-danger text-sm" v-show="errors.has('Comisión')">{{ errors.first('Comisión') }}</span>
            </div>
        </div>

      <div class="vx-row mb-2">
        <div class="vx-col w-full">
          <vs-checkbox v-model="form.active">Activo</vs-checkbox>
        </div>
      </div>
    </form>
</div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: 'TeachersCreate',
  props: {
    isCreate: Boolean,
    teachers: {},
    turnList: null,
    cities: null,
    commissionListData: null,
    idEdit: null
  },
  data () {
    return {
      form: {
        id: null,
        name: '',
        phone: '',
        email:'',
        active:1,
        dataTurns: '',
        dataCommissions:''
      },

      commissionList: null,
    }
  },
  mounted () {

    this.setData()
  },
  // watch:{
  //   error(err){
  //     this.errorMessage = err

  //   }
  // },
  computed: {
   ...mapGetters({ error: 'teacher/getError' }),
  },

  methods: {
    setData () {
      // console.log(this.idEdit)
      if (this.teachers) {
        if(this.idEdit) {
          const teacher =  Object.assign({}, this.$store.state.teacher.teachers.find(x => x.id === this.idEdit))
          console.log(teacher)
          if(teacher) {
              let commissions
              let turns
              teacher.commissions.forEach((c) => { commissions = Object.assign({},c) })
              teacher.turns.forEach((t) => { turns = Object.assign({},t) })

              this.form.id = this.idEdit
              this.form.name = teacher.name
              this.form.email = teacher.email
              this.form.phone = teacher.phone
              this.form.active = teacher.active
              this.form.dataTurns =turns.id
              this.form.dataCommissions = commissions.id
          }
        }
      }else {
        const ObjectEmpty = Object.assign(this.form, this.teachers)
        this.form = ObjectEmpty
      }

    },

    dataSelectMultiple(data) {
      const options = []
      data.map((val) =>  {
        if(val) {
          options.push({
            id:val.id,
            // name:val.name
          })

        }
      })
      return options
    },
    save () {
      if (!this.isCreate) {
        this.update()
      } else {

        this.create()
      }
    },
    create () {
      this.$validator.validateAll().then(result => {
        if (result) {
          const payload = this.form

          this.$store.dispatch('teacher/createTeacher', payload)
          // if(this.error ) {
            this.$emit('close-modal')
          // }
        }
      })
    },
    update () {
      console.log(this.error)
      this.$validator.validateAll().then(result => {
        if (result) {
          const payload = this.form
          this.$store.dispatch('teacher/updateTeacher', payload)
          // if(this.error) {
            this.$emit('close-modal')
          // }
        }
      })
    },

    changeCommission(id) {
      const dataCommissions = []
       const commissions = this.commissionListData.map((value) => {
         if(value.turn.id == id) {
            dataCommissions.push({
              id:value.id,
              name:value.name
            })
         }

       })

      this.commissionList = dataCommissions
    }
  }
}
</script>
