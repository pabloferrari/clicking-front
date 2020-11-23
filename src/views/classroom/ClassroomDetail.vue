<template>
  <div class="classroom-detail">
    <div class="vx-row">
      <div class="vx-col w-full">
        <p class="primary">{{ commission }}</p>
      </div>
    </div>
    <CardWelcome :cardsWelcome="this.cardsWelcome"></CardWelcome>
    <div
      class="flex flex-wrap justify-end mt-1 data-list-btn-container"
      @click="activePrompt = true"
    >
      <vs-button
        color="primary"
        size="small"
        class="font-semibold btn-right"
        icon="icon-plus"
        icon-pack="feather"
        type="border"
        >Crear Curso</vs-button
      >
    </div>

    <div class="mt-0">
      <vs-tabs>
        <vs-tab label="Cursos">
          <div class="tab-content-courses">
            <div>
              <CardList :cardData="this.course" description=" Alumnos cursando">
              </CardList>
            </div>
          </div>
        </vs-tab>
        <vs-tab label="Talleres">
          <div class="tab-content-workshop">
            <div>
              <CardList
                :cardData="this.workshop"
                description=" Alumnos cursando"
              >
              </CardList>
            </div>
          </div>
        </vs-tab>
      </vs-tabs>
    </div>
    <!-- Popup Course -->
    <vs-prompt
      @accept="accept"
      title="Crear Curso"
      accept-text="Guardar"
      cancel-text="Cancelar"
      :active.sync="activePrompt"
    >
      <div class="con-exemple-prompt">
        <div class="w-full p-2">
          <vs-input
            type="text"
            label-placeholder="escribe el titulo del curso"
            v-model="coursesName"
            class="w-full sm:w-auto"
          />
        </div>
        <div class="w-full p-2">
          <div class="">
            <vs-select
              v-model="teachers"
              label="Docente"
              class="mt-5 w-full"
              name="item-shift"
              v-validate="'required'"
            >
              <!-- <vs-select-item key="" value="" text="seleccione plan" /> -->
              <vs-select-item
            /></vs-select>
          </div>
        </div>
      </div>
    </vs-prompt>
    <!-- Modal -->
  </div>
</template>

<script>
import CardList from '../components/CardList'
import CardWelcome from '../components/CardWelcome'
import CourseLogo from '../components/icons/CourseLogo'
import PencilLogo from '../components/icons/PencilLogo'
import CheckLogo from '../components/icons/CheckLogo'
import DocumentLogo from '../components/icons/DocumentLogo'
import SchoolIcon from '../components/icons/SchoolIcon'
import AppleIcon from '../components/icons/AppleIcon'
// import vSelect from 'vue-select'
export default {
  name: 'ClassroomDetail',
  props: {
    commission: String
  },
  components: {
    CardWelcome,
    CourseLogo,
    PencilLogo,
    CheckLogo,
    DocumentLogo,
    SchoolIcon,
    CardList
  },
  methods: {
    accept () {
      this.activePrompt = true
    }
  },
  data () {
    return {
      coursesName: '',
      teachers: '',
      activePrompt: false,
      cardsWelcome: [
        {
          icon: CourseLogo,
          title: 'Cursos',
          count: 2
        },
        {
          icon: SchoolIcon,
          title: 'Alumnos',
          count: 40
        },
        {
          icon: AppleIcon,
          title: 'Docentes',
          count: 2
        }
      ],

      course: [
        {
          title: 'Matematica',
          subtitle: '4A-Comisión A - Turno Mañana',
          buttonTitle: 'Ir al curso',
          path: '/courses/Matematica'
        },
        {
          title: 'Programacion',
          subtitle: '4A-Comisión A - Turno Tarde',
          buttonTitle: 'Ir al curso',
          path: '/courses/Programacion'
        }
      ],
      workshop: [
        {
          title: 'Matematica',
          subtitle: '2 Talleres - Turno Mañana',
          buttonTitle: 'Ir a taller'
        },
        {
          title: 'Programacion II',
          subtitle: '4 Talleres - Turno Tarde',
          buttonTitle: 'Ir a taller'
        }
      ]
    }
  }
}
</script>

<style lang="css">
.btn-right {
  position: absolute;
  right: 1rem;
  z-index: 999;
}

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
