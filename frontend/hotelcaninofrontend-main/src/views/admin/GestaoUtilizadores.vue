<template>
  <div class="gestao-utilizadores py-5">
    <div class="container painel-utilizadores p-5 rounded shadow">
      <h1 class="page-title text-center mb-4">👤 Gestão de Utilizadores</h1>

      <p class="text-center lead mb-4">
        Consulta e gestão de utilizadores registados no sistema.
      </p>

      <table class="table table-bordered table-striped bg-white text-dark shadow-sm">
        <thead class="table-warning text-dark text-center">
          <tr>
            <th>Nome</th>
            <th>Apelido</th>
            <th>Username</th>
            <th>Email</th>
            <th class="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in utilizadores" :key="user._id">
            <td>{{ user.nome }}</td>
            <td>{{ user.apelido }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td class="text-center">
              <button
                class="btn btn-sm btn-outline-danger"
                @click="eliminar(user._id)"
                :disabled="naoPodeEliminar(user)"
                :title="naoPodeEliminar(user) ? 'Não é possível eliminar este utilizador.' : 'Eliminar utilizador'"
              >
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="erro" class="alert alert-danger mt-3 text-center">{{ erro }}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'GestaoUtilizadores',
  data() {
    return {
      utilizadores: [],
      erro: '',
      idAutenticado: localStorage.getItem('id_utilizador') || ''
    };
  },
  mounted() {
    this.carregarUtilizadores();
  },
  methods: {
    async carregarUtilizadores() {
      try {
        const res = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/utilizadores`);
        this.utilizadores = res.data;
      } catch {
        this.erro = 'Erro ao carregar utilizadores.';
      }
    },
    async eliminar(id) {
      if (!confirm('Tem a certeza que deseja eliminar este utilizador?')) return;
      try {
        await axios.delete(`${process.env.VUE_APP_BACKEND_URL}/utilizadores/${id}`);
        this.utilizadores = this.utilizadores.filter(u => u._id !== id);
      } catch {
        this.erro = 'Erro ao eliminar utilizador.';
      }
    },
    naoPodeEliminar(user) {
      return user.role === 'admin' || user._id === this.idAutenticado;
    }
  }
};
</script>

<style scoped>
.gestao-utilizadores {
  min-height: 100vh;
  background-color: #f9f7ef;
  color: #2e2e2e;
}

.painel-utilizadores {
  background-color: #ffffff;
  border-radius: 12px;
}

.page-title {
  color: #2a7f87;
  font-weight: 700;
  font-size: 2.2rem;
}
</style>
