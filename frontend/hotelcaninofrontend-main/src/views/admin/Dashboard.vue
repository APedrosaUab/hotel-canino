<template>
  <section class="admin-dashboard py-5">
    <div class="container painel-admin p-4 p-md-5 rounded shadow-lg">
      <h1 class="page-title text-center mb-5">Painel de Administração</h1>

      <!-- Estatísticas Rápidas -->
      <div class="row text-center mb-5 gx-4 gy-4">
        <div class="col-6 col-md-3" v-for="stat in stats" :key="stat.label">
          <div class="stat-card d-flex flex-column align-items-center justify-content-center p-4 rounded shadow-sm">
            <h2 class="stat-value mb-2">{{ stat.value }}</h2>
            <p class="stat-label mb-0">{{ stat.label }}</p>
          </div>
        </div>
      </div>

      <p class="text-center lead mb-5">
        Bem‑vindo à área administrativa do Hotel Canino. Utilize as secções abaixo para gerir o sistema.
      </p>

      <!-- Cartões de Ação -->
      <div class="row g-4">
        <div class="col-12 col-md-4" v-for="card in cards" :key="card.title">
          <div class="card h-100 border-0 shadow-sm admin-card">
            <div class="card-body d-flex flex-column justify-content-between">
              <div>
                <h4 class="card-title destaque mb-3">{{ card.title }}</h4>
                <p class="card-text text-muted">{{ card.description }}</p>
              </div>
              <router-link :to="card.link" class="btn-admin mt-4 w-100">
                {{ card.buttonText }}
              </router-link>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AdminDashboard',
  data() {
    return {
      stats: [],
      cards: [
        { title: 'Gestão de Reservas', description: 'Visualizar, editar e remover reservas', link: '/admin/reservas', buttonText: 'Gerir Reservas' },
        { title: 'Gestão de Utilizadores', description: 'Ver lista de utilizadores e permissões', link: '/admin/utilizadores', buttonText: 'Gerir Utilizadores' },
        { title: 'Gestão de Conteúdos', description: 'Editar conteúdos do site', link: '/admin/conteudos', buttonText: 'Gerir Conteúdos' }
      ]
    };
  },
  async created() {
    try {
      const res = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/admin/stats`);
      this.stats = res.data.stats;
    } catch (err) {
      console.error('Falha ao carregar estatísticas:', err);
    }
  }
};
</script>

<style scoped>
.admin-dashboard { background-color: #f9f7ef; color: #2e2e2e; }
.painel-admin { background: #fff; border-radius: 12px; }
.page-title { color: #2a7f87; font-weight: 700; font-size: 2.4rem; }

/* Estatísticas */
.stat-card { background: #e8f7f5; border: 1px solid #d1efeb; }
.stat-value { font-size: 2rem; color: #1abc9c; margin: 0; }
.stat-label { font-size: 1rem; color: #555; text-transform: uppercase; }

/* Cartões de Ação */
.destaque { color: #ff914d; font-weight: 600; }
.admin-card { background: #ffffff; border: 1px solid #e2e2e2; transition: transform 0.2s ease, box-shadow 0.2s ease; }
.admin-card:hover { transform: translateY(-5px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
.btn-admin { background: #ff914d; color: #fff; padding: 12px; font-weight: bold; border-radius: 6px; text-align: center; }
.btn-admin:hover { background: #fa7a2f; }
.card-text { font-size: 0.95rem; }

@media (max-width: 768px) {
  .page-title { font-size: 2rem; }
  .stat-value { font-size: 1.5rem; }
}
</style>
