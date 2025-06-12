<template>
  <div class="minhas-reservas py-5">
    <div class="container painel-reservas p-5 rounded shadow">
      <h1 class="page-title text-center mb-4">🐾 As Minhas Reservas</h1>

      <div v-if="erro" class="alert alert-danger text-center">{{ erro }}</div>
      <div v-if="reservas.length === 0" class="alert alert-light text-dark text-center">
        Ainda não existem reservas registadas.
      </div>

      <div class="row">
        <div
          v-for="reserva in reservas"
          :key="reserva._id"
          class="col-12 col-md-6 col-lg-4 mb-4"
        >
          <div class="card h-100 border-0 shadow-sm">
            <img
              :src="getImagem(reserva)"
              alt="Foto do cão"
              class="card-img-top img-cao"
            />
            <div class="card-body d-flex flex-column bg-light rounded-bottom">
              <h5 class="card-title text-warning">
                {{ getNomeCao(reserva) }} ({{ getRacaCao(reserva) }})
              </h5>
              <p class="reserva-id text-muted mb-3">
                Reserva nº {{ reserva._id }}
              </p>
              <p class="card-text mb-2 text-dark">
                <strong>Entrada:</strong> {{ formatDate(reserva.data_inicio) }}<br />
                <strong>Saída:</strong> {{ formatDate(reserva.data_fim) }}<br />
                <strong>Observações:</strong> {{ reserva.observacoes || 'Sem observações' }}
              </p>
              <button
                v-if="podeCancelar(reserva.data_inicio)"
                class="btn btn-outline-danger mt-auto"
                @click="eliminarReserva(reserva._id)"
              >
                Cancelar Reserva
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "MinhasReservas",
  data() {
    return {
      reservas: [],
      erro: ''
    };
  },
  async mounted() {
    await this.fetchReservas();
  },
  methods: {
    async fetchReservas() {
      const id = localStorage.getItem("id_utilizador");
      if (!id) {
        this.erro = "Utilizador não autenticado.";
        return;
      }

      try {
        const response = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/reservas/${id}`);
        this.reservas = response.data;
      } catch (err) {
        this.erro = "Erro ao carregar as suas reservas.";
      }
    },
    formatDate(data) {
      if (!data) return "N/D";
      return new Date(data).toLocaleDateString("pt-PT");
    },
    getNomeCao(reserva) {
      return reserva.id_cao?.nome || "Sem nome";
    },
    getRacaCao(reserva) {
      return reserva.id_cao?.raca || "Sem raça";
    },
    getImagem(reserva) {
      return reserva.fotoCao
        ? `${process.env.VUE_APP_BACKEND_URL}/uploads/${reserva.fotoCao}`
        : "/assets/images/reserva-default.jpg";
    },
    podeCancelar(dataInicio) {
      const hoje = new Date();
      const inicio = new Date(dataInicio);
      return hoje < inicio;
    },
    async eliminarReserva(id) {
      if (!confirm('Tem a certeza que deseja cancelar esta reserva?')) return;
      try {
        await axios.delete(`${process.env.VUE_APP_BACKEND_URL}/reservas/${id}`);
        this.reservas = this.reservas.filter(r => r._id !== id);
      } catch (err) {
        this.erro = 'Erro ao cancelar reserva.';
      }
    }
  }
};
</script>

<style scoped>
.minhas-reservas {
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

.img-cao {
  height: 200px;
  object-fit: cover;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  border-bottom: 2px solid #ffc107;
}

.card {
  border-radius: 12px;
  overflow: hidden;
}

.card-title {
  font-weight: 600;
  font-size: 1.2rem;
}

.reserva-id {
  font-size: 0.85rem;
}

.card-text {
  font-size: 0.95rem;
}
</style>
