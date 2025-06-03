<template>
  <div class="gestao-conteudos py-5">
    <div class="container painel-conteudos p-5 rounded shadow">
      <h1 class="page-title text-center mb-4">📝 Gestão de Conteúdos</h1>

      <p class="text-center mb-4">
        Atualize as informações dos conteúdos do Hotel Canino.
      </p>

      <div class="text-end mb-4">
        <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#conteudoModal" @click="abrirCriacao">
          + Criar Conteúdo
        </button>
      </div>

      <table v-if="conteudos.length" class="table table-bordered bg-white text-dark shadow-sm">
        <thead class="table-warning text-dark text-center">
          <tr>
            <th>Título</th>
            <th>Tipo</th>
            <th>Última Atualização</th>
            <th class="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="c in conteudos" :key="c._id">
            <td>{{ c.titulo || '—' }}</td>
            <td>{{ formatarTipo(c.tipo) || '—' }}</td>
            <td>{{ formatDate(c.atualizadoEm) }}</td>
            <td class="text-center">
              <button
                class="btn btn-sm btn-outline-warning m-1"
                data-bs-toggle="modal"
                data-bs-target="#conteudoModal"
                @click="abrirEdicao(c)"
              >
                Editar
              </button>
              <button class="btn btn-sm btn-outline-danger" @click="eliminar(c._id)" :disabled="isPrimeiro(c)">
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="erro" class="alert alert-danger mt-3 text-center">{{ erro }}</div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="conteudoModal" tabindex="-1">
      <div class="modal-dialog modal-xl">
        <div class="modal-content text-dark bg-light">
          <div class="modal-header">
            <h5 class="modal-title">{{ modo === 'editar' ? 'Editar Conteúdo' : 'Criar Conteúdo' }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <form @submit.prevent="submeter">
            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label">Título</label>
                <input v-model="form.titulo" class="form-control" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Tipo</label>
                <select v-model="form.tipo" class="form-select" :disabled="modo === 'editar'" required>
                  <option disabled value="">Selecione um tipo</option>
                  <option value="apresentacao">Apresentação</option>
                  <option disabled value="instalacoes">Instalações</option>
                  <option disabled value="servicos">Serviços</option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label">Corpo</label>
                <textarea v-model="form.corpo" class="form-control" rows="8" required></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="submit" class="btn btn-primary">
                {{ modo === 'editar' ? 'Guardar Alterações' : 'Criar' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import * as bootstrap from 'bootstrap';

export default {
  name: 'GestaoConteudos',
  data() {
    return {
      conteudos: [],
      erro: '',
      modo: 'criar',
      form: {
        titulo: '',
        tipo: '',
        corpo: ''
      },
      conteudoAtualId: null
    };
  },
  mounted() {
    this.carregarConteudos();
  },
  methods: {
    async carregarConteudos() {
      try {
        const res = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/conteudos`);
        this.conteudos = Array.isArray(res.data) ? res.data : [];
      } catch (err) {
        this.erro = 'Erro ao carregar conteúdos.';
      }
    },
    formatarTipo(tipo) {
      const map = {
        apresentacao: 'Apresentação',
        instalacoes: 'Instalações',
        servicos: 'Serviços'
      };
      return map[tipo] || tipo;
    },
    formatDate(data) {
      return data ? new Date(data).toLocaleDateString('pt-PT') : '—';
    },
    abrirCriacao() {
      this.modo = 'criar';
      this.form = {
        titulo: '',
        tipo: '',
        corpo: ''
      };
      this.erro = '';
      this.conteudoAtualId = null;
    },
    abrirEdicao(c) {
      this.modo = 'editar';
      this.form = {
        titulo: c.titulo,
        tipo: c.tipo,
        corpo: c.corpo
      };
      this.erro = '';
      this.conteudoAtualId = c._id;
    },
    async submeter() {
      try {
        let res;
        if (this.modo === 'editar' && this.conteudoAtualId) {
          res = await axios.put(`${process.env.VUE_APP_BACKEND_URL}/conteudos/${this.conteudoAtualId}`, this.form);
          const index = this.conteudos.findIndex(c => c._id === this.conteudoAtualId);
          if (index !== -1) this.conteudos[index] = res.data.conteudo;
        } else {
          res = await axios.post(`${process.env.VUE_APP_BACKEND_URL}/conteudos`, this.form);
          this.conteudos.push(res.data.conteudo);
        }
        this.erro = '';
        const modalEl = document.getElementById('conteudoModal');
        const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
        modal.hide();
      } catch (err) {
        this.erro = err.response?.data?.message || 'Erro ao guardar conteúdo.';
      }
    },
    isPrimeiro(c) {
      return this.conteudos.length && this.conteudos[0]._id === c._id;
    },
    async eliminar(id) {
      if (!confirm('Tem a certeza que deseja eliminar este conteúdo?')) return;
      try {
        await axios.delete(`${process.env.VUE_APP_BACKEND_URL}/conteudos/${id}`);
        this.conteudos = this.conteudos.filter(c => c._id !== id);
      } catch {
        this.erro = 'Erro ao eliminar o conteúdo.';
      }
    }
  }
};
</script>

<style scoped>
.gestao-conteudos {
  min-height: 100vh;
  background-color: #fefae0;
  color: #2e2e2e;
}

.painel-conteudos {
  background-color: #ffffff;
  border-radius: 12px;
}

.page-title {
  color: #4ecdc4;
  font-weight: 700;
  font-size: 2.2rem;
}
</style>
