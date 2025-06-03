<template>
  <div class="password-page">
    <div class="reset-form-container d-flex justify-content-center align-items-center">
      <div class="reset-form bg-dark text-white p-4 rounded shadow-lg">
        <h2 class="text-warning mb-4 text-center">
          {{ isReset ? 'Redefinir Password' : 'Recuperar Password' }}
        </h2>

        <form @submit.prevent="isReset ? resetPassword() : recoverPassword()">
          <div v-if="!isReset" class="mb-3">
            <label class="form-label">E-mail</label>
            <input type="email" class="form-control" v-model="email" required />
          </div>

          <div v-else>
            <div class="mb-3">
              <label class="form-label">Nova Password</label>
              <input type="password" class="form-control" v-model="newPassword" required />
            </div>
            <div class="mb-3">
              <label class="form-label">Confirmar Password</label>
              <input type="password" class="form-control" v-model="confirmNewPassword" required />
            </div>
          </div>

          <div class="d-flex justify-content-between mt-4">
            <router-link to="/" class="btn btn-secondary">Cancelar</router-link>
            <button class="btn btn-warning" type="submit" :disabled="loading">
              {{ loading ? 'A processar...' : isReset ? 'Redefinir' : 'Enviar' }}
            </button>
          </div>

          <p v-if="message" class="mt-3 text-success text-center">{{ message }}</p>
          <p v-if="errorMessage" class="mt-3 text-danger text-center">{{ errorMessage }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ResetPassword',
  data() {
    return {
      email: '',
      newPassword: '',
      confirmNewPassword: '',
      message: '',
      errorMessage: '',
      loading: false
    };
  },
  computed: {
    isReset() {
      return !!this.$route.params.token;
    }
  },
  methods: {
    async recoverPassword() {
      this.loading = true;
      this.errorMessage = this.message = '';
      try {
        await axios.post(`${process.env.VUE_APP_BACKEND_URL}/forgot/recuperar-password`, { email: this.email });
        this.message = "Instruções enviadas para o seu e-mail.";
      } catch (err) {
        this.errorMessage = err.response?.data?.message || "Erro ao enviar instruções.";
      } finally {
        this.loading = false;
      }
    },
    async resetPassword() {
      if (this.newPassword !== this.confirmNewPassword) {
        this.errorMessage = "As passwords não coincidem.";
        return;
      }

      const token = this.$route.params.token;
      this.loading = true;
      try {
        await axios.post(`${process.env.VUE_APP_BACKEND_URL}/recover/redefinir-password/${token}`, {
          newPassword: this.newPassword
        });
        this.message = "Password redefinida com sucesso.";
        setTimeout(() => this.$router.push('/'), 2000);
      } catch (err) {
        this.errorMessage = err.response?.data?.message || "Erro ao redefinir a password.";
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.password-page {
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

.reset-form-container {
  width: 100%;
  padding: 20px;
}

.reset-form {
  background-color: rgba(255, 255, 255, 0.96);
  color: #3a3a3a;
  max-width: 600px;
  width: 100%;
  padding: 40px 30px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

/* Título */
.reset-form h2 {
  color: #4ecdc4;
  font-weight: 600;
}

/* Campos de input */
.form-control {
  border-radius: 8px;
  padding: 12px;
  font-size: 15px;
  border: 1px solid #ccc;
  transition: border-color 0.2s ease;
}

.form-control:focus {
  border-color: #4ecdc4;
  box-shadow: 0 0 0 0.15rem rgba(78, 205, 196, 0.25);
}

/* Botão de ação principal */
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

/* Botão cancelar */
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

/* Mensagens de feedback */
.text-success {
  color: #28a745;
}

.text-danger {
  color: #dc3545;
}

@media screen and (max-width: 768px) {
  .reset-form {
    padding: 30px 20px;
  }
}
</style>
