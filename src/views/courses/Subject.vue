<template>
    <div class="subjects">
        <div class="vx-row">
            <div class="vx-col w-full">
                <p class="primary">{{ subject }}</p>
            </div>
        </div>
        <CardCount :cardCount="this.cardCountCourseClass()"></CardCount>

        <div
            class="flex flex-wrap justify-end mt-1"
            @click="activePromptClasses = true"
        >
            <ButtonRight
                class="btn-right"
                v-permission="['teacher']"
                buttonTitle="Crear Clase"
            ></ButtonRight>
        </div>

        <!-- Popup Course -->
        <vs-prompt
            @accept="saveclass"
            title="Crear Clase"
            accept-text="Guardar"
            cancel-text="Cancelar"
            :active.sync="activePromptClasses"
        >
            <Classes
                @close-modal-class="closeModalClass(false)"
                :courseId="this.subjectId"
                ref="Classes"
            ></Classes>
        </vs-prompt>

        <!-- START MODAL -->
        <vs-popup title="" :active.sync="itemOne" class="rounded-lg">
            <TaskForm
                @close-modal="closeModal(false)"
                ref="TaskForm"
                title="Crear Tarea"
            ></TaskForm>
        </vs-popup>

        <vs-popup title="" :active.sync="itemTwo">
            <ExamForm title="Crear Exámen"></ExamForm>
        </vs-popup>

        <vs-popup title="" :active.sync="itemThree">
            <PracticalWorkForm
                title="Crear Trabajo Práctica"
            ></PracticalWorkForm>
        </vs-popup>

        <!-- END MODAL -->

        <div class="mt-0">
            <vs-tabs v-model="tab.value">
                <vs-tab label="Muro" v-on="clickTag(tab.value)">
                    <div class="tab-content-wall">
                        <Wall></Wall>
                        <WallComment></WallComment>
                    </div>
                </vs-tab>
                <vs-tab label="Clases">
                    <div class="tab-content-classes">
                        <div>
                            <Collapse
                                v-if="this.classesList.length > 0"
                                :DropDownList="this.DropDownList"
                                :classesList="this.classesList"
                            ></Collapse>
                            <div v-else>
                                <p class="font-semibold text-center">
                                    No se encontraron resultados
                                </p>
                            </div>
                        </div>
                    </div>
                </vs-tab>
            </vs-tabs>
        </div>
    </div>
</template>

<script>
import Wall from "../components/Wall";
import WallComment from "../components/WallComment";
import Collapse from "../components/Collapse";

import CardCount from "../components/CardCount";
import ButtonRight from "../components/ButtonRight";
import TaskForm from "./TaskForm";
import ExamForm from "./ExamForm";
import PracticalWorkForm from "./PracticalWorkForm";
import Classes from "./Classes";
import { mapGetters } from "vuex";
export default {
    name: "Subject",
    components: {
        Wall,
        WallComment,
        Classes,
        CardCount,
        Collapse,
        ButtonRight,
        TaskForm,
        ExamForm,
        PracticalWorkForm,
    },
    props: {
        subject: String,
        subjectId: String,
    },

    data() {
        return {
            dropdown: true,
            activePrompt: false,
            ActiveModal: false,
            itemOne: false,
            activePromptClasses: false,
            class_: null,
            itemTwo: false,
            itemThree: false,
            courseStudents: [],

            cardCount: [],
            DropDownList: [
                {
                    id: 1,
                    title: "Crear Tarea",
                    action: this.tasksModal,
                },
                {
                    id: 2,
                    title: "Crear Examen",
                    action: this.examModal,
                },
                {
                    id: 3,
                    title: "Crear Trabajo Practico",
                    action: this.workModal,
                },
            ],

            tab: {
                value: 1,
            },

            classesList: [],
        };
    },
    computed: {
        ...mapGetters({
            storeCoursesClass: "courseClass/getCourseClasses",
            storeCourseAssignments: "assignment/getAssignments",
            storeCourseById: "course/getCourses",
            storeCourseClassCount: "courseClass/getCourseClassesCount",
        }),
    },

    methods: {
        saveclass() {
            this.activePromptClasses = true;
            this.$refs.Classes.save();
            console.log("ghuardno class");
        },
        closeModal(value) {
            this.itemOne = value;
        },
        closeModalClass(value) {
            this.activePromptClasses = value;
        },
        tasksModal(e) {
            this.itemOne = true;
            const dataTasks = Object.assign(this.courseStudents, {
                class_: {
                    assignmentTypeId: e.target.dataset.id,
                    id: e.target.dataset.classid,
                    title: e.target.dataset.classtitle,
                },
            });

            this.$refs.TaskForm.getDataForm(dataTasks);
        },
        examModal() {
            console.log("hola evalution");
        },
        workModal() {
            console.log("hola working practical");
        },
        clickTag(e) {
            this.dropdown = e !== 0;
        },
        getCourseClass() {
            this.$store.dispatch(
                "courseClass/getCourseClassesSubjectData",
                this.subjectId
            );
        },
        getAssignmentsByCourse() {
            this.$store.dispatch(
                "assignment/getAssignmentsByCourseData",
                this.subjectId
            );
        },
        getClassById(id) {
            if (id) {
                this.class_ = Object.assign(
                    {},
                    this.$store.state.courseClass.courseClasses.find(
                        (x) => x.id === id
                    )
                );
            }
        },
        getCourseById() {
            this.$store.dispatch("course/getCourseById", this.subjectId);
        },
        getCourseClassesCount() {
            if (this.subjectId) {
                this.$store.dispatch(
                    "courseClass/getCourseClassesCountData",
                    this.subjectId
                );
            }
        },

        cardCountCourseClass() {
            return [
                {
                    count: this.cardCount.assistance,
                    title: "Asistencia",
                },
                {
                    count: this.cardCount.tasks,
                    title: "Tareas",
                },
                {
                    count: this.cardCount.evaluations,
                    title: "Evaluaciones",
                },
            ];
        },

        accept() {
            this.activePrompt = true;
        },
    },

    watch: {
        storeCourseById(data) {
            if (data) {
                data.map((element) => {
                    this.courseStudents = Object.assign(
                        {},
                        {
                            course: element.subject,
                            students: element.classroom.classroom_students,
                        }
                    );
                });
            }
        },
        storeCourseClassCount(data) {
            if (data) {
                this.cardCount = data;
            }
        },

        storeCourseAssignments(data) {
            const assignmentsData = [];
            if (data && data.length) {
                data.map((element, i) => {
                    assignmentsData.push({
                        id: element.id,
                        title: element.title,
                        description: element.description,
                        assignments: element.assignments,
                    });
                });
            }
            console.log(assignmentsData);
            this.classesList = assignmentsData;
        },
    },

    mounted() {
        this.getCourseById();
        this.getAssignmentsByCourse();
        this.getCourseClassesCount();
    },
};
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
