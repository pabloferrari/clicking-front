
import AssignmentService from '../../services/assignment'
import CourseClassService from '../../services/courseClass'
const state = {
    assignment: {},
    assignments: []
}


const getters = {
    getAssignment: state => { return state.assignment },
    getAssignments: state => { return state.assignments },
    getAssignmentsId: state => id => {
        return state.assignments.find(
            assignments => assignments.id === id
        )
    }
}


const mutations = {
    updatedAssignment(state, assignment) {
        state.assignment = assignment
    },

    setAssignments(state, assignments) {
        state.assignments = assignments
    },

    setAssignmen(state, assignment) {
        state.assignment = assignment
    }

}

const actions = {
    async createAssignment({ commit, state, dispatch }, assignment) {
        const newAssignment = {
            title: assignment.titleTask,
            description: assignment.description,
            class_id: assignment.class_id,
            limit_date: assignment.limit_date,
            assignment_type_id: assignment.id,
            assignment_status_id: 1,
            score: assignment.score,
            groupqty: assignment.groupqty,
            student_assignments: assignment.classroom_students
        }

        Object.keys(newAssignment).forEach(key => newAssignment[key] === undefined && delete newAssignment[key])
        await AssignmentService.create(newAssignment)
            .then((response) => {
                const assignments = Object.assign([], state.assignments)
                assignments.push(response.data)
                commit('setAssignments', assignments)

                dispatch(
                    'notification/success',
                    {
                        title: 'Guardado exitoso....',
                        text: 'se ha actualizado correctamente.'
                    },
                    { root: true }
                )
            }).catch((err) => console.log(err))
    },

    async createCourseClass({ commit, state, dispatch }, courseClass) {
        await CourseClassService.create(courseClass)
            .then((response) => {
                const assignments = Object.assign([], state.assignments)
                assignments.push(response.data)
                commit('setAssignments', response.data)
                dispatch(
                    'notification/success',
                    {
                        title: 'Guardado exitoso....',
                        text: 'se ha actualizado correctamente.'
                    },
                    { root: true }
                )
            }).catch((err) => console.log(err))

    },

    async getAssignmentsByCourseData({ commit }, id) {
        await AssignmentService.getAssignmentsByCourse(id)
            .then((response) => {
                commit('setAssignments', response.data)
            }).catch((err) => console.log(err))
    }

}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

