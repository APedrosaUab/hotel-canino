<template>
  <div class="pc-precos container">
    <h1 class="page-title text-center mb-4">Opções e Preços</h1>

    <p class="lead text-center mb-5">
      Serviços cuidadosamente planeados para oferecer conforto e segurança ao seu cão, com tarifas claras e sem surpresas.
    </p>

    <div class="row">
      <!-- Alojamento Diário -->
      <div class="col-md-6 mb-4">
        <div class="card h-100 shadow-sm border-accent">
          <div class="card-body">
            <h4 class="card-title text-accent">Alojamento Diário</h4>
            <p class="card-text">
              O seu cão terá o próprio espaço com cama ergonómica, manta macia e água fresca disponível 24/7. Inclui três refeições personalizadas e um passeio supervisionado por dia, para garantir bem-estar físico e mental.
            </p>
          </div>
          <div class="card-footer text-center bg-accent-light">
            <span class="price text-accent">15€</span> <small>/ dia</small>
          </div>
        </div>
      </div>

      <!-- Alojamento Semanal -->
      <div class="col-md-6 mb-4">
        <div class="card h-100 shadow-sm border-accent">
          <div class="card-body">
            <h4 class="card-title text-accent">Alojamento Semanal</h4>
            <p class="card-text">
              Ideal para férias prolongadas: desconto especial em estadia contínua. Inclui atividades diárias de enriquecimento, sessões de brincadeira em grupo e relatório fotográfico semanal para que se sinta sempre perto.
            </p>
          </div>
          <div class="card-footer text-center bg-accent-light">
            <span class="price text-accent">90€</span> <small>/ semana</small>
          </div>
        </div>
      </div>

      <!-- Banho e Secagem -->
      <div class="col-md-6 mb-4">
        <div class="card h-100 shadow-sm border-accent">
          <div class="card-body">
            <h4 class="card-title text-accent">Banho & Secagem</h4>
            <p class="card-text">
              Tratamento completo com xampu hipoalergénico, massagem de relaxamento e secagem a jato suave. Inclui limpeza de orelhas e corte de unhas, para um acabamento impecável e saudável.
            </p>
          </div>
          <div class="card-footer text-center bg-accent-light">
            <span class="price text-accent">18€</span>
          </div>
        </div>
      </div>

      <!-- Tosquia -->
      <div class="col-md-6 mb-4">
        <div class="card h-100 shadow-sm border-accent">
          <div class="card-body">
            <h4 class="card-title text-accent">Tosquia Personalizada</h4>
            <p class="card-text">
              Corte e modelagem adaptados à raça e ao estilo desejado. Utilizamos tesouras profissionais e máquinas silenciosas, garantindo conforto e precisão em cada contorno.
            </p>
          </div>
          <div class="card-footer text-center bg-accent-light">
            <span class="price text-accent">25€</span>
          </div>
        </div>
      </div>

      <!-- Transporte -->
      <div class="col-md-6 mb-4">
        <div class="card h-100 shadow-sm border-accent">
          <div class="card-body">
            <h4 class="card-title text-accent">Transporte Porta a Porta</h4>
            <p class="card-text">
              Viatura climatizada e adaptada com cinto de segurança para cães, para recolha e entrega até 15 km. Serviço ideal para dar tranquilidade ao tutor e segurança ao seu amigo de quatro patas.
            </p>
          </div>
          <div class="card-footer text-center bg-accent-light">
            <span class="price text-accent">10€</span>
          </div>
        </div>
      </div>
    </div>

    <p class="mt-4 text-center text-note">
      <strong>Nota:</strong> Todos os preços incluem IVA. Para pacotes personalizados ou serviços adicionais (como alimentação terapêutica), entre em contacto connosco para um orçamento à medida.
    </p>
  </div>
</template>

<script>
export default {
  name: 'PCPrecos'
};
</script>

<style scoped>
.pc-precos {
  min-height: 80vh;
  padding: 20px;
  margin: 20px auto;
  background-color: #fefae0;
  color: #2e2e2e;
}

.page-title {
  color: #4ecdc4;
  font-weight: 700;
  font-size: 2.4rem;
}

.card {
  border: none;
  border-radius: 8px;
}

.border-accent {
  border: 2px solid #4ecdc4 !important;
}

.card-body {
  padding: 1.5rem;
}

.card-footer {
  padding: 0.75rem;
}

.text-accent {
  color: #4ecdc4;
}

.bg-accent-light {
  background-color: rgba(78, 205, 196, 0.1);
}

.price {
  font-size: 1.5rem;
  font-weight: 700;
}

.text-note {
  font-size: 0.95rem;
  color: #444;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
}
</style>
