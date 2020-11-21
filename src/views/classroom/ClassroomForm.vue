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
              <vs-select-item
                :key="item.id"
                :value="item.id"
                :text="item.name"
                v-for="item in this.form.shiftsList"
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
              <vs-select-item
                :key="item.id"
                :value="item.id"
                :text="item.name"
                v-for="item in this.form.institutionsList"
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
              <vs-select-item
                :key="item.id"
                :value="item.id"
                :text="item.name"
                v-for="item in this.form.shiftsList"
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
              <vs-select-item
                :key="item.id"
                :value="item.id"
                :text="item.name"
                v-for="item in this.form.institutionsList"
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
              <vs-select-item
                :key="item.id"
                :value="item.id"
                :text="item.name"
                v-for="item in this.form.institutionsList"
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

      <!-- RIGHT DATA FORM ALUMNO -->
      <div class="vx-col sm:w-full md:w-full lg:w-1/3 mx-auto d-theme-dark-bg">
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

          <AvatarList
            :post="post"
            description="alumnos asignados"
          ></AvatarList>
        </vx-card>
      </div>

      <!-- TABLE DETAIL COURSE -->
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
          <vs-button class="w-full sm:w-auto">Crear</vs-button>
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
    title: null
  },
  data () {
    return {
      description: 'Cursando',
      value1: '',
      selected: [],
      options: ['Daniel', 'Nestor', 'Oscar', 'Gregorio', 'Pablo'],
      form: {
        id: null,
        dataShifts: '',
        dataInstitutions: ''
      },
      users: [
        {
          id: 1,
          name: 'Curso',
          username: 'Bret',
          email: 'Matemática',
          website: 'Laura Perez'
        },
        {
          id: 2,
          name: 'Examén',
          username: 'Antonette',
          email: 'Ingles',
          website: 'Claudia Colmenarez'
        },
        {
          id: 3,
          name: 'Taller',
          username: 'Samantha',
          email: 'Ciencias',
          website: 'Berta Gomez'
        }
      ],
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
