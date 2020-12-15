<template>
  <div class="">
    <div class="vx-row">
      <div class="vx-col w-full">
        <p class="primary">{{ titleAssignment }}</p>
      </div>
    </div>

    <div class="flex justify-between my-8">
      <div class="vx-col w-2/3 mx-4">
        <vx-card class="body-card">
          <div class="flex mb-1 w-full">
            <!-- <div class="justify-between"> -->
            <!-- <div class=""> -->
            <vs-avatar
              src="https://avatars2.githubusercontent.com/u/31676496?s=460&v=4"
              size=""
              class="border-2 border-white border-solid -m-1"
            ></vs-avatar>
            <p class="mx-2 font-bold justify-items-start">Ana</p>
            <!-- </div> -->
            <!-- </div> -->
          <div class="grid justify-items-end" v-permission="['teacher']">
            <feather-icon
              icon="Edit3Icon"
              svgClasses="h-5 w-5 cursor-pointer"
            />
          </div>
          </div>

          <div class="p-4">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus
              eligendi iusto voluptate ut! Tenetur sed rerum voluptate
              consequatur est aliquam cupiditate vitae quam eius minus. Vero
              veritatis numquam voluptas molestiae?Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Aut nostrum suscipit fugiat odio
              cumque eveniet, unde, magnam quisquam molestiae quidem,
              dignissimos ipsum necessitatibus aliquam inventore? Dolor corrupti
              minima repudiandae cumque. Lorem ipsum, dolor sit amet consectetur
              adipisicing elit. Autem soluta eaque omnis molestiae est fugiat
              asperiores blanditiis molestias, facilis nulla quisquam quasi
              accusantium ipsa corporis sequi perspiciatis tenetur voluptatem
              squam molestiae quidem, dignissimos ipsum necessitatibus aliquam
              inventore? Dolor corrupti minima repudiandae cumque. Lorem ipsum,
              dolor sit amet consectetur adipisicing elit. Autem soluta eaque
              omnis molestiae est fugiat asperiores blanditiis molestias,
              facilis nulla quisquam quasi accusantium ipsa corporis sequi
              perspiciatis tenetur voluptatem squam molestiae quidem,
              dignissimos ipsum necessitatibus aliquam inventore? Dolor corrupti
              minima repudiandae cumque. Lorem ipsum, dolor sit amet consectetur
              adipisicing elit. Autem soluta eaque omnis molestiae est fugiat
              asperiores blanditiis molestias, facilis nulla quisquam quasi
              accusantium ipsa corporis sequi perspiciatis tenetur voluptatem
              placeat.
            </p>
          </div>
          <div>
            <div class="flex">
              <div
                class="flex bg-white p-2 rounded-2xl md:w-1/5 sm:w-1/5 lg:w-1/5 mx-2"
              >
                <div class="text-right">
                  <strong>PDF</strong>
                </div>
                <div class="text-left">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                </div>
              </div>
              <div
                class="flex bg-white p-2 rounded-2xl md:w-1/5 sm:w-1/5 lg:w-1/5"
              >
                <div class="text-right">
                  <strong>PDF</strong>
                </div>
                <div class="text-left">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                </div>
              </div>
            </div>
          </div>
        </vx-card>
      </div>
      <div class=" flex flex-col  w-1/3">
        <div class="vx-col w-full">
          <vx-card>
            <h2 class="font-bold text-title pb-4">Trabajo</h2>

            <div class="flex p-2 body-card  rounded space-y-6">
              <h6 class="text-title ">Asignacion</h6>

              <p class="items-start">Valor Absoluto</p>
            </div>

            <div class="vx-col w-full my-2" v-permission="['student']">
              <vs-button class="w-full" icon-pack="feather"  icon="icon-paperclip" type="border">Adjuntar</vs-button>
            </div>
            <div class="vx-col w-full my-2" v-permission="['teacher']">
              <vs-button class="w-full" type="border">Devolver</vs-button>
            </div>

            <div class="vx-col w-full" v-permission="['student']">
              <vs-button class="w-full">Entregar</vs-button>
            </div>
            <div class="vx-col w-full" v-permission="['teacher']">
              <vs-button class="w-full">Corregir</vs-button>
            </div>
          </vx-card>
        </div>
        <div class="flex w-full my-2">
          <vx-card>
            <div class="body-card p-2">
            <h2 class="text-title">Comentarios</h2>
           <div class="flex p-3 ml-2">
          <ul class="user-comments-list">
            <li class="commented-user flex items-center mb-4">
              <div class="mr-3"><vs-avatar class="m-0" size="30px" /></div>
              <div class="leading-tight">
                <p class="font-bold text-title">Auther Red</p>
                <span class="text-xs"
                  >Lorem ipsum dolor sit, amet consectetur adipisicing
                  eli.</span
                >
              </div>
            </li>
          </ul>
        </div>
        <div class="flex mb-3">
          <div class="w-full ml-2">
            <div class="chat__input flex p-4">
              <div class="">
                <div class="mr-3 ml-2">
                  <vs-avatar class="m-0" size="30px" />
                </div>
              </div>
              <vs-input
                class="flex-1"
                icon-pack="feather"
                icon="icon-send"
                icon-no-border
                icon-after
                placeholder="Type Your Message"
                v-model="commentResponse"
              />
            </div>

          </div>
        </div>
            </div>
          </vx-card>
        </div>
      </div>
    </div>

    <div class="vx-col" v-permission="['teacher']">
      <h2 class="font-bold text-title">Entregado</h2>
    </div>
    <div class="vx-row" v-permission="['teacher']">
      <div class="vx-col w-1/2">
        <!-- <h6>Entregado</h6> -->
        <div class="flex student-list-card bg-white my-2 rounded-full py-3 px-6 active-card-assig">
          <vs-avatar
            class="student-list-avatar"
            size="large"
            src="https://avatars2.githubusercontent.com/u/31676496?s=460&v=4"
          />
           <p class="mx-2 mt-4 text-title font-bold">Alumno</p>
        </div>
        <div class="flex student-list-card bg-white my-2 rounded-full py-3 px-6 active-card-assig">
          <vs-avatar
            class="student-list-avatar"
            size="large"
            src="https://avatars2.githubusercontent.com/u/31676496?s=460&v=4"
          />
            <p class="mx-2 mt-4 font-bold">Alumno</p>
        </div>
      </div>
    </div>
    <div class="vx-col" v-permission="['teacher']">
      <h2 class="font-bold text-title">Pendiente por Entregar</h2>
    </div>
    <div class="vx-row" v-permission="['teacher']">
      <div class="vx-col w-1/2 ">
        <!-- <h6>Entregado</h6> -->
        <div class="flex student-list-card bg-white my-2 rounded-full py-3 px-6 active-card-assig">
          <vs-avatar
            class="student-list-avatar"
            size="large"
            src="https://avatars2.githubusercontent.com/u/31676496?s=460&v=4"
          />
           <p class="mx-2 mt-4 text-title  font-bold">Alumno</p>
        </div>
        <div class="flex student-list-card bg-white my-2 rounded-full py-3 px-6 active-card-assig">
          <vs-avatar
            class="student-list-avatar"
            size="large"
            src="https://avatars2.githubusercontent.com/u/31676496?s=460&v=4"
          />
            <p class="mx-2 mt-4 text-title font-bold">Alumno</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Assignment',

  data () {
    return {
      commentResponse:'',
      titleAssignment: 'Titulo Asignacion'
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
.body-card {
  background: #eef7fe;
}

.active-card-assig{
  border: solid 2px #fff;
  border-radius: 30px !important;
  box-sizing: border-box;
}
.active-card-assig:hover {
  border: solid 2px #567df4;
  outline: none;
  cursor: pointer;
}
.text-title {
  color: #22215b;
}
</style>

