/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

export default [
  {
    url: '/',
    name: 'Home',
    slug: 'home',
    icon: 'HomeIcon',
    permissions: []
  },
  {
    url: null,
    name: 'Configuración',
    slug: 'settings',
    icon: 'SettingsIcon',
    submenu: [
      {
        url: '/countries',
        name: 'Paises',
        slug: 'countries',
        permissions: []
      },
      {
        url: '/provinces',
        name: 'Provincias',
        slug: 'provinces',
        permissions: []
      },
      {
        url: '/cities',
        name: 'Ciudades',
        slug: 'cities',
        permissions: []
      }
    ],
    permissions: ['admin']
  },
  {
    url: null,
    name: 'Configuración',
    slug: 'settings',
    icon: 'SettingsIcon',
    submenu: [
      {
        url: '/subjects',
        name: 'Materias',
        slug: 'subjects',
        permissions: []
      },
      {
        url: '/shifts',
        name: 'Turnos',
        slug: 'shifts',
        permissions: []
      }
    ],
    permissions: ['institution']
  },
  {
    url: '/institutions',
    name: 'Instituciones',
    slug: 'institutions',
    icon: 'BookOpenIcon',
    permissions: ['admin']
  },
  {
    url: '/plans',
    name: 'Planes',
    slug: 'plans',
    icon: 'FileTextIcon',
    permissions: ['admin']
  },
  {
    url: '/teachers',
    name: 'Docentes',
    slug: 'teachers',
    icon: 'ArchiveIcon',
    permissions: ['institution']
  },
  {
    url: '/students',
    name: 'Alumno',
    slug: 'students',
    icon: 'UserIcon',
    permissions: ['institution']
  },
  {
    url: '/courses',
    name: 'Mis Cursos',
    slug: 'courses',
    icon: 'UserIcon',
    permissions: ['teacher', 'student']
  },
  {
    url: '/classrooms',
    name: 'Salones',
    slug: 'classroom',
    icon: 'HomeIcon',
    permissions: ['institution']
  },

  {
    url: '/library',
    name: 'Biblioteca',
    slug: 'library',
    icon: 'BookOpenIcon',
    permissions: ['teacher', 'student']
  },
  {
    url: '/news',
    name: 'Noticias',
    slug: 'news',
    icon: 'FileTextIcon',
    permissions: ['institution', 'teacher', 'student']
  }
]
