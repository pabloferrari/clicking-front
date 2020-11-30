import Home from '../views/home/Home.vue'

export default [
  // =============================================================================
  // Theme Routes
  // =============================================================================
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/countries',
    name: 'Paises',
    component: () => import('../views/countries/Countries.vue'),
    meta: {
      permissions: ['admin']
    }
  },
  {
    path: '/provinces',
    name: 'Provincias',
    component: () => import('../views/provinces/Provinces.vue'),
    meta: {
      permissions: ['admin']
    }
  },
  {
    path: '/cities',
    name: 'Ciudades',
    component: () => import('../views/cities/Cities.vue'),
    meta: {
      permissions: ['admin']
    }
  },
  {
    path: '/institutions',
    name: 'Instituciones',
    component: () => import('../views/institutions/Institutions.vue'),
    meta: {
      permissions: ['admin']
    }
  },
  {
    path: '/plans',
    name: 'Planes',
    component: () => import('../views/plans/Plans.vue'),
    meta: {
      permissions: ['admin']
    }
  },
  {
    path: '/teachers',
    name: 'Docentes',
    component: () => import('../views/teachers/Teachers.vue'),
    meta: {
      permissions: ['institution']
    }
  },
  {
    path: '/students',
    name: 'Alumnos',
    component: () => import('../views/students/Students.vue'),
    meta: {
      permissions: ['institution']
    }
  },
  {
    path: '/courses',
    name: 'Mis Cursos',
    component: () => import('../views/courses/Courses.vue'),
    meta: {
      permissions: ['admin', 'teacher']
    }
  },
  {
    path: '/courses/:subject/:subjectId',
    name: 'Curso Materia Asignaciones',
    component: () => import('../views/courses/Subject.vue'),
    meta: {
      permissions: ['admin', 'institution', 'teacher']
    },
    props:true
  },
  {
    path: '/classrooms',
    name: 'Salones',
    component: () => import('../views/classroom/Classroom.vue'),
    meta: {
      permissions: ['institution']
    }
  },
  {
    path: '/classrooms/:title/',
    name: 'Salones Curso',
    component: () => import('../views/courses/Courses.vue'),
    meta: {
      permissions: ['teacher'],
      props:true
    }
  },
  {
    path: '/classrooms/:title/:id',
    name: 'Salones Curso',
    component: () => import('../views/classroom/ClassroomDetail.vue'),
    meta: {
      permissions: ['institution']
    },
    props:true
  },
  {
    path: '/courses/:title/:id/students-list',
    name: 'Listado Alumnos',
    component: () => import('../views/studentsList/'),
    meta: {
      permissions: ['institution']
    },
    props:true
  }

  // {
  //   path: '/classrooms/:course/:subject',
  //   name: 'Curso Materia',
  //   component: () => import('../views/courses/Subject.vue'),
  //   meta: {
  //     permissions: ['institution']
  //   },
  //   props:true
  // }
]
