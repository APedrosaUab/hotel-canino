<template>
  <div class="gestao-reservas py-5">
    <div class="container painel-reservas p-5 rounded shadow">
      <h1 class="page-title text-center mb-4">📋 Gestão de Reservas</h1>

      <div v-if="erro" class="alert alert-danger text-center">{{ erro }}</div>

      <table v-if="pagedReservas.length" class="table table-bordered table-striped bg-white text-dark shadow-sm">
        <thead class="table-warning text-dark text-center">
          <tr>
            <th>Nome do Cão</th>
            <th>Nome do Dono</th>
            <th>Entrada</th>
            <th>Saída</th>
            <th class="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="reserva in pagedReservas" :key="reserva._id">
            <td>{{ reserva.id_cao?.nome || 'N/D' }}</td>
            <td>{{ reserva.id_utilizador?.nome || 'N/D' }} {{ reserva.id_utilizador?.apelido || '' }}</td>
            <td>
              <input
                v-if="editando[reserva._id]"
                type="date"
                v-model="editando[reserva._id].data_inicio"
                class="form-control"
              />
              <span v-else>{{ formatDate(reserva.data_inicio) }}</span>
            </td>
            <td>
              <input
                v-if="editando[reserva._id]"
                type="date"
                v-model="editando[reserva._id].data_fim"
                class="form-control"
              />
              <span v-else>{{ formatDate(reserva.data_fim) }}</span>
            </td>
            <td class="text-center">
              <template v-if="editando[reserva._id]">
                <button class="btn btn-sm btn-success m-1" @click="guardarEdicao(reserva._id)">Guardar</button>
                <button class="btn btn-sm btn-secondary" @click="cancelarEdicao(reserva._id)">Cancelar</button>
              </template>
              <template v-else>
                <button class="btn btn-sm btn-outline-primary m-1" @click="verDetalhes(reserva._id)">Ver</button>
                <button class="btn btn-sm btn-outline-warning m-1" @click="editar(reserva)">Editar</button>
                <button class="btn btn-sm btn-outline-danger" @click="eliminar(reserva._id)">Eliminar</button>
              </template>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Paginação -->
      <nav v-if="totalPages > 1" aria-label="Paginação" class="mt-4">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">&laquo;</a>
          </li>
          <li class="page-item" v-for="page in pages" :key="page" :class="{ active: page === currentPage }">
            <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">&raquo;</a>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Modal Ver Detalhes -->
    <div class="modal fade" id="modalDetalhes" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content bg-light text-dark">
          <div class="modal-header">
            <h5 class="modal-title" id="modalLabel">Detalhes da Reserva</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
          </div>
          <div class="modal-body" v-if="reservaSelecionada">
            <p><strong>ID:</strong> {{ reservaSelecionada._id }}</p>
            <p><strong>Cão:</strong> {{ reservaSelecionada.id_cao?.nome }} ({{ reservaSelecionada.id_cao?.raca }})</p>
            <p><strong>Dono:</strong> {{ reservaSelecionada.id_utilizador?.nome }} {{ reservaSelecionada.id_utilizador?.apelido }}</p>
            <p><strong>Email:</strong> {{ reservaSelecionada.id_utilizador?.email }}</p>
            <p><strong>Entrada:</strong> {{ formatDate(reservaSelecionada.data_inicio) }}</p>
            <p><strong>Saída:</strong> {{ formatDate(reservaSelecionada.data_fim) }}</p>
            <p><strong>Observações:</strong> {{ reservaSelecionada.observacoes || 'Nenhuma' }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { Modal } from 'bootstrap';

export default {
  name: 'GestaoReservas',
  data() {
    return {
      reservas: [],
      erro: '',
      editando: {},
      reservaSelecionada: null,
      currentPage: 1,
      pageSize: 10
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.reservas.length / this.pageSize);
    },
    pages() {
      return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    },
    pagedReservas() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.reservas.slice(start, start + this.pageSize);
    }
  },
  mounted() {
    this.carregarReservas();
  },
  methods: {
    async carregarReservas() {
      try {
        const res = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/reservas`);
        this.reservas = res.data;
      } catch (err) {
        this.erro = 'Erro ao carregar reservas.';
      }
    },
    formatDate(data) {
      return new Date(data).toLocaleDateString('pt-PT');
    },
    verDetalhes(id) {
      this.reservaSelecionada = this.reservas.find(r => r._id === id);
      const modal = new Modal(document.getElementById('modalDetalhes'));
      modal.show();
    },
    editar(reserva) {
      this.editando = {
        [reserva._id]: {
          data_inicio: reserva.data_inicio.split('T')[0],
          data_fim: reserva.data_fim.split('T')[0],
          id_cao: reserva.id_cao,
          id_utilizador: reserva.id_utilizador
        }
      };
    },
    cancelarEdicao(id) {
      this.editando = {};
    },
    async guardarEdicao(id) {
      const ed = this.editando[id];
      try {
        const res = await axios.put(`${process.env.VUE_APP_BACKEND_URL}/reservas/editar/${id}`, {
          data_inicio: ed.data_inicio,
          data_fim: ed.data_fim
        });
        const reservaAtualizada = res.data.reserva;
        this.reservas = this.reservas.map(r => r._id === id
          ? { ...reservaAtualizada, id_cao: ed.id_cao, id_utilizador: ed.id_utilizador }
          : r
        );
        this.editando = {};
      } catch {
        this.erro = 'Erro ao guardar alterações.';
      }
    },
    async eliminar(id) {
      if (!confirm('Tem a certeza que deseja eliminar esta reserva?')) return;
      try {
        await axios.delete(`${process.env.VUE_APP_BACKEND_URL}/reservas/${id}`);
        this.reservas = this.reservas.filter(r => r._id !== id);
      } catch {
        this.erro = 'Erro ao eliminar reserva.';
      }
    },
    changePage(page) {
      if (page < 1 || page > this.totalPages) return;
      this.currentPage = page;
    }
  }
};
</script>

<style scoped>
.gestao-reservas {
  min-height: 100vh;
  background-color: #f9f7ef;
  color: #2e2e2e;
}

.painel-reservas {
  background-color: #ffffff;
  border-radius: 12px;
}

.page-title {
  color: #2a7f87;
  font-weight: 700;
  font-size: 2.2rem;
}

/* Paginação */
.pagination .page-item .page-link {
  color: #2a7f87;
}
.pagination .page-item.active .page-link {
  background-color: #2a7f87;
  border-color: #2a7f87;
  color: #fff!important;
}
.pagination .page-item.disabled .page-link {
  color: #ccc;
}
</style>