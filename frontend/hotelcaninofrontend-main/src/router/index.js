import { createRouter, createWebHistory } from 'vue-router';

// Área pública
import LandingPage from '@/views/LandingPage.vue';
import Register from '@/views/Register.vue';
import ResetPassword from '@/views/ResetPassword.vue';
import Contactos from '@/views/Contactos.vue';

// Área pessoal (utilizador autenticado)
import MinhasReservas from '@/views/myarea/MinhasReservas.vue';
import Perfil from '@/views/myarea/Perfil.vue';
import DRCalendario from '@/views/DRCalendario.vue';
import DRReservar from '@/views/DRReservar.vue';

// Informação (páginas estáticas)
import InfoApresentacao from '@/views/InfoApresentacao.vue';
import InfoInstalacoes from '@/views/InfoInstalacoes.vue';
import InfoServicos from '@/views/InfoServicos.vue';
import PCCondicoes from '@/views/PCCondicoes.vue';
import PCPrecos from '@/views/PCPrecos.vue';

// Área administrativa
import Dashboard from '@/views/admin/Dashboard.vue';
import GestaoReservas from '@/views/admin/GestaoReservas.vue';
import GestaoUtilizadores from '@/views/admin/GestaoUtilizadores.vue';
import GestaoConteudos from '@/views/admin/GestaoConteudos.vue';

const routes = [
  // Público
  { path: '/', name: 'LandingPage', component: LandingPage },
  { path: '/register', name: 'Register', component: Register },
  { path: '/recuperar', name: 'RecuperarPassword', component: ResetPassword },
  { path: '/redefinir/:token', name: 'RedefinirPassword', component: ResetPassword },

  // Utilizador autenticado
  { path: '/perfil', name: 'Perfil', component: Perfil, meta: { requiresAuth: true } },
  { path: '/minhas-reservas', name: 'MinhasReservas', component: MinhasReservas, meta: { requiresAuth: true } },
  { path: '/reservar', name: 'DRReservar', component: DRReservar, meta: { requiresAuth: true } },
  { path: '/calendario', name: 'DRCalendario', component: DRCalendario, meta: { requiresAuth: true } },

  // Páginas de informação
  { path: '/apresentacao', name: 'InfoApresentacao', component: InfoApresentacao },
  { path: '/instalacoes', name: 'InfoInstalacoes', component: InfoInstalacoes },
  { path: '/servicos', name: 'InfoServicos', component: InfoServicos },
  { path: '/condicoes', name: 'PCCondicoes', component: PCCondicoes },
  { path: '/precos', name: 'PCPrecos', component: PCPrecos },
  { path: '/contactos', name: 'Contactos', component: Contactos },

  // Administração
  { path: '/admin', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true, admin: true } },
  { path: '/admin/reservas', name: 'GestaoReservas', component: GestaoReservas, meta: { requiresAuth: true, admin: true } },
  { path: '/admin/utilizadores', name: 'GestaoUtilizadores', component: GestaoUtilizadores, meta: { requiresAuth: true, admin: true } },
  { path: '/admin/conteudos', name: 'GestaoConteudos', component: GestaoConteudos, meta: { requiresAuth: true, admin: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// 🔐 Proteção de rotas
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('authToken');
  const isAdmin = localStorage.getItem('userRole') === 'admin';

  // Redireciona utilizador autenticado se tentar aceder à landing page
  if (to.name === 'LandingPage' && isAuthenticated) {
    next({ name: 'InfoApresentacao' });
    return;
  }

  // Bloqueia rotas autenticadas se não estiver autenticado
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'LandingPage' });
    return;
  }

  // Bloqueia rotas administrativas se não for admin
  if (to.matched.some(record => record.meta.admin) && !isAdmin) {
    next({ name: 'LandingPage' });
    return;
  }

  next();
});

export default router;
