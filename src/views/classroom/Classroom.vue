<template>
  <div id="classroom">
    <div class="vx-row">
      <div class="vx-col w-full">
        <p class="primary">Salones</p>
      </div>
    </div>
    <CardWelcome :cardsWelcome="this.cardsWelcome"></CardWelcome>
    <!-- ADD NEW -->
    <div
      class="flex flex-wrap justify-end mt-1 data-list-btn-container"
      @click="popupActive2 = true"
    >
      <vs-button
        color="primary"
        size="small"
        class="font-semibold btn-right"
        icon="icon-plus"
        icon-pack="feather"
        type="border"
        >Crear Salón</vs-button
      >
    </div>

    <vs-popup title="" :active.sync="popupActive2">
      <div class="vx-row">
        <div class="vx-col lg:block lg:w-1/2 mx-auto self-center">
          <div class="vx-card__title mb-8">
            <h4 class="mb-4">Crear Salón</h4>
          </div>

          <div class="vx-row">
            <div class="vx-col w-full mb-2">
              <vs-input
                type="text"
                label-placeholder="Nombre salón"
                v-model="value1"
                class="w-full sm:w-auto"
              />
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
        <div
          class="vx-col sm:w-full md:w-full lg:w-1/3 mx-auto d-theme-dark-bg"
        >
          <!-- POST ACTION DATA -->
          <vx-card
            class="mt-base"
            v-for="(post, index) in userPosts"
            :key="index"
          >
            <p>Asignar alumnos</p>

            <div>
              <v-select
                label-placeholder="Asignar alumnos"
                multiple
                :closeOnSelect="false"
                v-model="selected"
                :options="options"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
              />
            </div>
            <br />

            <!-- Avatar More User -->
            <AvatarList
              :post="post"
              description="alumnos asignados"
            ></AvatarList>
          </vx-card>
        </div>

        <div
          class="vx-col sm:w-full md:w-full lg:w-4/4 mx-auto d-theme-dark-bg"
        >
          <vs-table stripe :data="users">
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
                  ></vs-button>
                </vs-td>
                <vs-td :data="data[indextr].email">
                  {{ data[indextr].email }}
                </vs-td>
                <vs-td :data="data[indextr].username">
                  {{ data[indextr].name }}
                </vs-td>
                <vs-td :data="data[indextr].id">
                  {{ data[indextr].website }}
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </div>

        <div class="vx-col sm:w-full md:w-full lg:w-4/4">
          <br />
          <div class="flex flex-wrap justify-end flex-col-reverse sm:flex-row">
            <vs-button
              color="primary"
              type="flat"
              class="w-full sm:w-auto mb-8 sm:mb-auto mt-3 sm:mt-auto cancel-btn"
              >Cancelar</vs-button
            >
            <vs-button class="w-full sm:w-auto">Crear</vs-button>
          </div>
        </div>
      </div>
    </vs-popup>

    <div class="mt-0">
      <vs-tabs>
        <vs-tab label="Salones">
          <div class="tab-content-courses">
            <div>
              <Card :cards="this.course" description=" Alumnos cursando">
              </Card>
            </div>
          </div>
        </vs-tab>
        <vs-tab label="Talleres">
          <div class="tab-content-workshop">
            <div>
              <Card :cards="this.workshop" description=" Alumnos cursando">
              </Card>
            </div>
          </div>
        </vs-tab>
      </vs-tabs>
    </div>
  </div>
</template>
<script>
import CardWelcome from "../components/CardWelcome";
import CourseLogo from "../components/icons/CourseLogo";
import PencilLogo from "../components/icons/PencilLogo";
import CheckLogo from "../components/icons/CheckLogo";
import DocumentLogo from "../components/icons/DocumentLogo";
import SchoolIcon from "../components/icons/SchoolIcon";
import AppleIcon from "../components/icons/AppleIcon";
import Card from "../components/Card";
import Tabs from "../components/Tabs";
import StatisticsCardLine from "@/components/statistics-cards/StatisticsCardLine.vue";
import AvatarList from "../components/AvatarList";
import vSelect from "vue-select";
export default {
  name: "classroom",
  components: {
    StatisticsCardLine,
    CardWelcome,
    CourseLogo,
    Card,
    Tabs,
    SchoolIcon,
    AppleIcon,
    AvatarList,
    "v-select": vSelect,
  },
  props: {
    shiftsList: null,
    institutionsList: null,
  },
  data() {
    return {
      description: "Cursando",
      users: [
        {
          id: 1,
          name: "Curso",
          username: "Bret",
          email: "Matemática",
          website: "Laura Perez",
        },
        {
          id: 2,
          name: "Examén",
          username: "Antonette",
          email: "Ingles",
          website: "Claudia Colmenarez",
        },
        {
          id: 3,
          name: "Taller",
          username: "Samantha",
          email: "Ciencias",
          website: "Berta Gomez",
        },
      ],
      selected: [],
      options: ["Daniel", "Nestor", "Oscar", "Gregorio", "Pablo"],
      form: {
        id: null,
        dataShifts: "",
        dataInstitutions: "",
      },
      value1: "",
      value2: "",
      value3: "",
      popupActive2: false,
      popupActive3: false,
      userPosts: [
        {
          likes: 100,
          usersLiked: [
            {
              name: "Trina Lynes",
              img: require("@/assets/images/portrait/small/avatar-s-1.jpg"),
            },
            {
              name: "Lilian Nenez",
              img: require("@/assets/images/portrait/small/avatar-s-2.jpg"),
            },
            {
              name: "Alberto Glotzbach",
              img: require("@/assets/images/portrait/small/avatar-s-3.jpg"),
            },
          ],
        },
      ],
      cardsWelcome: [
        {
          icon: CourseLogo,
          title: "Salones",
          count: 10,
          component: Card,
        },
        {
          icon: SchoolIcon,
          title: "Alumnos",
          count: 106,
        },
        {
          icon: AppleIcon,
          title: "Docentes",
          count: 11,
        },
      ],
      course: [
        {
          title: "4A-Comisión A",
          subtitle: "2 Cursos - Turno Mañana",
          buttonTitle: "Ir al salón",
          href: "/classroom/4A-Comisión-A",
        },
        {
          title: "4B-Comisión B",
          subtitle: "5 Cursos - Turno Tarde",
          buttonTitle: "Ir al salón",
          href: "/classroom/4B-Comisión-B",
        },
        {
          title: "4C-Comisión C",
          subtitle: "1 Cursos - Turno Mañana",
          buttonTitle: "Ir al salón",
          href: "/classroom/4C-Comisión-C",
        },
        /*{
          title: "4B-Comisión B",
          subtitle: "5 Cursos - Turno Tarde",
          buttonTitle: "Ir al salón",
          href: "/courses/Lenguaje",
        },
        {
          title: "4A-Comisión A",
          subtitle: "2 Cursos - Turno Mañana",
          buttonTitle: "Ir al salón",
          href: "/courses/Matematica",
        },
        {
          title: "4B-Comisión B",
          subtitle: "5 Cursos - Turno Tarde",
          buttonTitle: "Ir al salón",
          href: "/courses/Lenguaje",
        },
        {
          title: "4A-Comisión A",
          subtitle: "2 Cursos - Turno Mañana",
          buttonTitle: "Ir al salón",
          href: "/courses/Matematica",
        },
        {
          title: "4B-Comisión B",
          subtitle: "5 Cursos - Turno Tarde",
          buttonTitle: "Ir al salón",
          href: "/courses/Lenguaje",
        },*/
      ],
      workshop: [
        {
          title: "4A-Comisión A",
          subtitle: "2 Talleres - Turno Mañana",
          buttonTitle: "Ir a taller",
        },
        {
          title: "4B-Comisión B",
          subtitle: "4 Talleres - Turno Tarde",
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
.btn-right {
  position: absolute;
  right: 1rem;
  z-index: 999;
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
