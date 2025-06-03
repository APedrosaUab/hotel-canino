<template>
  <div class="calendario-page container">
    <h1 class="page-title text-center mb-4">Calendário de Disponibilidade</h1>

    <div class="d-flex justify-content-between align-items-center mb-4">
      <button class="btn-calendario" @click="mudarMes(-1)">← Mês anterior</button>
      <h5 class="mes-atual m-0">{{ nomeDoMes }} {{ anoAtual }}</h5>
      <button class="btn-calendario" @click="mudarMes(1)">Próximo mês →</button>
    </div>

    <div v-if="erro" class="alert alert-danger text-center">{{ erro }}</div>

    <div class="calendar-grid mb-4">
      <div
        v-for="(dia, index) in diasDoMes"
        :key="index"
        class="day"
        :class="{ ocupado: isOcupado(dia) }"
      >
        {{ dia.getDate() }}
      </div>
    </div>

    <div class="legenda">
      <span class="box ocupado"></span> Ocupado
      <span class="box livre ms-3"></span> Disponível
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
  margin: 20px auto;
  background-color: #fefae0;
  color: #2e2e2e;
}

/* Título */
.page-title {
  color: #4ecdc4;
  font-weight: 700;
  font-size: 2.2rem;
}

/* Botões de navegação */
.btn-calendario {
  background-color: #ff914d;
  border: none;
  color: white;
  padding: 6px 14px;
  font-weight: 600;
  border-radius: 6px;
  transition: background-color 0.2s ease;
}
.btn-calendario:hover {
  background-color: #fa7a2f;
}

/* Nome do mês */
.mes-atual {
  color: #333;
  font-weight: 600;
}

/* Grid do calendário */
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  max-width: 500px;
  margin: 0 auto;
}
.day {
  height: 60px;
  text-align: center;
  line-height: 60px;
  border-radius: 8px;
  font-weight: bold;
  background-color: #d5f8d5;
  border: 2px solid #47b847;
  color: #2e2e2e;
}
.day.ocupado {
  background-color: #ffd4d4;
  border-color: #c0392b;
  color: #a10000;
}

/* Legenda */
.legenda {
  text-align: center;
  font-weight: 500;
}
.box {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 4px;
}
.box.ocupado {
  background-color: #ffd4d4;
  border: 1px solid #a10000;
}
.box.livre {
  background-color: #d5f8d5;
  border: 1px solid #47b847;
}

/* Responsivo */
@media (max-width: 768px) {
  .day {
    height: 45px;
    line-height: 45px;
    font-size: 0.9rem;
  }
  .page-title {
    font-size: 1.8rem;
  }
}
</style>
