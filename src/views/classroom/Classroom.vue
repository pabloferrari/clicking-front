<template>
  <div id="classroom">
    <div class="vx-row">
      <div class="vx-col w-full">
        <p class="primary">Salones</p>
      </div>
    </div>
    <CardWelcome :cardsWelcome="this.cardsWelcome"></CardWelcome>
    <!-- ADD NEW -->
    <div class="flex flex-wrap-reverse items-center data-list-btn-container">
      <div class="btn-add-new p-2 mb-1 mr-1 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-base text-primary border border-solid border-primary" @click="popupActive2=true">
          <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
          <span class="ml-2 text-base text-primary">Crear Salón</span>
      </div>
    </div>

    <vs-popup  title="" :active.sync="popupActive2" >
            <div class="vx-row">
                <div class="vx-col lg:block lg:w-1/2 mx-auto self-center">

                    <div class="vx-card__title mb-8">
                        <h4 class="mb-4">Crear Salón</h4>
                    </div>

                    <div class="vx-row">
                      <div class="vx-col w-full mb-2">
                        <vs-input type="text" label-placeholder="Nombre salón" v-model="value1" class="w-full sm:w-auto" />
                      </div>
                    </div>

                    <div class="vx-row">
                      <div class="vx-col sm:w-1/2 w-full mb-2">
                        <vs-select
                            v-model="form.dataShifts"
                            label="Turno"
                            class="mt-5 w-full"
                            name="item-shift"
                            v-validate="'required'"
                          >
                          <!-- <vs-select-item key="" value="" text="seleccione plan" /> -->
                          <vs-select-item
                            :key="item.id"
                            :value="item.id"
                            :text="item.name"
                            v-for="item in this.shiftsList"
                          />
                        </vs-select>
                      </div>

                      <div class="vx-col sm:w-1/2 w-full mb-2">
                          <vs-select
                              v-model="form.dataInstitutions"
                              label="Institución"
                              class="mt-5 w-full"
                              name="item-shift"
                              v-validate="'required'"
                            >
                            <!-- <vs-select-item key="" value="" text="seleccione plan" /> -->
                            <vs-select-item
                              :key="item.id"
                              :value="item.id"
                              :text="item.name"
                              v-for="item in this.institutionsList"
                            />
                          </vs-select>
                      </div>
                    </div>

                    <div class="vx-row">
                      <div class="vx-col sm:w-1/3 w-full mb-2">
                        <vs-select
                            v-model="form.dataShifts"
                            label="Curso"
                            class="mt-5 w-full"
                            name="item-shift"
                            v-validate="'required'"
                          >
                          <!-- <vs-select-item key="" value="" text="seleccione plan" /> -->
                          <vs-select-item
                            :key="item.id"
                            :value="item.id"
                            :text="item.name"
                            v-for="item in this.shiftsList"
                          />
                        </vs-select>
                      </div>

                      <div class="vx-col sm:w-1/3 w-full mb-2">
                          <vs-select
                              v-model="form.dataInstitutions"
                              label="Tipo Curso"
                              class="mt-5 w-full"
                              name="item-shift"
                              v-validate="'required'"
                            >
                            <!-- <vs-select-item key="" value="" text="seleccione plan" /> -->
                            <vs-select-item
                              :key="item.id"
                              :value="item.id"
                              :text="item.name"
                              v-for="item in this.institutionsList"
                            />
                          </vs-select>
                      </div>

                      <div class="vx-col sm:w-1/3 w-full mb-2">
                          <vs-select
                              v-model="form.dataInstitutions"
                              label="Docente"
                              class="mt-5 w-full"
                              name="item-shift"
                              v-validate="'required'"
                            >
                            <!-- <vs-select-item key="" value="" text="seleccione plan" /> -->
                            <vs-select-item
                              :key="item.id"
                              :value="item.id"
                              :text="item.name"
                              v-for="item in this.institutionsList"
                            />
                          </vs-select>
                      </div>
                    </div>

                    <div class="vx-row">
                      <div class="vx-col sm:w-1/2 w-full mb-2">
                        <vs-button color="primary" type="flat">+ Añadir Curso</vs-button>
                      </div>
                    </div>

                </div>
                <div class="vx-col sm:w-full md:w-full lg:w-1/3 mx-auto  d-theme-dark-bg">



                        <!-- POST ACTION DATA -->
                        <vx-card class="mt-base" v-for="(post, index) in userPosts" :key="index">

                          <p>Asignar alumnos</p>

                        <div>
                            <v-select label-placeholder="Asignar alumnos" multiple :closeOnSelect="false" v-model="selected" :options="options" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
                        </div> <br>


                          <div class="flex justify-between">
                              <div class="flex items-center">

                                  <ul class="users-liked user-list ml-3 sm:ml-6">
                                      <li v-for="(user, userIndex) in post.usersLiked" :key="userIndex">
                                          <vx-tooltip :text="user.name" position="bottom">
                                              <vs-avatar :src="user.img" size="30px" class="border-2 border-white border-solid -m-1"></vs-avatar>
                                          </vx-tooltip>
                                      </li>
                                  </ul>
                                  <small class="ml-2">+{{ post.likes - 5 }} alumnos asignados</small>
                              </div>

                          </div>
                        </vx-card>
                </div>

                <div class="vx-col sm:w-full md:w-full lg:w-4/4 mx-auto  d-theme-dark-bg">

                   <vs-table stripe :data="users">

                        <template slot="thead">
                            <vs-th></vs-th>
                            <vs-th>Curso</vs-th>
                            <vs-th>Tipo Curso</vs-th>
                            <vs-th>Docente</vs-th>
                        </template>

                        <template slot-scope="{data}">
                            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                                <vs-td :data="data[indextr].id">
                                    <vs-button type="border" size="small" icon-pack="feather" icon="icon-trash" color="danger"></vs-button>
                                </vs-td>
                                <vs-td :data="data[indextr].email">
                                    {{data[indextr].email}}
                                </vs-td>
                                <vs-td :data="data[indextr].username">
                                    {{data[indextr].name}}
                                </vs-td>
                                <vs-td :data="data[indextr].id">
                                    {{data[indextr].website}}
                                </vs-td>
                            </vs-tr>
                        </template>
                    </vs-table>
                  </div>

                <div class="vx-col sm:w-full md:w-full lg:w-4/4"><br>
                  <div class="flex flex-wrap justify-end flex-col-reverse sm:flex-row">
                    <vs-button color="primary" type="flat" class="w-full sm:w-auto mb-8 sm:mb-auto mt-3 sm:mt-auto cancel-btn">Cancelar</vs-button>
                    <vs-button class="w-full sm:w-auto">Crear</vs-button>
                  </div>
                </div>

            </div>
    </vs-popup>

    <div class="mt-0">
      <vs-tabs>
        <vs-tab label="Cursos">
          <div class="tab-content-courses">
            <div>

              <Card :cards="this.course"> </Card>

            </div>

          </div>
        </vs-tab>
        <vs-tab label="Talleres">
          <div class="tab-content-workshop">
            <div>
              <Card :cards="this.workshop"> </Card>
            </div>
          </div>
        </vs-tab>
      </vs-tabs>
    </div>
  </div>
</template>
<script>
import CardWelcome from "../components/CardWelcome";
import CourseLogo from "../../assets/icons/CourseLogo";
import PencilLogo from "../../assets/icons/PencilLogo";
import CheckLogo from "../../assets/icons/CheckLogo";
import DocumentLogo from "../../assets/icons/DocumentLogo";
import Card from "../components/Card";
import Tabs from "../components/Tabs";
import StatisticsCardLine from "@/components/statistics-cards/StatisticsCardLine.vue";
import vSelect from 'vue-select'
export default {
  name: "classroom",
  components: {
    StatisticsCardLine,
    CardWelcome,
    CourseLogo,
    Card,
    Tabs,
    'v-select': vSelect,
  },
  props: {
    shiftsList: null,
    institutionsList: null,
  },
  data() {
    return {
      users: [
        {
          'id': 1,
          'name': 'Curso',
          'username': 'Bret',
          'email': 'Matemática',
          'website': 'Laura Perez'
        },
        {
          'id': 2,
          'name': 'Examén',
          'username': 'Antonette',
          'email': 'Ingles',
          'website': 'Claudia Colmenarez'
        },
        {
          'id': 3,
          'name': 'Taller',
          'username': 'Samantha',
          'email': 'Ciencias',
          'website': 'Berta Gomez'
        }
      ],
      selected: [],
      options: ['Daniel', 'Nestor', 'Oscar', 'Gregorio', 'Pablo'],
      form: {
        id: null,
        dataShifts: "",
        dataInstitutions: ""
      },
      value1: '',
      value2: '',
      value3: '',
      popupActive2: false,
      popupActive3: false,
      userPosts: [
        {
          likes: 100,
          usersLiked : [
            { name: 'Trina Lynes',       img: require('@/assets/images/portrait/small/avatar-s-1.jpg') },
            { name: 'Lilian Nenez',      img: require('@/assets/images/portrait/small/avatar-s-2.jpg') },
            { name: 'Alberto Glotzbach', img: require('@/assets/images/portrait/small/avatar-s-3.jpg') }
          ]
        }
      ],
      cardsWelcome: [
        {
          icon: CourseLogo,
          title: "Cursos",
          count: 3,
          component: Card,
        },
        {
          icon: DocumentLogo,
          title: "Estudiantes",
          count: 12,
        },
        {
          icon: PencilLogo,
          title: "Tareas",
          count: 1,
        },
        {
          icon: CheckLogo,
          title: "Examenes",
          count: 1,
        },
      ],
      course: [
        {
          title: "Matematica",
          subtitle: "Comision A - Turno Mañana",
          buttonTitle: "Ir a curso",
          href: "/courses/Matematica",
        },
        {
          title: "Lenguaje",
          subtitle: "Comision A - Turno Tarde",
          buttonTitle: "Ir a curso",
          href: "/courses/Lenguaje",
        },
      ],
      workshop: [
        {
          title: "Programacion",
          subtitle: "Comision A - Turno Mañana",
          buttonTitle: "Ir a taller",
        },
        {
          title: "Lenguaje",
          subtitle: "Comision A - Turno Tarde",
          buttonTitle: "Ir a taller",
        },
      ],
      tabs: [
        {
          title: "Salones",
        },
        {
          title: "Talleres",
        },
      ],
    };
  },
};
</script>

<style lang="css">
  .con-vs-popup .vs-popup {
    width: 900px !important;
  }
</style>

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
