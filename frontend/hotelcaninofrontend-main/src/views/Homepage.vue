<template>
  <div class="info-homepage container">
    <h1 class="page-title text-center mb-5">Bem-vindos ao Hotel Canino</h1>

    <div v-if="isLoading" class="text-center">
      <p>Carregando conteúdos...</p>
    </div>
    <div v-else>
      <div v-if="error" class="alert alert-danger" role="alert">
        {{ error }}
      </div>
      <div v-else-if="!conteudos.length" class="text-center">
        <p>Ainda não há novidades. Volte mais tarde!</p>
      </div>
      <div v-else class="row">
        <div v-for="c in conteudos" :key="c._id" class="col-lg-4 col-md-6 mb-4">
          <article class="conteudo-bloco" role="article">
            <header>
              <h3 class="section-title">
                {{ c.titulo }}
                <span :class="['badge', badgeClass(c.tipo)]">{{ c.tipo }}</span>
              </h3>
            </header>
            <div class="conteudo-corpo">
              <p>{{ truncateText(stripHtml(c.corpo), 150) }}</p>
              <button class="btn btn-link p-0" @click="openModal(c)">Leia mais</button>
            </div>
          </article>
        </div>
      </div>
    </div>

    <!-- Modal de detalhe -->
    <div v-if="showModal" class="modal-backdrop" @click="closeModal">
      <div class="modal-content p-4" @click.stop>
        <h4>{{ modalContent.titulo }}</h4>
        <div v-html="modalContent.corpo"></div>
        <button class="btn btn-secondary mt-3" @click="closeModal">Fechar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Homepage',
  data() {
    return {
      conteudos: [],
      isLoading: true,
      error: null,
      showModal: false,
      modalContent: {}
    };
  },
  methods: {
    badgeClass(tipo) {
      switch (tipo) {
        case 'Eventos':   return 'badge-primary';
        case 'Notícias':  return 'badge-success';
        case 'Promoções': return 'badge-warning';
        default:          return 'badge-secondary';
      }
    },
    stripHtml(html) {
      const div = document.createElement('div');
      div.innerHTML = html;
      return div.textContent || div.innerText || '';
    },
    truncateText(text, length) {
      return text.length > length ? text.slice(0, length) + '…' : text;
    },
    openModal(c) {
      this.modalContent = c;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.modalContent = {};
    }
  },
  async mounted() {
    try {
      const res = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/conteudos/homepage`);
      this.conteudos = Array.isArray(res.data) ? res.data : [res.data];
    } catch (err) {
      this.error = 'Não foi possível carregar os conteúdos.';
      console.error(err);
    } finally {
      this.isLoading = false;
    }
  }
};
</script>

<style scoped>
.info-homepage {
  min-height: 80vh;
  padding: 20px;
  margin: 20px auto;
  background-color: #f9f7ef;
  color: #2e2e2e;
}

.page-title {
  color: #2a7f87;
  font-weight: 700;
  font-size: 2.6rem;
}

.conteudo-bloco {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  transition: transform .2s, box-shadow .2s;
}
.conteudo-bloco:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.section-title {
  color: #333333;
  font-weight: 600;
  font-size: 1.4rem;
  margin-bottom: 12px;
  padding-left: 10px;
  border-left: 6px solid #ffe66d;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.badge {
  font-size: 0.85rem;
  padding: 0.25em 0.5em;
}

.badge-primary { background-color: #2a7f87; color: #fff; }
.badge-success { background-color: #2a7f87; color: #fff; }
.badge-warning { background-color: #f1c40f; color: #fff; }
.badge-secondary { background-color: #95a5a6; color: #fff; }

.conteudo-corpo p {
  font-size: 1.05rem;
  line-height: 1.75;
  color: #2e2e2e;
}

.modal-backdrop {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: #fff;
  border-radius: 10px;
  max-width: 600px;
  width: 90%;
}

@media (max-width: 768px) {
  .page-title { font-size: 2rem; }
  .section-title { font-size: 1.2rem; }
  .conteudo-corpo p { font-size: 1rem; }
}
</style>
