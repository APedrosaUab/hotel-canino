<template>
  <div class="info-apresentacao container">
    <h1 class="page-title text-center mb-5">Apresentação</h1>

    <div v-for="c in conteudos" :key="c._id" class="conteudo-bloco mb-5">
      <h3 class="section-title">{{ c.titulo }}</h3>
      <div class="conteudo-corpo" v-html="c.corpo"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'InfoApresentacao',
  data() {
    return {
      conteudos: []
    };
  },
  async mounted() {
    try {
      const res = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/conteudos/tipo/apresentacao`);
      this.conteudos = Array.isArray(res.data) ? res.data : [res.data];
    } catch (error) {
      console.error('Erro ao carregar conteúdos da apresentação:', error);
    }
  }
};
</script>

<style scoped>
.info-apresentacao {
    min-height: 80vh;
    padding: 20px;
    margin: 20px auto;
    background-color: #fefae0;
    color: #2e2e2e;
}

/* Título principal */
.page-title {
  color: #4ecdc4;
  font-weight: 700;
  font-size: 2.6rem;
}

/* Bloco de cada conteúdo */
.conteudo-bloco {
  margin-bottom: 40px;
}

/* Título de cada secção */
.section-title {
  color: #333333;
  font-weight: 600;
  font-size: 1.5rem;
  margin-bottom: 16px;
  padding-left: 14px;
  border-left: 6px solid #ffe66d;
}

/* Corpo do conteúdo */
.conteudo-corpo {
  background-color: #ffffff;
  padding: 24px;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  font-size: 1.05rem;
  line-height: 1.75;
  color: #2e2e2e;
}

/* Prevenir estilos internos prejudiciais (v-html) */
.conteudo-corpo * {
  color: inherit !important;
}

/* Responsivo */
@media screen and (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .section-title {
    font-size: 1.25rem;
  }

  .conteudo-corpo {
    font-size: 1rem;
    padding: 18px;
  }
}
</style>
