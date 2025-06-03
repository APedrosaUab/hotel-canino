<template>
  <div class="reservar container">
    <h1 class="page-title text-center mb-4">Fazer Pedido de Reserva</h1>

    <p class="lead text-center mb-4">
      Consulte a disponibilidade nos próximos meses antes de submeter o pedido.
    </p>

    <!-- Mini calendário -->
    <div class="row mb-4">
      <div v-for="mes in 3" :key="mes" class="col-md-4 mb-3">
        <div class="calendario-bloco p-3 rounded shadow-sm">
          <h5 class="text-center mb-3 mes-titulo">{{ nomeDoMes(mesAtual + mes - 1) }} {{ anoDeMes(mesAtual + mes - 1) }}</h5>
          <div class="d-flex flex-wrap justify-content-center gap-1">
            <div
              v-for="dia in diasDoMes(mesAtual + mes - 1)"
              :key="dia"
              :class="['dia-calendario', isOcupado(dia) ? 'ocupado' : 'livre']"
            >
              {{ dia.getDate() }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Formulário -->
    <form @submit.prevent="submeterReserva" class="row g-4">
      <div class="col-md-6">
        <label class="form-label">Selecionar Cão</label>
        <select v-model="form.id_cao" class="form-select" required>
          <option value="" disabled>Escolha um cão</option>
          <option v-for="cao in caes" :key="cao._id" :value="cao._id">
            {{ cao.nome }} ({{ cao.raca }})
          </option>
        </select>
      </div>

      <div class="col-md-3">
        <label class="form-label">Data de Início</label>
        <input v-model="form.data_inicio" type="date" class="form-control" required />
      </div>

      <div class="col-md-3">
        <label class="form-label">Data de Fim</label>
        <input v-model="form.data_fim" type="date" class="form-control" required />
      </div>

      <div class="col-12 mt-3">
        <label class="form-label">Observações</label>
        <textarea v-model="form.observacoes" class="form-control" rows="3" placeholder="Comportamentos especiais, necessidades, etc."></textarea>
      </div>

      <div class="col-12 text-center mt-2">
        <button class="btn-reserva btn btn-lg">Submeter Pedido</button>
      </div>
    </form>

    <div v-if="mensagem" class="alert alert-success mt-4 text-center">{{ mensagem }}</div>
    <div v-if="erro" class="alert alert-danger mt-4 text-center">{{ erro }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'DRReservar',
  data() {
    const hoje = new Date();
    return {
      caes: [],
      form: {
        id_cao: '',
        data_inicio: '',
        data_fim: '',
        observacoes: ''
      },
      diasOcupados: [],
      mensagem: '',
      erro: '',
      anoAtual: hoje.getFullYear(),
      mesAtual: hoje.getMonth()
    };
  },
  async mounted() {
    const id = localStorage.getItem('id_utilizador');
    if (!id) {
      this.erro = "Utilizador não autenticado.";
      return;
    }

    try {
      const resCaes = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/caes/${id}`);
      this.caes = resCaes.data;

      for (let i = 0; i < 3; i++) {
        const ano = this.anoDeMes(this.mesAtual + i);
        const mes = this.mesReal(this.mesAtual + i);
        await this.carregarOcupados(ano, mes);
      }
    } catch {
      this.erro = "Erro ao carregar os dados necessários.";
    }
  },
  methods: {
    async carregarOcupados(ano, mes) {
      try {
        const res = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/calendario/ocupacoes`, {
          params: { ano, mes }
        });
        this.diasOcupados.push(...res.data);
      } catch {
        console.error("Erro ao carregar dias ocupados");
      }
    },
    diasDoMes(mesIndex) {
      const ano = this.anoDeMes(mesIndex);
      const mes = this.mesReal(mesIndex);
      const totalDias = new Date(ano, mes, 0).getDate();
      const dias = [];
      for (let d = 1; d <= totalDias; d++) {
        dias.push(new Date(ano, mes - 1, d));
      }
      return dias;
    },
    nomeDoMes(index) {
      const nomes = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
      return nomes[this.mesReal(index) - 1];
    },
    mesReal(index) {
      return ((index % 12) + 1);
    },
    anoDeMes(index) {
      return this.anoAtual + Math.floor(index / 12);
    },
    isOcupado(data) {
      return this.diasOcupados.includes(data.toISOString().split('T')[0]);
    },
    async submeterReserva() {
      this.mensagem = '';
      this.erro = '';

      const id_utilizador = localStorage.getItem('id_utilizador');
      const { id_cao, data_inicio, data_fim, observacoes } = this.form;

      if (!id_utilizador || !id_cao || !data_inicio || !data_fim) {
        this.erro = "Todos os campos são obrigatórios.";
        return;
      }

      if (new Date(data_inicio) > new Date(data_fim)) {
        this.erro = "A data de fim deve ser posterior à de início.";
        return;
      }

      // Verificar conflitos
      const atual = new Date(data_inicio);
      const fim = new Date(data_fim);
      const conflitos = [];

      while (atual <= fim) {
        const diaStr = atual.toISOString().split('T')[0];
        if (this.diasOcupados.includes(diaStr)) conflitos.push(diaStr);
        atual.setDate(atual.getDate() + 1);
      }

      if (conflitos.length > 0) {
        this.erro = `As seguintes datas estão ocupadas: ${conflitos.join(', ')}`;
        return;
      }

      try {
        await axios.post(`${process.env.VUE_APP_BACKEND_URL}/reservas/criar`, {
          id_utilizador,
          id_cao,
          data_inicio,
          data_fim,
          observacoes
        });

        this.mensagem = "Reserva submetida com sucesso!";
        this.form = { id_cao: '', data_inicio: '', data_fim: '', observacoes: '' };
      } catch (err) {
        this.erro = "Erro ao submeter reserva: " + (err.response?.data?.message || err.message);
      }
    }
  }
};
</script>

<style scoped>
.reservar {
  min-height: 80vh;
  padding: 20px;
  margin: 20px auto;
  background-color: #fefae0;
  color: #2e2e2e;
}

.page-title {
  color: #4ecdc4;
  font-weight: 700;
  font-size: 2.2rem;
}

.mes-titulo {
  font-weight: 600;
  color: #ff914d;
}

.calendario-bloco {
  background-color: #fff;
  border: 1px solid #ccc;
}

.dia-calendario {
  width: 32px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
}

.ocupado {
  background-color: #ffd4d4;
  color: #a10000;
  border: 1px solid #a10000;
}

.livre {
  background-color: #d4edda;
  border: 1px solid #28a745;
}

.btn-reserva {
  background-color: #ff914d;
  color: white;
  border: none;
  padding: 10px 30px;
  font-weight: bold;
  border-radius: 6px;
  transition: background-color 0.2s ease;
}
.btn-reserva:hover {
  background-color: #fa7a2f;
}
</style>
