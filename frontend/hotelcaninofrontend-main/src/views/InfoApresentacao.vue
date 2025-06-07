<template>
  <div class="info-apresentacao container">
    <h1 class="page-title text-center mb-5">Apresentação do Hotel Canino</h1>

    <!-- Bloco 1 -->
    <div class="row align-items-center mb-5">
      <div class="col-md-6">
        <img src="@/assets/images/apresentacao/apresentacao1.png" alt="Receção calorosa" class="img-fluid rounded shadow" />
      </div>
      <div class="col-md-6">
        <h4 class="section-subtitle">Receção Calorosa e Amigável</h4>
        <p>
          No nosso Hotel Canino, cada hóspede é recebido com carinho desde o primeiro momento. Ao chegar, o seu cão passa por uma breve avaliação de comportamento e saúde, permitindo-nos personalizar a sua estadia. A nossa equipa dedica tempo a conhecer as preferências alimentares, rotinas de passeio e hábitos de descanso de cada animal. Assim, garantimos uma transição tranquila e sem stress, criando um ambiente familiar onde todos se sentem confortáveis e seguros.
        </p>
      </div>
    </div>

    <!-- Bloco 2 -->
    <div class="row align-items-center mb-5 flex-md-row-reverse">
      <div class="col-md-6">
        <img src="@/assets/images/apresentacao/apresentacao2.png" alt="Cuidados personalizados" class="img-fluid rounded shadow" />
      </div>
      <div class="col-md-6">
        <h4 class="section-subtitle">Cuidados Personalizados</h4>
        <p>
          Oferecemos um programa de cuidados adaptado às necessidades individuais do seu cão: desde planos de alimentação específicos e administração de medicamentos, até atividades de estimulação mental e física. O nosso staff coordena passeios diários, exercícios de obediência e sessões de relaxamento. Cada rotina é monitorizada e ajustada com base no comportamento e no bem-estar do animal, garantindo que recebe atenção dedicada e a melhor experiência possível.
        </p>
      </div>
    </div>

    <!-- Bloco 3 -->
    <div class="row align-items-center mb-5">
      <div class="col-md-6">
        <img src="@/assets/images/apresentacao/apresentacao3.png" alt="Equipa profissional" class="img-fluid rounded shadow" />
      </div>
      <div class="col-md-6">
        <h4 class="section-subtitle">Equipa Profissional e Dedicada</h4>
        <p>
          A nossa equipa reúne treinadores certificados, técnicos de comportamento e cuidadores experientes, todos apaixonados por cães. Realizamos formações contínuas em primeiros socorros e técnicas de socialização, além de manter parcerias com veterinários de referência para garantir assistência imediata. O foco está sempre no bem-estar emocional e físico dos nossos hóspedes, com protocolos rigorosos de higiene, segurança e supervisão 24/7.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoApresentacao'
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

.page-title {
  color: #4ecdc4;
  font-weight: 700;
  font-size: 2.6rem;
}

.section-subtitle {
  color: #333333;
  font-weight: 600;
  font-size: 1.4rem;
  margin-bottom: 12px;
  border-left: 5px solid #ffe66d;
  padding-left: 12px;
}

p {
  font-size: 1.05rem;
  line-height: 1.7;
  margin-top: 10px;
}

.img-fluid {
  width: 100%;
  max-height: 320px;
  object-fit: cover;
  border: 1px solid #ddd;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

@media (max-width: 767px) {
  .page-title {
    font-size: 2.1rem;
  }
  .section-subtitle {
    font-size: 1.2rem;
  }
  .img-fluid {
    max-height: 240px;
    margin-bottom: 1rem;
  }
  p {
    font-size: 1rem;
  }
}
</style>
