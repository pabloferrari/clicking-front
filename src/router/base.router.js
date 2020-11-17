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
    path: "/courses",
    name: "Mis Cursos",
    component: () => import("../views/courses/Courses.vue"),
    meta: {
      permissions: ['admin']
    }
  },
  {
    path: "/courses/:subject",
    name: "Curso Materia",
    component: () => import("../views/courses/Subject.vue"),
    meta: {
      permissions: ['admin']
    },
    props:true
  },
  {
    path: "/classroom",
    name: "Salones",
    component: () => import("../views/classroom/Classroom.vue"),
    meta: {
      permissions: ['admin']
    }
  },
]
