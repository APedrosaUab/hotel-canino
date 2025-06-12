<template>
  <div class="calendario-page container">
    <h1 class="page-title text-center mb-5">Calendário de Disponibilidade</h1>

    <div class="d-flex justify-content-between align-items-center mb-4">
      <button class="btn-calendario" @click="mudarMes(-1)">← Mês anterior</button>
      <h5 class="mes-atual m-0">{{ nomeDoMes }} {{ anoAtual }}</h5>
      <button class="btn-calendario" @click="mudarMes(1)">Próximo mês →</button>
    </div>

    <div v-if="erro" class="alert alert-danger text-center">{{ erro }}</div>

    <div class="calendar-grid mb-5 p-4 rounded bg-light shadow">
      <div
        v-for="(dia, index) in diasDoMes"
        :key="index"
        class="day border"
        :class="{ ocupado: isOcupado(dia), livre: !isOcupado(dia) }"
      >
        {{ dia.getDate() }}
      </div>
    </div>

    <div class="legenda text-center">
      <span class="box ocupado me-2"></span> Ocupado
      <span class="box livre ms-4"></span> Disponível
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'DRCalendario',
  data() {
    const hoje = new Date();
    return {
      anoAtual: hoje.getFullYear(),
      mesAtual: hoje.getMonth(),
      diasDoMes: [],
      datasOcupadas: [],
      erro: ''
    };
  },
  computed: {
    nomeDoMes() {
      const nomes = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
      return nomes[this.mesAtual];
    }
  },
  mounted() {
    this.atualizarCalendario();
  },
  methods: {
    mudarMes(direcao) {
      this.mesAtual += direcao;
      if (this.mesAtual < 0) {
        this.mesAtual = 11;
        this.anoAtual -= 1;
      } else if (this.mesAtual > 11) {
        this.mesAtual = 0;
        this.anoAtual += 1;
      }
      this.atualizarCalendario();
    },
    gerarDiasDoMes() {
      const totalDias = new Date(this.anoAtual, this.mesAtual + 1, 0).getDate();
      const dias = [];
      for (let d = 1; d <= totalDias; d++) {
        dias.push(new Date(this.anoAtual, this.mesAtual, d));
      }
      this.diasDoMes = dias;
    },
    async carregarOcupacoes() {
      try {
        const res = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/calendario/ocupacoes`, {
          params: { ano: this.anoAtual, mes: this.mesAtual + 1 }
        });
        this.datasOcupadas = res.data;
      } catch (err) {
        this.erro = "Erro ao carregar os dias ocupados.";
        console.error(err);
      }
    },
    async atualizarCalendario() {
      this.gerarDiasDoMes();
      await this.carregarOcupacoes();
    },
    isOcupado(dia) {
      const diaStr = dia.toISOString().split('T')[0];
      return this.datasOcupadas.includes(diaStr);
    }
  }
};
</script>

<style scoped>
.calendario-page {
  min-height: 80vh;
  padding: 20px;
  background-color: #f9f7ef;
  color: #2e2e2e;
}

.page-title {
  color: #2a7f87;
  font-weight: 700;
  font-size: 2.4rem;
}

.btn-calendario {
  background-color: #2a7f87;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 6px;
  font-weight: 600;
  transition: background-color 0.2s ease;
}
.btn-calendario:hover {
  background-color: #246b76;
}

.mes-atual {
  font-size: 1.4rem;
  font-weight: 600;
  color: #444;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 12px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
}

.day {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  transition: transform 0.2s;
}

.day:hover {
  transform: scale(1.05);
  cursor: default;
}

.day.livre {
  background-color: #e3f7e3;
  border: 1px solid #85c88a;
  color: #2e7d32;
}

.day.ocupado {
  background-color: #fbe0e0;
  border: 1px solid #e57373;
  color: #c62828;
}

.legenda {
  font-weight: 500;
  margin-top: 10px;
}

.box {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  margin-right: 5px;
  vertical-align: middle;
}

.box.ocupado {
  background-color: #fbe0e0;
  border: 1px solid #e57373;
}

.box.livre {
  background-color: #e3f7e3;
  border: 1px solid #85c88a;
}

@media (max-width: 768px) {
  .day {
    height: 45px;
    font-size: 0.9rem;
  }
  .page-title {
    font-size: 2rem;
  }
}
</style>
