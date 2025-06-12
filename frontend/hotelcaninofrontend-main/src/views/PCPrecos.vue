<template>
  <div class="pc-precos container">
    <h1 class="page-title text-center mb-4">Opções e Preços</h1>

    <p class="lead text-center mb-5">
      Serviços cuidadosamente planeados para oferecer conforto e segurança ao seu cão, com tarifas claras e sem surpresas.
    </p>

    <div class="row">
      <!-- Alojamento Diário -->
      <div class="col-md-6 mb-4">
        <div class="card-preco h-100">
          <div class="card-body">
            <h4 class="card-title">Alojamento Diário</h4>
            <p class="card-text">
              O seu cão terá o próprio espaço com cama ergonómica, manta macia e água fresca disponível 24/7. Inclui três refeições personalizadas e um passeio supervisionado por dia, para garantir bem-estar físico e mental.
            </p>
          </div>
          <div class="card-footer">
            <span class="price">15€</span> <small>/ dia</small>
          </div>
        </div>
      </div>

      <!-- Alojamento Semanal -->
      <div class="col-md-6 mb-4">
        <div class="card-preco h-100">
          <div class="card-body">
            <h4 class="card-title">Alojamento Semanal</h4>
            <p class="card-text">
              Ideal para férias prolongadas: desconto especial em estadia contínua. Inclui atividades diárias de enriquecimento, sessões de brincadeira em grupo e relatório fotográfico semanal para que se sinta sempre perto.
            </p>
          </div>
          <div class="card-footer">
            <span class="price">90€</span> <small>/ semana</small>
          </div>
        </div>
      </div>

      <!-- Banho e Secagem -->
      <div class="col-md-6 mb-4">
        <div class="card-preco h-100">
          <div class="card-body">
            <h4 class="card-title">Banho & Secagem</h4>
            <p class="card-text">
              Tratamento completo com xampu hipoalergénico, massagem de relaxamento e secagem a jato suave. Inclui limpeza de orelhas e corte de unhas, para um acabamento impecável e saudável.
            </p>
          </div>
          <div class="card-footer">
            <span class="price">18€</span>
          </div>
        </div>
      </div>

      <!-- Tosquia -->
      <div class="col-md-6 mb-4">
        <div class="card-preco h-100">
          <div class="card-body">
            <h4 class="card-title">Tosquia Personalizada</h4>
            <p class="card-text">
              Corte e modelagem adaptados à raça e ao estilo desejado. Utilizamos tesouras profissionais e máquinas silenciosas, garantindo conforto e precisão em cada contorno.
            </p>
          </div>
          <div class="card-footer">
            <span class="price">25€</span>
          </div>
        </div>
      </div>

      <!-- Transporte -->
      <div class="col-md-6 mb-4">
        <div class="card-preco h-100">
          <div class="card-body">
            <h4 class="card-title">Transporte Porta a Porta</h4>
            <p class="card-text">
              Viatura climatizada e adaptada com cinto de segurança para cães, para recolha e entrega até 15 km. Serviço ideal para dar tranquilidade ao tutor e segurança ao seu amigo de quatro patas.
            </p>
          </div>
          <div class="card-footer">
            <span class="price">10€</span>
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
  background-color: #f9f7ef;
  color: #2e2e2e;
}

.page-title {
  color: #2a7f87;
  font-weight: 700;
  font-size: 2.4rem;
}

/* CARTÕES DE PREÇOS */
.card-preco {
  background-color: #fdf8ec;
  border: 2px solid #d4a373;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-preco:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.1);
}

.card-preco .card-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #2a7f87;
  margin-bottom: 0.75rem;
}

.card-preco .card-text {
  font-size: 1rem;
  line-height: 1.6;
}

.card-preco .card-footer {
  margin-top: 1rem;
  text-align: center;
  background-color: #faedcd;
  border-radius: 8px;
  padding: 0.75rem;
  font-weight: 600;
  color: #2a7f87;
}

.price {
  font-size: 1.6rem;
  font-weight: 700;
  color: #b86403;
}

.text-note {
  font-size: 0.95rem;
  color: #444;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .card-preco {
    padding: 1.25rem;
  }
}
</style>
