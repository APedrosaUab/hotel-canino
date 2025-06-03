<template>
  <div class="contactos py-5">
    <div class="container painel-contactos p-5 rounded shadow">
      <h1 class="page-title text-center mb-4">📞 Contacte-nos</h1>

      <p class="lead text-center mb-5">
        Estamos disponíveis para esclarecer todas as suas dúvidas ou agendar uma visita ao nosso Hotel Canino.
      </p>

      <div class="row">
        <!-- Contactos -->
        <div class="col-md-6 mb-4">
          <div class="p-4 rounded bg-info-subtle border border-info-subtle h-100">
            <h4 class="text-primary mb-3">📍 Informações de Contacto</h4>
            <p><strong>Morada:</strong><br />Rua do Cão Feliz, 123, 4000-000 Porto</p>
            <p><strong>Email:</strong><br /><a href="mailto:geral@hotelcanino.pt">geral@hotelcanino.pt</a></p>
            <p><strong>Telefone:</strong><br /><a href="tel:+351912345678">+351 912 345 678</a></p>
            <p><strong>Horário:</strong><br />Segunda a Domingo, 08h00 - 19h00</p>
          </div>
        </div>

        <!-- Formulário -->
        <div class="col-md-6 mb-4">
          <div class="p-4 rounded bg-light border border-secondary-subtle h-100">
            <h4 class="text-primary mb-3">📬 Envie-nos uma Mensagem</h4>
            <form @submit.prevent="enviarFormulario">
              <div class="mb-3">
                <label for="nome" class="form-label">Nome</label>
                <input v-model="form.nome" type="text" class="form-control" id="nome" required />
              </div>

              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input v-model="form.email" type="email" class="form-control" id="email" required />
              </div>

              <div class="mb-3">
                <label for="mensagem" class="form-label">Mensagem</label>
                <textarea v-model="form.mensagem" class="form-control" id="mensagem" rows="4" required></textarea>
              </div>

              <button type="submit" class="btn btn-warning w-100">Enviar Mensagem</button>
              <p v-if="mensagemSucesso" class="text-success mt-3">{{ mensagemSucesso }}</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Contactos",
  data() {
    return {
      form: {
        nome: '',
        email: '',
        mensagem: ''
      },
      mensagemSucesso: ''
    };
  },
  methods: {
    enviarFormulario() {
      this.mensagemSucesso = "Mensagem enviada com sucesso! Entraremos em contacto em breve.";
      this.form = { nome: '', email: '', mensagem: '' };
    }
  }
};
</script>

<style scoped>
.contactos {
  min-height: 100vh;
  background-color: #fefae0;
  color: #2e2e2e;
}

.painel-contactos {
  background-color: #ffffff;
  border-radius: 12px;
}

.page-title {
  color: #4ecdc4;
  font-weight: 700;
  font-size: 2.2rem;
}

a {
  color: #e77c00;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
