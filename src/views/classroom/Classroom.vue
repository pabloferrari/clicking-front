<template>
  <div id="classroom">
    <div class="vx-row">
      <div class="vx-col w-full">
        <p class="primary">Salones</p>
      </div>
    </div>

    <CardWelcome :cardsWelcome="this.cardsWelcome" >
    </CardWelcome>

    <!-- Modal Create -->
    <div
      class="flex flex-wrap justify-end mt-1 data-list-btn-container"
      @click="popupActive = true"
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

    <!-- <ModalSection ModalTitle="" :action="popupActive" :children="this.children" v-bind="propsChildren"></ModalSection> -->


    <vs-popup title="" :active.sync="popupActive">

      <ClassroomForm></ClassroomForm>

    </vs-popup>

    <div class="mt-0">
      <vs-tabs>
        <vs-tab label="Salones">
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

  </div>
</template>

<script>
import CardWelcome from '../components/CardWelcome'
import CardList from '../components/CardList'
import CourseLogo from '../components/icons/CourseLogo'
import PencilLogo from '../components/icons/PencilLogo'
import CheckLogo from '../components/icons/CheckLogo'
import DocumentLogo from '../components/icons/DocumentLogo'
import SchoolIcon from '../components/icons/SchoolIcon'
import AppleIcon from '../components/icons/AppleIcon'

import Tabs from '../components/Tabs'
import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'

//import ModalSection from '../components/ModalSection'
//import ClassroomModal from './ClassroomModal'
import ClassroomForm from './ClassroomForm'

export default {
  name: 'classroom',
  components: {
    StatisticsCardLine,
    CardWelcome,
    CourseLogo,
    CardList,
    Tabs,
    SchoolIcon,
    AppleIcon,
    //ClassroomModal,
    ClassroomForm,
  },
  props: {
    shiftsList: null,
    institutionsList: null
  },
  // computed: {
  //   propsChildren() {
  //     return {
  //       title: 'Hola Form'
  //     }
  //   }
  // },
  data () {
    return {
      description: 'Cursando',
      popupActive: false,
      //children: ClassroomForm,
      selected: [],
      options: ['Daniel', 'Nestor', 'Oscar', 'Gregorio', 'Pablo'],
      form: {
        id: null,
        dataShifts: '',
        dataInstitutions: ''
      },
      cardsWelcome: [
        {
          icon: CourseLogo,
          title: 'Salones',
          count: 10,

        },
        {
          icon: SchoolIcon,
          title: 'Alumnos',
          count: 106
        },
        {
          icon: AppleIcon,
          title: 'Docentes',
          count: 11
        }
      ],
      course: [
        {
          title: '4A-Comisión A',
          subtitle: '2 Cursos - Turno Mañana',
          buttonTitle: 'Ir al salón',
          path: '/classroom/4A-Comisión-A'
        },
        {
          title: '4B-Comisión B',
          subtitle: '5 Cursos - Turno Tarde',
          buttonTitle: 'Ir al salón',
          path: '/classroom/4B-Comisión-B'
        },
        {
          title: '4C-Comisión C',
          subtitle: '1 Cursos - Turno Mañana',
          buttonTitle: 'Ir al salón',
          path: '/classroom/4C-Comisión-C'
        }
      ],
      workshop: [
        {
          title: '4A-Comisión A',
          subtitle: '2 Talleres - Turno Mañana',
          buttonTitle: 'Ir a taller'
        },
        {
          title: '4B-Comisión B',
          subtitle: '4 Talleres - Turno Tarde',
          buttonTitle: 'Ir a taller'
        }
      ],
      tabs: [
        {
          title: 'Salones'
        },
        {
          title: 'Talleres'
        }
      ]
    }
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

<style lang="css">
  .con-vs-popup .vs-popup {
    width: 800px !important;
  }
  .btn-right {
    position: absolute;
    right: 1rem;
    z-index: 999;
  }
</style>
