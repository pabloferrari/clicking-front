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
    path: '/subjects',
    name: 'Materias',
    component: () => import('../views/subjects/Subjects.vue'),
    meta: {
      permissions: ['institution']
    }
  },
  {
    path: '/shifts',
    name: 'Turnos',
    component: () => import('../views/shifts/Shifts.vue'),
    meta: {
      permissions: ['institution']
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
    path: '/institutions/detail/:id',
    name: 'Instituciones Detalle',
    component: () => import('../views/institutions/InstitutionDetail.vue'),
    meta: {
      permissions: ['admin']
    },
    props: true
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
      permissions: ['institution', 'admin']
    }
  },
  {
    path: '/students',
    name: 'Alumnos',
    component: () => import('../views/students/Students.vue'),
    meta: {
      permissions: ['institution', 'admin']
    }
  },
  {
    path: '/courses',
    name: 'Mis Cursos',
    component: () => import('../views/courses/Courses.vue'),
    meta: {
      permissions: ['admin', 'teacher', 'student']
    }
  },
  {
    path: '/ratings',
    name: 'Mis Calificaciones',
    component: () => import('../views/ratings/RatingStudents.vue'),
    meta: {
      permissions: ['student']
    }
  },
  {
    path: '/courses/tasks',
    name: 'Mis Cursos - Asignación Tarea',
    component: () => import('../views/courses/MyTasks.vue'),
    meta: {
      permissions: ['student', 'teacher']
    },
    props: true
  },
  {
    path: '/courses/evaluations',
    name: 'Mis Cursos - Asignación Evaluación',
    component: () => import('../views/courses/MyEvaluations.vue'),
    meta: {
      permissions: ['student', 'teacher']
    },
    props: true
  },
  {
    path: '/courses/workpractices',
    name: 'Mis Cursos - Asignación Trabajo Practico',
    component: () => import('../views/courses/MyWorkPractices.vue'),
    meta: {
      permissions: ['student', 'teacher']
    },
    props: true
  },
  {
    path: '/courses/assignment/:id',
    name: 'Mis Cursos - Asignación',
    component: () => import('../views/courses/Assignment.vue'),
    meta: {
      permissions: ['student', 'teacher']
    },
    props: true
  },
  {
    path: '/courses/:subject/:subjectId',
    name: 'Curso Materia Asignaciones',
    component: () => import('../views/courses/Subject.vue'),
    meta: {
      permissions: ['admin', 'institution', 'teacher', 'student']
    },
    props: true
  },
  {
    path: '/courses/:subject/folders/:courseId',
    name: 'Curso - Carpeta Clase',
    component: () => import('../views/folders/Folders.vue'),
    meta: {
      permissions: ['institution', 'teacher', 'student']
    },
    props: true
  },
  {
    path: '/courses/folders/files/:folderId',
    name: 'Curso - Archivos - Carpeta Clase',
    component: () => import('../views/folders/FolderFiles.vue'),
    meta: {
      permissions: ['institution', 'teacher', 'student']
    },
    props: true
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
      props: true
    }
  },
  {
    path: '/classrooms/:title/:id',
    name: 'Salones Curso',
    component: () => import('../views/classroom/ClassroomDetail.vue'),
    meta: {
      permissions: ['institution']
    },
    props: true
  },
  {
    path: '/courses/:title/students-list/:id',
    name: 'Listado Alumnos',
    component: () => import('../views/studentsList/'),
    // meta: {
    //   permissions: ['institution']
    // },
    props: true
  },
  {
    path: '/news',
    name: 'Noticias',
    component: () => import('../views/news/News.vue'),
    meta: {
      permissions: ['institution', 'teacher', 'student']
    }
  },
  {
    path: '/tickets',
    name: 'Ayuda',
    component: () => import('../views/tickets/Tickets.vue'),
    meta: {
      permissions: ['admin', 'institution', 'teacher', 'student']
    }
  },
  {
    path: '/library',
    name: 'Biblioteca',
    component: () => import('../views/library/'),
    meta: {
      permissions: ['teacher', 'student', 'institution']
    }
  },
  {
    path: '/my-notes',
    name: 'MyNotes',
    component: () => import('../views/notes/MyNotes.vue'),
    meta: {
      permissions: ['admin', 'institution', 'teacher', 'student']
    }
  },
  {
    path: '/configuration',
    name: 'Config',
    component: () => import('../views/config/Config.vue'),
    meta: {
      permissions: ['admin', 'institution', 'teacher', 'student']
    }
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
