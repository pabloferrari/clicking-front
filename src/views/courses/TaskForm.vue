<template>
   <div class="vx-row">
      <!-- LEFT DATA FORM -->
      <div class="vx-col lg:block lg:w-1/2 mb-auto mx-auto self-center mt-8">
        <div class="vx-card__title mb-8">
          <h4 class="mb-4 font-semibold text-title">{{title}}</h4>
        </div>

        <div class="vx-row">
          <div class="vx-col w-full mb-2">
            <vs-input
              type="text"
              label-placeholder="Titulo Tarea"
              v-model="form.name"
              class="w-full sm:w-auto"
            />
          </div>
        </div>

        <div class="vx-row">
          <div class="vx-col w-full mb-2">
             <vs-textarea label="Instrucciones" class="w-full sm:w-auto"/>
          </div>
        </div>

        <div class="vx-row">
          <div class="vx-col w-full">
              <vs-button size="small" color="primary" type="border" icon-pack="feather" icon="icon-paperclip" class="w-full sm:w-auto">Adjuntar</vs-button>
          </div>
        </div>

        <br /><br /><br /><br />
        <div class="vx-row relative h-32 " >
          <div class="vx-col w-full mb-2 flex flex-wrap justify-end sm:flex-row absolute bottom-0 right-0 left-15">
            <vs-button
            color="primary"
            type="flat"
            class="w-full sm:w-auto mb-8 sm:mb-auto mt-3 sm:mt-auto cancel-btn "
            >Cancelar</vs-button
          >
          <vs-button @click="create" class="w-full sm:w-auto">Crear</vs-button>
          </div>
        </div>
      </div>

      <!-- RIGHT DATA FORM -->
      <div class="vx-col sm:w-full md:w-full lg:w-1/3 mb-auto mx-auto right-data-form mr-3">

          <div class="vx-row">
            <div class="vx-col w-full mb-2">
              <vs-select
                  v-model="form.subject_id"
                  label="Curso"
                  class="mt-5 w-full"
                  name="item-shift"
                  v-validate="'required'"
                >
                <vs-select-item key="" value="" selected text="seleccione curso" />
                <vs-select-item
                  :key="item.id"
                  :value="item.id"
                  :text="item.name"
                  v-for="item in this.subjectsList"
                />
              </vs-select>
            </div>
          </div>

          <div class="vx-row">
            <div class="vx-col w-full mb-2">
              <vs-select
                  v-model="form.subject_id"
                  label="Tema"
                  class="mt-5 w-full"
                  name="item-shift"
                  v-validate="'required'"
                >
                <vs-select-item key="" value="" selected text="seleccione tema" />
                <vs-select-item
                  :key="item.id"
                  :value="item.id"
                  :text="item.name"
                  v-for="item in this.subjectsList"
                />
              </vs-select>
            </div>
          </div>

          <div class="vx-row">
            <div class="vx-col w-full mb-2">
              <br />
              <label for="" class="vs-select--label">Fecha limite de entrega</label>
              <div>
                <flat-pickr class ="w-full " :config="configdateTimePicker" v-model="datetime" placeholder="Fecha limite de entrega" />
              </div>

            </div>
          </div>

          <div>
            <vs-select label="Asignar a" placeholder="Asignar a" multiple class="selectExample w-full sm:w-auto mt-5" v-model="form.student_id">
                <vs-select-item key="" value="" selected text="seleccione alumnos" />
                <vs-select-item :key="index" :value="item.id" :text="item.name" v-for="(item,index) in studentsList" />
            </vs-select>
          </div>
      </div>

</div>
</template>

<script>

import AvatarList from '../components/AvatarList'
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'

export default {
  name: 'ClassroomForm',
  components: {
    AvatarList,
    'v-select': vSelect,
    flatPickr
  },
  props: {
    title: null,
    shiftList: null,
    subjectsList: null,
    courseTypesList: null,
    studentsList: null,
    teachersList: null,
    isCreate: Boolean,
    descriptionAvatar: String,
    dataAvatar: Array
  },
  methods: {
    setData () {
      if (this.plan) {
        this.form = Object.assign({}, this.plan)
      }
    },
    save () {
      if (!this.isCreate) {
        this.update()
      } else {
        this.create()
      }
    },
    removeCourse (indextr) {
      //console.log(indextr);
      this.form.courses.splice(indextr, 1)
      //console.log(this.courses);
    },
    addCourse () {
      //.log('Agregando Curso');
      //console.log(this.courses);

      let subject_txt = ''
      this.subjectsList.map((element) => {
        if (element.id === this.form.subject_id) {
          subject_txt = element.name
        }
      })

      let course_type_txt = ''
      this.courseTypesList.map((element) => {
        if (element.id === this.form.course_type_id) {
          course_type_txt = element.name
        }
      })

      let teacher_txt = ''
      this.teachersList.map((element) => {
        if (element.id === this.form.teacher_id) {
          teacher_txt = element.name
        }
      })

      this.form.courses.push(
        {
          subject_txt,
          course_type_txt,
          teacher_txt,
          subject_id: this.form.subject_id,
          course_type_id: this.form.course_type_id,
          teacher_id: this.form.teacher_id
        }
      )
      //console.log(this.courses);
      //console.log(this.form.student_id)
    },
    create () {
      //console.log("Creando...");
      const userAuth = localStorage.userAuth
      const parseJson = JSON.parse(userAuth)
      this.form.institution_id = parseJson.institution_id
      const payload = this.form
      //console.log(payload);
      // this.$validator.validateAll().then((result) => {
      //   if (result) {
      //     const payload = this.form
      this.$store.dispatch('classroom/createClassroom', payload)
      //   }
      // })
    },

    update () {
      const payload = this.form
      this.$store.dispatch('plan/updatePlan', payload)
      //this.$emit("close-modal");
    }
  },
  data () {
    return {
      description: 'Cursando',
      value1: '',
      datetime: null,
      configdateTimePicker: {
        enableTime: true,
        dateFormat: 'd-m-Y H:i'
      },
      form: {
        id: null,
        name: '',
        shift_id: '',
        institution_id: '',
        subject_id: '',
        teacher_id: '',
        classroom_id: '',
        course_type_id: '',
        student_id: [],
        courses: []
      },
      // courses: [
      //   // {
      //   //   id: 1,
      //   //   subject_txt: 'Matemáticas',
      //   //   course_type_txt: 'Course',
      //   //   teacher_txt: 'Pedro',
      //   //   subject_id: 1,
      //   //   course_type_id: 1,
      //   //   teacher_id: 1
      //   // }
      // ],
      userPosts: [
        {
          likes: 100,
          usersLiked: [
            {
              name: 'Trina Lynes',
              img: require('@/assets/images/portrait/small/avatar-s-1.jpg')
            },
            {
              name: 'Lilian Nenez',
              img: require('@/assets/images/portrait/small/avatar-s-2.jpg')
            },
            {
              name: 'Alberto Glotzbach',
              img: require('@/assets/images/portrait/small/avatar-s-3.jpg')
            }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="css">
.right-data-form{
  background: #EEF7FE;
}

[dir] .mb-auto {
  margin-bottom: 0 !important;
}

div .vs-popup--content {
  padding: 0 !important;
  margin: 0 !important;
  overflow-x: hidden !important;
}

.vs-popup--content{
  width: 100% !important;
  border-radius: 5px !important;
}

.text-title {
  color: #22215b;
}
</style>
