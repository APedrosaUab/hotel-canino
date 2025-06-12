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
          <div class="contact-box p-4 rounded h-100">
            <h4 class="section-title mb-3">📍 Informações de Contacto</h4>
            <p><strong>Morada:</strong><br />Rua do Cão Feliz, 123, 4000-000 Porto</p>
            <p><strong>Email:</strong><br /><a href="mailto:geral@hotelcanino.pt">geral@hotelcanino.pt</a></p>
            <p><strong>Telefone:</strong><br /><a href="tel:+351912345678">+351 912 345 678</a></p>
            <p><strong>Horário:</strong><br />Segunda a Domingo, 08h00 - 19h00</p>
          </div>
        </div>

        <!-- Formulário -->
        <div class="col-md-6 mb-4">
          <div class="contact-box p-4 rounded h-100">
            <h4 class="section-title mb-3">📬 Envie-nos uma Mensagem</h4>
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

      <!-- Mapa -->
      <div class="mt-5">
        <h4 class="section-title text-center mb-3">📌 Localização</h4>
        <div class="map-container rounded shadow-sm">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3111.353037722872!2d-8.611003684657596!3d41.14961007928621!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd2464e7d03fb39f%3A0xa93ff4bd8ac1cc0f!2sPorto!5e0!3m2!1spt-PT!2spt!4v1718025940000!5m2!1spt-PT!2spt"
            width="100%"
            height="300"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
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
  background-color: #f9f7ef;
  color: #2e2e2e;
}

.painel-contactos {
  background-color: #ffffff;
  border-radius: 12px;
}

.page-title {
  color: #2a7f87;
  font-weight: 700;
  font-size: 2.2rem;
}

.section-title {
  color: #2a7f87;
  font-weight: 700;
  font-size: 1.25rem;
}

.contact-box {
  background-color: #fdf8ec;
  border: 1px solid #e5e3dc;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease-in-out;
}

.contact-box:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.08);
}

a {
  color: #b86403;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

/* Mapa */
.map-container {
  overflow: hidden;
  border-radius: 10px;
  border: 1px solid #e0ded9;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}
</style>
