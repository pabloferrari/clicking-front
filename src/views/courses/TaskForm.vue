<template>
    <div class="vx-row">
        <!-- LEFT DATA FORM -->
        <div class="vx-col lg:block lg:w-1/2 mb-auto mx-auto self-center mt-8">
            <div class="vx-card__title mb-8">
                <h4 class="mb-4 font-semibold text-title">{{ title }}</h4>
            </div>

            <div class="vx-row">
                <div class="vx-col w-full mb-2">
                    <vs-input
                        type="text"
                        label-placeholder="Titulo Tarea"
                        v-model="form.titleTask"
                        name="Titulo"
                        class="w-full sm:w-auto"
                        v-validate="'required'"
                        :danger="errors.has('Titulo')"
                    />
                    <span
                        class="text-danger text-sm"
                        v-show="errors.has('Titulo')"
                        >{{ errors.first("Titulo") }}</span
                    >
                </div>
            </div>

            <div class="vx-row">
                <div class="vx-col w-full mb-2">
                    <vs-textarea
                        label="Instrucciones"
                        class="w-full sm:w-auto"
                        v-model="form.description"
                        name="Instrucciones"
                        v-validate="'required'"
                        :danger="errors.has('Instrucciones')"
                    />
                    <span
                        class="text-danger text-sm"
                        v-show="errors.has('Instrucciones')"
                        >{{ errors.first("Instrucciones") }}</span
                    >
                </div>
            </div>

            <div class="vx-row">
                <div class="vx-col w-full">
                    <vs-button
                        size="small"
                        color="primary"
                        type="border"
                        icon-pack="feather"
                        icon="icon-paperclip"
                        class="w-full sm:w-auto"
                        >Adjuntar</vs-button
                    >
                </div>
            </div>

            <br /><br /><br /><br />
            <div class="vx-row relative h-32">
                <div
                    class="vx-col w-full mb-2 flex flex-wrap justify-end sm:flex-row absolute bottom-0 right-0 left-15"
                >
                    <vs-button
                        color="primary"
                        type="flat"
                        @click="closeModal()"
                        class="w-full sm:w-auto mb-8 sm:mb-auto mt-3 sm:mt-auto cancel-btn"
                        >Cancelar</vs-button
                    >
                    <vs-button @click="save" class="w-full sm:w-auto"
                        >Crear</vs-button
                    >
                </div>
            </div>
        </div>

        <!-- RIGHT DATA FORM -->
        <div
            class="vx-col sm:w-full md:w-full lg:w-1/3 mb-auto mx-auto right-data-form mr-3"
        >
            <div class="vx-row">
                <div class="vx-col w-full mb-2">
                    <vs-select
                        v-model="form.courses"
                        label="Curso"
                        disabled
                        class="mt-5 w-full"
                        name="item-shift"
                        v-validate="'required'"
                        @change="selectedDefault = null"
                        :dir="$vs.rtl ? 'rtl' : 'ltr'"
                        :selected="this.classesData.id"
                    >
                        <vs-select-item
                            :value="this.classesData.id"
                            :text="this.classesData.name"
                        />
                    </vs-select>
                </div>
            </div>
            <div class="vx-row">
                <div class="vx-col w-full mb-2">
                    <vs-select
                        disabled
                        v-model="form.class_id"
                        label="Tema"
                        class="mt-5 w-full"
                        name="item-shift"
                        v-validate="'required'"
                    >
                        <vs-select-item
                            :value="this.classList.id"
                            :text="this.classList.title"
                        />
                    </vs-select>
                </div>
            </div>

            <div class="vx-row">
                <div class="vx-col w-full mb-2">
                    <br />
                    <label for="" class="vs-select--label"
                        >Fecha limite de entrega</label
                    >
                    <div>
                        <flat-pickr
                            class="w-full"
                            :config="configdateTimePicker"
                            v-model="form.limit_date"
                            placeholder="Fecha limite de entrega"
                            name="Fecha limite de entrega"
                            v-validate="'required'"
                            :danger="errors.has('Fecha limite de entrega')"
                        />
                    </div>
                    <span
                        class="text-danger text-sm"
                        v-show="errors.has('Fecha limite de entrega')"
                        >{{ errors.first("Fecha limite de entrega") }}</span
                    >
                </div>
            </div>
            <div class="">
                <vs-select
                    v-model="form.classroom_students"
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
                        :value="student.id"
                        :text="student.name"
                        v-for="(student, index) in this.studentsCourse"
                    />
                </vs-select>
                <span
                    class="text-danger text-sm"
                    v-show="errors.has('Asignar A')"
                    >{{ errors.first("Asignar A") }}</span
                >
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
  name: 'TaskForm',
  components: {
    AvatarList,
    'v-select': vSelect,
    flatPickr
  },
  props: {
    title: null,
    isCreate: Boolean
  },
  data () {
    return {
      description: 'Cursando',
      value1: '',
      datetime: null,
      selectedDefault: null,
      configdateTimePicker: {
        enableTime: true,
        dateFormat: 'd-m-Y H:i'
      },
      form: {
        id: null,

        titleTask: '',
        description: '',
        courses: [],
        class_id: null,
        limit_date: null,
        classroom_students: []
      },
      classesData: [],
      classList: [],
      studentsCourse: []
    }
  },

  methods: {
    getDataForm (data) {
      this.form.id = data.class_.assignmentTypeId
      this.classesData = data.course
      this.classroom_students = []
      this.classList = data.class_
      this.form.class_id = data.class_.id
      this.form.courses = data.course.id
      this.studentsCourse = []
      data.students.map((element) => {
        this.studentsCourse.push({
          id: element.id,
          name: element.student.name
        })
      })
    },

    save () {
      this.create()
    },
    closeModal () {
      this.$emit('close-modal')
    },
    create () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          const payload = this.form
          this.$store.dispatch(
            'assignment/createAssignment',
            payload
          )
          this.closeModal()
        }
      })
    },

    update () {}
  }
}
</script>

<style lang="css">
.right-data-form {
    background: #eef7fe;
}

[dir] .mb-auto {
    margin-bottom: 0 !important;
}

div .vs-popup--content {
    padding: 0 !important;
    margin: 0 !important;
    overflow-x: hidden !important;
}

.vs-popup--content {
    width: 100% !important;
    border-radius: 5px !important;
}

.text-title {
    color: #22215b;
}
</style>
