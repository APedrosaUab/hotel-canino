<template>
  <div class="admin-dashboard py-5">
    <div class="container painel-admin p-5 rounded shadow">
      <h1 class="page-title text-center mb-4">Painel de Administração</h1>

      <p class="text-center lead mb-5">
        Bem-vindo à área administrativa do Hotel Canino. Escolha uma das opções abaixo para gerir o sistema.
      </p>

      <div class="row g-4">
        <div class="col-md-4" v-for="card in cards" :key="card.title">
          <div class="card h-100 border-0 shadow-sm admin-card">
            <div class="card-body d-flex flex-column justify-content-between">
              <div>
                <h4 class="card-title destaque">{{ card.title }}</h4>
                <p class="card-text">{{ card.description }}</p>
              </div>
              <router-link :to="card.link" class="btn-admin w-100 mt-3">
                {{ card.buttonText }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      cards: [
        {
          title: 'Gestão de Reservas',
          description: 'Visualizar, editar e remover reservas de clientes.',
          link: '/admin/reservas',
          buttonText: 'Gerir Reservas'
        },
        {
          title: 'Gestão de Utilizadores',
          description: 'Ver lista de utilizadores e permissões atribuídas.',
          link: '/admin/utilizadores',
          buttonText: 'Gerir Utilizadores'
        },
        {
          title: 'Gestão de Conteúdos',
          description: 'Editar o conteúdo da apresentação e outras páginas.',
          link: '/admin/conteudos',
          buttonText: 'Gerir Conteúdos'
        }
      ]
    };
  }
};
</script>

<style scoped>
.admin-dashboard {
  min-height: 100vh;
  background-color: #fefae0;
  color: #2e2e2e;
}

.painel-admin {
  background-color: #fff;
  border-radius: 10px;
}

.page-title {
  color: #4ecdc4;
  font-weight: 700;
  font-size: 2.2rem;
}

.destaque {
  color: #ff914d;
  font-weight: 600;
}

.admin-card {
  background-color: #f9f9f9;
  border: 1px solid #e2e2e2;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.admin-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.btn-admin {
  background-color: #ff914d;
  color: white;
  padding: 10px 20px;
  font-weight: bold;
  border-radius: 6px;
  border: none;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.2s ease;
}

.btn-admin:hover {
  background-color: #fa7a2f;
}

.card-title {
  font-size: 1.4rem;
}

.card-text {
  font-size: 0.95rem;
}
</style>
