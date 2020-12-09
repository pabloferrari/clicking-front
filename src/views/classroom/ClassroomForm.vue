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
              label-placeholder="Nombre salón"
              v-model="form.name"
              class="w-full sm:w-auto"
            />
          </div>
        </div>

        <div class="vx-row">
          <div class="vx-col sm:w-4/4 w-full mb-2">
            <vs-select
                v-model="form.shift_id"
                label="Turno"
                class="mt-5 w-full"
                name="item-shift"
                v-validate="'required'"
              >
              <vs-select-item key="" value="" selected text="seleccione turno" />
              <vs-select-item
                :key="item.id"
                :value="item.id"
                :text="item.name"
                v-for="item in shiftList"
              />
            </vs-select>
          </div>

        </div>

        <div class="vx-row">
          <div class="vx-col sm:w-1/3 w-full mb-2">
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

          <div class="vx-col sm:w-1/3 w-full mb-2">
            <vs-select
              v-model="form.course_type_id"
              label="Tipo Curso"
              class="mt-5 w-full"
              name="item-shift"
              v-validate="'required'"
            >
              <vs-select-item key="" value="" selected text="seleccione tipo curso" />
              <vs-select-item
                :key="item.id"
                :value="item.id"
                :text="item.name"
                v-for="item in this.courseTypesList"
              />
            </vs-select>
          </div>

          <div class="vx-col sm:w-1/3 w-full mb-2">
            <vs-select
              v-model="form.teacher_id"
              label="Docente"
              class="mt-5 w-full"
              name="item-shift"
              v-validate="'required'"
            >
              <vs-select-item key="" value="" selected text="seleccione docente" />
              <vs-select-item
                :key="item.id"
                :value="item.id"
                :text="item.name"
                v-for="item in this.teachersList"
              />
            </vs-select>
          </div>
        </div>

        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-2">
            <vs-button @click="addCourse" color="primary" type="flat">+ Añadir Curso</vs-button>
          </div>
        </div>

        <div class="vx-row">
          <div class="vx-col sm:w-4/4 w-full mb-2">
            <vs-table stripe :data="form.courses">
              <template slot="thead">
                <vs-th></vs-th>
                <vs-th>Curso</vs-th>
                <vs-th>Tipo Curso</vs-th>
                <vs-th>Docente</vs-th>
              </template>

              <template slot-scope="{ data }">
                <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td :data="data[indextr].id">
                    <vs-button
                      type="border"
                      size="small"
                      icon-pack="feather"
                      icon="icon-trash"
                      color="danger"
                      @click="removeCourse(indextr)"
                    ></vs-button>
                  </vs-td>
                  <vs-td :data="data[indextr].subject_id">
                    {{ data[indextr].subject_txt }}
                  </vs-td>
                  <vs-td :data="data[indextr].course_type_id">
                    {{ data[indextr].course_type_txt }}
                  </vs-td>
                  <vs-td :data="data[indextr].teacher_id">
                    {{ data[indextr].teacher_txt }}
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>
        </div>

        <div class="vx-row relative h-32 ">
          <div class="vx-col w-full mb-2 flex flex-wrap justify-end sm:flex-row absolute bottom-0 right-0 left-15">
            <vs-button
              color="primary"
              type="flat"
              class="w-full sm:w-auto mb-8 sm:mb-auto mt-3 sm:mt-auto cancel-btn"
              @click="closeModal"
              >Cancelar</vs-button
            >
            <vs-button @click="create" class="w-full sm:w-auto">Crear</vs-button>
          </div>
        </div>

      </div>

      <!-- RIGHT DATA FORM ALUMNO -->
      <div class="vx-col sm:w-full md:w-full lg:w-1/3 mb-auto mx-auto right-data-form mr-3">

          <div class="mt-base">
            <label class="typo__label">Asignar alumnos</label>
            <multiselect
                v-model="form.student_id"
                :options="studentsList"
                :multiple="true"
                :close-on-select="false"
                :clear-on-select="false"
                :preserve-search="true"
                placeholder="Buscar Alumnos"
                label="name"
                track-by="id"
                selectLabel="Seleccionar"
                deselectLabel="Quitar"
                >
            </multiselect>
          </div>
          <br />

          <AvatarList
            :dataAvatarList="cardData"
            :description="description"
          ></AvatarList>

      </div>
</div>
</template>

<script>

import AvatarList from '../components/AvatarList'
import vSelect from 'vue-select'
import Multiselect from 'vue-multiselect'

export default {
  name: 'ClassroomForm',
  components: {
    AvatarList,
    'v-select': vSelect,
    Multiselect
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
    dataAvatar: Array,
    popupActive: null,
    cardData: Array
  },
  watch: {
    popupActive (newVal) { // watch it  (newVal, oldVal)
      if (newVal) {
        this.clearFields()
      }
    }
  },
  methods: {
    clearFields () {
      Object.keys(this.form).forEach((element) => {
        this.form[element] = (Array.isArray(this.form[element])) ? [] : ''
      })
      this.$validator.reset()
    },
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
    closeModal () {
      this.$emit('close-modal')
    },
    removeCourse (indextr) {
      //console.log(indextr);
      this.form.courses.splice(indextr, 1)
      //console.log(this.courses);
    },
    addCourse () {
      //.log('Agregando Curso');
      //console.log(this.courses);

      if (!this.form.subject_id || !this.form.course_type_id || !this.form.teacher_id) {
        return false
      }


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

      let duplicateKey = false
      this.form.courses.map((element) => {
        if (
          element.course_type_id === this.form.course_type_id &&
          element.subject_id === this.form.subject_id &&
          element.teacher_id  === this.form.teacher_id
        ) {
          duplicateKey = true
        }
      })

      if (!duplicateKey) {
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
      } else {
        console.log('Duplicate key')
      }
      //console.log(this.courses);
      //console.log(this.form.student_id)
    },
    create () {
      //console.log("Creando...");
      this.$validator.validateAll().then(result => {
        if (result) {
          const userAuth = localStorage.userAuth
          const parseJson = JSON.parse(userAuth)
          this.form.institution_id = parseJson.institution_id
          const payload = this.form
          this.$store.dispatch('classroom/createClassroom', payload)
          //this.closeModal()
          this.clearFields()
        } else {
          console.log('input empty')
        }
      })
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
      userPosts: [{}]
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

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
