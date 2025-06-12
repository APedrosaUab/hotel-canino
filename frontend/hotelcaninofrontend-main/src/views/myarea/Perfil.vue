<template>
  <div class="perfil-page py-5">
    <div class="container painel-perfil p-5 rounded shadow">
      <h1 class="page-title text-center mb-4">👤 Perfil do Utilizador</h1>

      <!-- Mensagens -->
      <div v-if="mensagem" class="alert alert-success text-center">{{ mensagem }}</div>
      <div v-if="erro" class="alert alert-danger text-center">{{ erro }}</div>

      <div class="row">
        <!-- Avatar -->
        <div class="col-md-4 text-center mb-4">
          <img :src="`/assets/images/avatars/${avatarUser}_gd.png`" alt="Avatar" class="avatar-img mb-3" />
          <div v-if="isEditing" class="avatar-selection row justify-content-center">
            <label class="mb-2">Selecionar Avatar:</label>
            <div
              v-for="avatar in avataresDisponiveis"
              :key="avatar"
              class="col-3 avatar-option"
              @click="selectAvatar(avatar)"
            >
              <img
                :src="`/assets/images/avatars/${avatar}.png`"
                :class="{ selected: avatarUser === avatar }"
                class="img-thumbnail"
              />
            </div>
          </div>
        </div>

        <!-- Dados Pessoais -->
        <div class="col-md-8">
          <div class="text-end mb-3">
            <button v-if="!isEditing" class="btn btn-outline-secondary" @click="editProfile">
              Editar Perfil
            </button>
          </div>

          <form @submit.prevent="updateProfile">
            <div class="mb-3">
              <label class="form-label">Username</label>
              <input type="text" class="form-control" :value="username" disabled />
            </div>
            <div class="mb-3">
              <label class="form-label">Nome</label>
              <input v-model="nome" type="text" class="form-control" :disabled="!isEditing" />
            </div>
            <div class="mb-3">
              <label class="form-label">Apelido</label>
              <input v-model="apelido" type="text" class="form-control" :disabled="!isEditing" />
            </div>
            <div class="mb-3">
              <label class="form-label">Data de Nascimento</label>
              <input v-model="dataNascimentoInput" type="date" class="form-control" :disabled="!isEditing" />
            </div>
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input v-model="email" type="email" class="form-control" :disabled="!isEditing" />
            </div>

            <div v-if="isEditing" class="d-flex gap-2">
              <button type="submit" class="btn btn-success">Guardar</button>
              <button type="button" class="btn btn-secondary" @click="cancelEdit">Cancelar</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Gestão de Cães -->
      <hr class="my-5" />
      <h3 class="text-center text-warning mb-4">🐶 Os Meus Cães</h3>

      <form @submit.prevent="adicionarCao" class="row g-3 mb-4 bg-light p-4 rounded">
        <div class="col-md-4">
          <label class="form-label">Nome do Cão</label>
          <input v-model="novoCao.nome" type="text" class="form-control" required />
        </div>
        <div class="col-md-4">
          <label class="form-label">Raça</label>
          <input v-model="novoCao.raca" type="text" class="form-control" required />
        </div>
        <div class="col-md-2">
          <label class="form-label">Idade</label>
          <input v-model="novoCao.idade" type="number" min="0" class="form-control" required />
        </div>
        <div class="col-md-2 d-flex align-items-end">
          <button class="btn btn-warning w-100" type="submit">Adicionar Cão</button>
        </div>
      </form>

      <div v-if="caes.length === 0" class="alert alert-light text-dark">
        Ainda não adicionou nenhum cão.
      </div>

      <ul class="list-group mb-3">
        <li
          class="list-group-item bg-light d-flex justify-content-between align-items-center"
          v-for="cao in caes"
          :key="cao._id"
        >
          <div><strong>{{ cao.nome }}</strong> — {{ cao.raca }}, {{ cao.idade }} ano(s)</div>
        </li>
      </ul>

      <p class="text-muted small">
        Se pretender eliminar ou editar o registo do seu cão da nossa base de dados, por favor entre em contacto.
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Perfil',
  data() {
    return {
      id_utilizador: localStorage.getItem('id_utilizador'),
      nome: '',
      apelido: '',
      username: '',
      dataNascimento: '',
      email: '',
      avatarUser: 1,
      isEditing: false,
      dadosOriginais: {},
      mensagem: '',
      erro: '',
      avataresDisponiveis: [1, 2, 3, 4, 5, 6, 7, 8],
      caes: [],
      novoCao: {
        nome: '',
        raca: '',
        idade: ''
      }
    };
  },
  computed: {
    dataNascimentoInput: {
      get() {
        return this.dataNascimento ? this.dataNascimento.split('T')[0] : '';
      },
      set(value) {
        this.dataNascimento = value;
      }
    }
  },
  mounted() {
    this.carregarDados();
    this.carregarCaes();
  },
  methods: {
    async carregarDados() {
      try {
        const res = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/utilizador/${this.id_utilizador}`);
        Object.assign(this, res.data);
        this.dadosOriginais = { ...res.data };
      } catch {
        this.erro = 'Erro ao carregar os dados do utilizador.';
      }
    },
    async carregarCaes() {
      try {
        const res = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/caes/${this.id_utilizador}`);
        this.caes = res.data;
      } catch {
        this.erro = 'Erro ao carregar os cães.';
      }
    },
    editProfile() {
      this.isEditing = true;
      this.mensagem = '';
      this.erro = '';
    },
    cancelEdit() {
      Object.assign(this, this.dadosOriginais);
      this.isEditing = false;
    },
    selectAvatar(avatar) {
      this.avatarUser = avatar;
    },
    async updateProfile() {
      try {
        await axios.put(`${process.env.VUE_APP_BACKEND_URL}/utilizador/${this.id_utilizador}`, {
          nome: this.nome,
          apelido: this.apelido,
          username: this.username,
          dataNascimento: this.dataNascimento,
          email: this.email,
          avatarUser: this.avatarUser,
        });
        localStorage.setItem('avatarUser', this.avatarUser);
        this.mensagem = 'Perfil atualizado com sucesso.';
        this.isEditing = false;
        this.dadosOriginais = {
          nome: this.nome,
          apelido: this.apelido,
          username: this.username,
          dataNascimento: this.dataNascimento,
          email: this.email,
          avatarUser: this.avatarUser,
        };
      } catch {
        this.erro = 'Erro ao atualizar o perfil.';
      }
    },
    async adicionarCao() {
      try {
        await axios.post(`${process.env.VUE_APP_BACKEND_URL}/caes/adicionar`, {
          ...this.novoCao,
          id_utilizador: this.id_utilizador
        });
        this.mensagem = 'Cão adicionado com sucesso.';
        this.novoCao = { nome: '', raca: '', idade: '' };
        this.carregarCaes();
      } catch {
        this.erro = 'Erro ao adicionar cão.';
      }
    }
  }
};
</script>

<style scoped>
.perfil-page {
  min-height: 100vh;
  background-color: #f9f7ef;
  color: #2e2e2e;
}

.painel-perfil {
  background-color: #ffffff;
  border-radius: 12px;
}

.page-title {
  color: #2a7f87;
  font-weight: 700;
  font-size: 2.2rem;
}

.avatar-img {
  max-width: 150px;
  border-radius: 50%;
  border: 4px solid #ffc107;
}

.avatar-option img {
  cursor: pointer;
  max-width: 60px;
  margin: 4px;
}

.avatar-option img.selected {
  border: 3px solid #ffc107;
}

.form-control:disabled {
  opacity: 0.75;
}
</style>
