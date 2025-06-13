<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
    <!-- MOBILE: Botão Hamburguer -->
    <button
      class="navbar-toggler me-2 d-lg-none"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasMenu"
      aria-controls="offcanvasMenu"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- LOGO -->
    <router-link to="/" class="navbar-brand mx-auto mx-lg-0">
      <img src="@/assets/logo.png" alt="Hotel Canino" class="logo-img" />
    </router-link>

    <!-- DESKTOP MENU -->
    <div class="collapse navbar-collapse d-none d-lg-flex" id="navbarNav">
      <ul class="navbar-nav ms-5 me-auto">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Informações</a>
          <ul class="dropdown-menu">
            <li><router-link class="dropdown-item" to="/apresentacao">Apresentação</router-link></li>
            <li><router-link class="dropdown-item" to="/instalacoes">Instalações</router-link></li>
            <li><router-link class="dropdown-item" to="/servicos">Serviços</router-link></li>
          </ul>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Preços e Condições</a>
          <ul class="dropdown-menu">
            <li><router-link class="dropdown-item" to="/precos">Preços</router-link></li>
            <li><router-link class="dropdown-item" to="/condicoes">Condições</router-link></li>
          </ul>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Reservas</a>
          <ul class="dropdown-menu">
            <li><router-link class="dropdown-item" to="/calendario">Calendário</router-link></li>
            <li v-if="isAuthenticated"><router-link class="dropdown-item" to="/reservar">Reservar</router-link></li>
          </ul>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/contactos">Contactos</router-link>
        </li>
      </ul>

      <!-- Avatar Desktop -->
      <div v-if="isAuthenticated" class="dropdown">
        <a class="d-flex align-items-center text-white dropdown-toggle" href="#" data-bs-toggle="dropdown">
          <span class="me-2">Olá, {{ username }}</span>
          <img :src="`/assets/images/avatars/${avatarUser}.png`" alt="avatar" class="rounded-circle" style="width: 32px; height: 32px;" />
        </a>
        <ul class="dropdown-menu dropdown-menu-end">
          <li><router-link class="dropdown-item" to="/perfil">Perfil</router-link></li>
          <li><router-link class="dropdown-item" to="/minhas-reservas">Minhas Reservas</router-link></li>
          <li v-if="isAdmin"><hr class="dropdown-divider" /></li>
          <li v-if="isAdmin"><router-link class="dropdown-item" to="/admin">Dashboard</router-link></li>
          <li v-if="isAdmin"><router-link class="dropdown-item" to="/admin/reservas">Gestão de Reservas</router-link></li>
          <li v-if="isAdmin"><router-link class="dropdown-item" to="/admin/conteudos">Gestão de Conteúdos</router-link></li>
          <li v-if="isAdmin"><router-link class="dropdown-item" to="/admin/utilizadores">Gestão de Utilizadores</router-link></li>
          <li><hr class="dropdown-divider" /></li>
          <li><a class="dropdown-item text-danger" @click="logout">Sair</a></li>
        </ul>
      </div>
      <router-link v-else class="btn btn-outline-light btn-sm ms-2" to="/login">Entrar</router-link>
    </div>

    <!-- MOBILE: OFFCANVAS -->
    <div class="offcanvas offcanvas-start text-bg-dark d-lg-none" tabindex="-1" id="offcanvasMenu">
      <div class="offcanvas-header border-bottom">
        <h5 class="offcanvas-title">Menu</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
      </div>
      <div class="offcanvas-body py-2">
        <ul class="nav flex-column">
          <li v-if="isAuthenticated" class="text-warning fw-bold mt-1">Área Pessoal</li>
          <li v-if="isAuthenticated"><router-link class="nav-link text-white ms-3" to="/perfil">Perfil</router-link></li>
          <li v-if="isAuthenticated"><router-link class="nav-link text-white ms-3" to="/minhas-reservas">Minhas Reservas</router-link></li>

          <li v-if="isAdmin" class="text-warning fw-bold mt-1">Área Admin</li>
          <li v-if="isAdmin"><router-link class="nav-link text-white ms-3" to="/admin">Dashboard</router-link></li>
          <li v-if="isAdmin"><router-link class="nav-link text-white ms-3" to="/admin/reservas">Gestão de Reservas</router-link></li>
          <li v-if="isAdmin"><router-link class="nav-link text-white ms-3" to="/admin/conteudos">Gestão de Conteúdos</router-link></li>
          <li v-if="isAdmin"><router-link class="nav-link text-white ms-3" to="/admin/utilizadores">Gestão de Utilizadores</router-link></li>

          <li class="nav-item text-warning fw-bold mt-1">Informações</li>
          <li><router-link class="nav-link text-white ms-3" to="/apresentacao">Apresentação</router-link></li>
          <li><router-link class="nav-link text-white ms-3" to="/instalacoes">Instalações</router-link></li>
          <li><router-link class="nav-link text-white ms-3" to="/servicos">Serviços</router-link></li>

          <li class="nav-item text-warning fw-bold mt-1">Preços e Condições</li>
          <li><router-link class="nav-link text-white ms-3" to="/precos">Preços</router-link></li>
          <li><router-link class="nav-link text-white ms-3" to="/condicoes">Condições</router-link></li>

          <li class="nav-item text-warning fw-bold mt-1">Reservas</li>
          <li><router-link class="nav-link text-white ms-3" to="/calendario">Calendário</router-link></li>
          <li v-if="isAuthenticated"><router-link class="nav-link text-white ms-3" to="/reservar">Reservar</router-link></li>

          <li class="nav-item text-warning fw-bold mt-1">Contactos</li>
          <li><router-link class="nav-link text-white ms-3" to="/contactos">Contactos</router-link></li>

          <li v-if="isAuthenticated" class="mt-1">
            <a class="nav-link text-danger" @click="logout">Sair</a>
          </li>

          <li v-else class="mt-3">
            <router-link class="btn btn-outline-dark w-100 text-center" to="/login">Entrar</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      username: localStorage.getItem("username") || "",
      avatarUser: localStorage.getItem("avatarUser") || ""
    };
  },
  computed: {
    isAuthenticated() {
      return !!localStorage.getItem("authToken");
    },
    isAdmin() {
      return localStorage.getItem("userRole") === "admin";
    }
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push('/').then(() => window.location.reload());
    }
  }
};
</script>

<style scoped>
/* LOGO */
.logo-img {
  height: 40px;
  border-radius: 20px;
}

/* NAVBAR GERAL */
.navbar {
 /* background-color: ##557c73 !important; /* verde elegante */
 background-color:  #2a7f87 !important;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

/* LINKS GERAIS */
.navbar-nav .nav-link {
  color: #ffffff !important; /* Branco puro para contraste */
  font-weight: 500;
  transition: color 0.3s ease;
}

/* LINK ATIVO OU HOVER */
.navbar-nav .nav-link.router-link-exact-active,
.navbar-nav .nav-link:hover {
  color: #ffe66d !important; /* Amarelo dourado suave */
  font-weight: 600;
}

/* DROPDOWN MENU */
.dropdown-menu {
  background-color: #f9f7ef; /* Areia suave */
  border-radius: 8px;
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

/* ITENS DE DROPDOWN */
.dropdown-item {
  color: #3a3a3a;
  transition: background-color 0.2s ease;
}

.dropdown-item:hover {
  background-color: #faedcd;
}

/* BOTÃO ENTRAR */
.btn-outline-light {
  border-color: #ffe66d;
  color: #ffffff;
  font-weight: 500;
  transition: all 0.3s ease-in-out;
}

.btn-outline-light:hover {
  background-color: #ffe66d;
  color: #3a3a3a;
}

/* BOTÃO TOGGLER */
.navbar-toggler {
  border: none;
  filter: brightness(1.1);
}

 
/* OFFCANVAS MENU (MOBILE) */
.offcanvas {
  background-color: #f9f7ef;
  color: #3a3a3a;
}

.offcanvas .nav-link {
  color: #e5d9c6 !important;
}

.text-warning {
  color: #f4a261 !important;
} 

/* TEXTO OFFCANVAS */
ul.nav.flex-column {
  text-align: left;
}

/* HEADER OFFCANVAS */
.offcanvas-header.border-bottom {
  padding: 8px 16px;
  border-color: #faedcd;
}

/* ANIMAÇÕES SUAVES */
.navbar-nav .nav-link,
.dropdown-item,
.btn-outline-light {
  transition: all 0.3s ease;
}

/* ÍCONES (opcional: podes usar emojis ou SVGs no HTML) */
</style>
