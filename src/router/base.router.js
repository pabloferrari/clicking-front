import Home from "../views/home/Home.vue";
import Page2 from "../views/Page2.vue";

export default [
  // =============================================================================
  // Theme Routes
  // =============================================================================
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/page2",
    name: "page-2",
    component: () => Page2,
  },
  {
    path: "/countries",
    name: "Pais",
    component: () => import("../views/countries/Countries.vue"),
  },
  {
    path: "/provinces",
    name: "Provincias",
    component: () => import("../views/provinces/Provinces.vue"),
  },
  {
    path: "/cities",
    name: "Ciudades",
    component: () => import("../views/cities/Cities.vue"),
  },
  {
    path: "/institutions",
    name: "Institucion",
    component: () => import("../views/institutions/Institutions.vue"),
  },
  {
    path: "/plans",
    name: "Planes",
    component: () => import("../views/plans/Plans.vue"),
  },
  {
    path: "/teachers",
    name: "Docente",
    component: () => import("../views/teachers/Teachers.vue"),
  },
  {
    path: "/students",
    name: "Alumno",
    component: () => import("../views/students/Students.vue"),
  },
  {
    path: "/courses",
    name: "Mis Cursos",
    component: () => import("../views/courses/Courses.vue"),
  },
  {
    path: "/courses/:subject",
    name: "Curso Materia",
    component: () => import("../views/courses/Subject.vue"),
    props:true
  },
];
