<template>
  <div class="login-page text-white">
    <div v-if="errorMessage" class="alert alert-danger mb-4 text-center">
      {{ errorMessage }}
    </div>

    <div class="loginPageTitle">
      <h1>Hotel Canino</h1>
    </div>

    <div class="row login-form-container bg-dark p-4 rounded shadow-lg">
      <div class="col-12 mb-4 text-center">
        <h3 class="text-warning">Login</h3>
      </div>

      <div class="col-12 col-md-6 m-auto text-center">
        <img src="@/assets/logo.png" alt="Logotipo do Hotel" class="logo-image" />
      </div>

      <div class="col-12 col-md-6 m-auto">
        <div class="login-form">
          <form @submit.prevent="login">
            <div class="form-floating mt-2">
              <input type="text" id="username" class="form-control" v-model="username" required autocomplete="username">
              <label for="username">Username</label>
            </div>

            <div class="form-floating mt-2">
              <input type="password" id="password" class="form-control" v-model="password" required autocomplete="current-password">
              <label for="password">Password</label>
            </div>

            <button type="submit" class="btn btn-success mt-3 w-100">Entrar</button>
          </form>
        </div>
      </div>

      <div class="col-12 text-center mt-4">
        <router-link to="/register" class="text-light me-3">Novo utilizador</router-link>
        <router-link to="/recuperar" class="text-light">Recuperar Password</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async login() {
      if (!this.username || !this.password) {
        this.errorMessage = 'Preencha todos os campos.';
        return;
      }

      try {
        const res = await axios.post(`${process.env.VUE_APP_BACKEND_URL}/login`, {
          username: this.username,
          password: this.password
        });

        const { sessionToken, username, id_utilizador, avatarUser, userRole } = res.data;

        localStorage.setItem('authToken', sessionToken);
        localStorage.setItem('username', username);
        localStorage.setItem('id_utilizador', id_utilizador);
        localStorage.setItem('avatarUser', avatarUser);
        localStorage.setItem('userRole', userRole || 'user');

        this.$router.push('/homepage');
      } catch (error) {
        this.errorMessage = error.response?.data?.message || 'Erro ao tentar fazer login.';
      }
    }
  }
};
</script>

<style scoped>
.login-page {
  min-height: 90vh;
  width: 100%;
  max-width: 1920px;
  background-image: url("@/assets/images/landingPage.jpg");
  background-size: cover;
  background-position: center;
  padding-top: 40px;
  padding-bottom: 60px;
  background-color: #f9f7ef;
  color: #3a3a3a;
}

/* Título */
.loginPageTitle {
  text-align: center;
  padding-bottom: 30px;
}

.loginPageTitle h1 {
  font-size: 3rem;
  font-weight: 700;
  color: #ffe66d;
  text-shadow: 2px 2px #3a3a3a;
}

/* Logotipo */
.logo-image {
  max-width: 180px;
  width: 100%;
  margin-bottom: 20px;
  border-radius: 90px;
  background-color: white;
  padding: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* Form container */
.login-form-container {
  max-width: 650px;
  margin: auto;
  background-color: rgba(255, 255, 255, 0.95);
  color: #3a3a3a;
  padding: 50px 30px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

/* Título do formulário */
.login-form-container h3 {
  color: #2a7f87;
  font-weight: 600;
}

/* Formulário */
.login-form {
  max-width: 320px;
  margin: auto;
}

.form-control {
  border-radius: 8px;
  border: 1px solid #ccc;
  padding: 12px;
  font-size: 15px;
  transition: border-color 0.2s;
}

.form-control:focus {
  border-color: #2a7f87;
  box-shadow: 0 0 0 0.15rem rgba(78, 205, 196, 0.25);
}

/* Botão de login */
button.btn-success {
  background-color: #2a7f87;
  border: none;
  font-weight: 600;
  color: #fff;
  transition: background-color 0.3s ease;
}

button.btn-success:hover {
  background-color: #2a7f87;
}

/* Links abaixo do formulário */
a.text-light {
  color: #2a7f87 !important;
  font-weight: 500;
  text-decoration: underline;
}

a.text-light:hover {
  color: #2a7f87 !important;
}

/* Alertas */
.alert-danger {
  background-color: #ffe6e6;
  color: #a94442;
  border: 1px solid #f5c6cb;
  border-radius: 6px;
}

/* Responsivo */
@media screen and (max-width: 767px) {
  .loginPageTitle h1 {
    font-size: 2.4rem;
  }
}
</style>
