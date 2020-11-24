<template>
   <div class="vx-row">
      <!-- LEFT DATA FORM -->
      <div class="vx-col lg:block lg:w-1/2 mx-auto self-center">
        <div class="vx-card__title mb-8">
          <h4 class="mb-4">{{title}}</h4>
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
      </div>

      <!-- RIGHT DATA FORM ALUMNO -->
      <div class="vx-col sm:w-full md:w-full lg:w-1/3 mx-auto d-theme-dark-bg">
        <vx-card
          class="mt-base"
          v-for="(post, index) in userPosts"
          :key="index"
        >
          <p>Asignar alumnos</p>

          <div>
            <vs-select placeholder="Asignar alumnos"  multiple class="selectExample" v-model="form.student_id">
                <vs-select-item :key="index" :value="item.id" :text="item.name" v-for="(item,index) in studentsList" />
            </vs-select>
            <!-- <v-select
              label-placeholder="Asignar alumnos"
              multiple
              :closeOnSelect="false"
              v-model="form.student_id"
              :options="options"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
            /> -->

          </div>
          <br />

          <AvatarList
            :dataAvatarList="dataAvatar"
            :description="description"
          ></AvatarList>
        </vx-card>
      </div>

      <!-- TABLE DETAIL COURSE -->
      <div
          class="vx-col sm:w-full md:w-full lg:w-4/4 mx-auto d-theme-dark-bg"
        >
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

      <!-- Botones -->
      <div class="vx-col sm:w-full md:w-full lg:w-4/4">
        <br />
        <div class="flex flex-wrap justify-end flex-col-reverse sm:flex-row">
          <vs-button
            color="primary"
            type="flat"
            class="w-full sm:w-auto mb-8 sm:mb-auto mt-3 sm:mt-auto cancel-btn"
            >Cancelar</vs-button
          >
          <vs-button @click="create" class="w-full sm:w-auto">Crear</vs-button>
        </div>
      </div>
</div>
</template>

<script>

import AvatarList from '../components/AvatarList'
import vSelect from 'vue-select'

export default {
  name: 'ClassroomForm',
  components: {
    AvatarList,
    'v-select': vSelect
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
    removeCourse(indextr){
      //console.log(indextr);
      this.form.courses.splice(indextr, 1);
      //console.log(this.courses);
    },
    addCourse() {
      //.log('Agregando Curso');
      //console.log(this.courses);

      let subject_txt = "";
      this.subjectsList.map((element, index) => {
        if(element.id === this.form.subject_id){
            subject_txt = element.name
        }
      });

      let course_type_txt = "";
      this.courseTypesList.map((element, index) => {
        if(element.id === this.form.course_type_id){
            course_type_txt = element.name
        }
      });

      let teacher_txt = "";
      this.teachersList.map((element, index) => {
        if(element.id === this.form.teacher_id){
            teacher_txt = element.name
        }
      });

      this.form.courses.push(
        {
          subject_txt: subject_txt,
          course_type_txt: course_type_txt,
          teacher_txt: teacher_txt,
          subject_id: this.form.subject_id,
          course_type_id: this.form.course_type_id,
          teacher_id: this.form.teacher_id
        }
      );
      //console.log(this.courses);
     //console.log(this.form.student_id)
    },
    create () {
      //console.log("Creando...");
      const userAuth = localStorage.userAuth;
      const parseJson = JSON.parse(userAuth);
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
      //student_id: [],
      // options: [{
      //     id:1,
      //     name:'Nestor Infante'
      //   },
      //   {
      //     id:2,
      //     name:'Gregorio Lucena',
      //   },
      //   {
      //     id:3,
      //     name:'Roberto'
      //   }],
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
