<template>
  <div class="register-page">
    <div class="register-form-container d-flex justify-content-center align-items-center">
      <div class="register-form p-4 rounded shadow-lg">
        <h3 class="text-center mb-4">Criar Conta no Hotel Canino</h3>
        <form @submit.prevent="register">
          <h5 class="section-label">🧍 Dados Pessoais</h5>
          <div class="row">
            <div class="col-md-6 mb-3 p-1">
              <input v-model="nome" type="text" class="form-control" placeholder="Nome" required />
            </div>
            <div class="col-md-6 mb-3 p-1">
              <input v-model="apelido" type="text" class="form-control" placeholder="Apelido" required />
            </div>
            <div class="col-md-6 mb-3 p-1">
              <input v-model="username" type="text" class="form-control" placeholder="Username" required />
            </div>
            <div class="col-md-6 mb-3 p-1">
              <input v-model="dataNascimento" type="date" class="form-control" :max="maxDate" required />
            </div>
          </div>

          <h5 class="section-label">📧 Contacto</h5>
          <div class="row">
            <div class="col-md-6 mb-3 p-1">
              <input v-model="email" type="email" class="form-control" placeholder="Email" required />
            </div>
            <div class="col-md-6 mb-3 p-1">
              <input v-model="confirmEmail" type="email" class="form-control" placeholder="Confirmar Email" required />
            </div>
          </div>

          <h5 class="section-label">🔒 Segurança</h5>
          <div class="row">
            <div class="col-md-6 mb-3 p-1">
              <input v-model="password" type="password" class="form-control" placeholder="Password" required />
            </div>
            <div class="col-md-6 mb-3 p-1">
              <input v-model="confirmPassword" type="password" class="form-control" placeholder="Confirmar Password" required />
            </div>
          </div>

          <h5 class="section-label">🐾 Avatar</h5>
          <div class="mb-3">
            <div class="d-flex flex-wrap gap-2">
              <img
                v-for="avatar in avataresDisponiveis"
                :key="avatar"
                :src="`/assets/images/avatars/${avatar}.png`"
                @click="selectAvatar(avatar)"
                :class="{ selected: avatarSelecionado === avatar }"
                class="avatar-thumb"
              />
            </div>
          </div>

          <div class="d-flex justify-content-between mt-4">
            <router-link to="/" class="btn btn-secondary">Cancelar</router-link>
            <button type="submit" class="btn btn-warning">Registar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import validator from 'validator';

export default {
  name: 'Register',
  data() {
    return {
      nome: '',
      apelido: '',
      username: '',
      dataNascimento: '',
      maxDate: this.calculateMaxDate(),
      email: '',
      confirmEmail: '',
      password: '',
      confirmPassword: '',
      avataresDisponiveis: [1, 2, 3, 4, 5, 6, 7, 8],
      avatarSelecionado: 1,
    };
  },
  methods: {
    calculateMaxDate() {
      const today = new Date();
      return `${today.getFullYear() - 18}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    },
    isOldEnough(date) {
      const birth = new Date(date);
      const now = new Date();
      const age = now.getFullYear() - birth.getFullYear();
      return age > 18 || (age === 18 && now >= new Date(birth.setFullYear(birth.getFullYear() + 18)));
    },
    selectAvatar(avatar) {
      this.avatarSelecionado = avatar;
    },
    async register() {
      if (!validator.isEmail(this.email)) return alert("E-mail inválido.");
      if (this.email !== this.confirmEmail) return alert("Os e-mails não coincidem.");
      if (this.password !== this.confirmPassword) return alert("As passwords não coincidem.");
      if (!this.isOldEnough(this.dataNascimento)) return alert("É necessário ter pelo menos 18 anos.");

      try {
        await axios.post(`${process.env.VUE_APP_BACKEND_URL}/utilizadores`, {
          nome: this.nome,
          apelido: this.apelido,
          username: this.username,
          dataNascimento: this.dataNascimento,
          email: this.email,
          password: this.password,
          avatarUser: this.avatarSelecionado,
        });
        alert("Registo efetuado com sucesso!");
        this.$router.push('/');
      } catch (err) {
        alert(err.response?.data?.message || "Erro ao registar.");
      }
    }
  }
};
</script>

<style scoped>
.register-page {
  background-image: url("@/assets/images/landingPage.jpg");
  background-size: cover;
  background-position: center;
  min-height: 90vh;
  padding-top: 40px;
  padding-bottom: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.register-form-container {
  width: 100%;
  padding: 20px;
}

.register-form {
  background-color: rgba(255, 255, 255, 0.96);
  color: #3a3a3a;
  max-width: 750px;
  width: 100%;
  padding: 40px 30px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.register-form:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.register-form h3 {
  color: #2a7f87;
  font-weight: 600;
}

.section-label {
  font-size: 1rem;
  font-weight: 600;
  color: #2a7f87;
  margin-top: 15px;
  margin-bottom: 5px;
}

.form-control {
  border-radius: 8px;
  padding: 12px;
  font-size: 15px;
  border: 1px solid #ccc;
  background-color: #fefcf6;
  transition: border-color 0.2s ease;
}

.form-control:focus {
  border-color: #2a7f87;
  box-shadow: 0 0 0 0.15rem rgba(78, 205, 196, 0.25);
}

.avatar-thumb {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  cursor: pointer;
  border: 3px solid transparent;
  transition: transform 0.2s, border-color 0.3s ease;
  position: relative;
}

.avatar-thumb:hover {
  transform: scale(1.1);
}

.avatar-thumb.selected {
  border-color: #ffe66d;
  box-shadow: 0 0 0 3px #fff3bd;
}

.avatar-thumb.selected::after {
  content: "✔";
  position: absolute;
  bottom: -6px;
  right: -6px;
  background-color: #ffe66d;
  color: #2e2e2e;
  font-size: 12px;
  border-radius: 50%;
  padding: 2px 4px;
}

.btn-warning {
  background-color: #ffe66d;
  border: none;
  color: #3a3a3a;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.btn-warning:hover {
  background-color: #ffd43b;
  color: #2c2c2c;
}

.btn-secondary {
  background-color: #b8c0c2;
  border: none;
  font-weight: 500;
  color: #3a3a3a;
}

.btn-secondary:hover {
  background-color: #a2abac;
  color: #2c2c2c;
}

@media screen and (max-width: 768px) {
  .register-form {
    padding: 30px 20px;
  }
}
</style>
