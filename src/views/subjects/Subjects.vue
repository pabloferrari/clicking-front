<template>
<div id="countries">
    <div id="form-model" class="grid-layout-container alignment-block">
        <div class="vx-row">
            <div class="vx-col w-full">
                <p class="primary">Materias</p>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <vs-prompt @accept="accept" :title="`${actionModal} Materia`" accept-text="Guardar" cancel-text="Cancelar" :active.sync="activePrompt" >
        <div class="con-exemple-prompt">
            <SubjectsCreate ref="SubjectsCreate" :isCreate="this.iscreated" :subject="this.subject" @close-modal="closeModal()"/>
        </div>
    </vs-prompt>
    <!-- Modal -->

    <!-- Modal -->
    <vs-prompt @accept="acceptDelete" title="Elminar Materia" text="esta seguro de eliminar?" accept-text="Guardar" cancel-text="Cancelar" :active.sync="activePromptDelete">
    </vs-prompt>
    <!-- Modal -->

    <DataTable 
    :rowList="subjects"
    :btnCreateShow="true"
    :btnCreateTitle="'Añadir Materia'"
    :btnCreateIcon="'icon-plus'"
    :btnCreateIconPack="'feather'"
    @create-action="showModal(true)"
    :columns="columnDefs"
    ref="dataTable"
    >
    </DataTable>
</div>
</template>

<script>
import '@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss'
import SubjectsCreate from './SubjectsCreate.vue'
import { mapGetters } from 'vuex'
import DataTable from '../components/DataTable'

export default {
    name: 'subjects',
    components: {
        SubjectsCreate,
        DataTable
    },
    data () {
        return {
            subjectsList: [],
            activePrompt: false,
            activePromptDelete: false,
            actionModal: '',
            idDeleted: null,
            iscreated: null,
            subject: null,
            columnDefs: [
                {
                    headerName: 'Acciones',
                    field: 'id',
                    type: 'actionColumn',
                    cellRendererParams: {
                        buttonSearch: false,
                        // actionSearch: (id) => { /** action **/ },
                        buttonEdit: true,
                        actionEdit: (id) => {
                            this.getData(id)
                            this.showModal(false) 
                        },
                        buttonDelete: true,
                        actionDelete: (id) => { this.idDeleted = id; this.showModalConfirm() }
                    }
                },
                {
                    headerName: 'id',
                    field: 'id'
                },
                {
                    headerName: 'Materia',
                    field: 'name'
                }
            ]
        }
    },
    methods: {
        showModal (iscreated) {
            this.subject = (!iscreated) ? this.subject : null
            this.actionModal = (iscreated) ? 'Añadir' : 'Editar'
            this.iscreated = iscreated
            this.activePrompt = true
        },
        showModalConfirm () {
            this.activePromptDelete = true
        },
        getData (id) {
            this.subject = Object.assign({}, this.$store.state.subject.subjects.find(x => x.id === id))
        },
        accept () {
            this.activePrompt = true
            this.$refs.SubjectsCreate.save()
        },
        acceptDelete () {
            this.$store.dispatch('subject/deleteSubject', this.idDeleted)
            this.idDeleted = null
        },
        getSubjects () {
            this.$store.dispatch('subject/getSubjects')
        },
        onFirstDataRendered (params) {
            params.api.sizeColumnsToFit()
        },
        closeModal () {
            this.activePrompt = false
        }
    },
    mounted () {
        this.getSubjects()
    },
    watch: {
        subjects (data) {
            this.rowData = data
        }
    },
    computed: {
        ...mapGetters({ subjects: 'subject/getSubjects' })
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
