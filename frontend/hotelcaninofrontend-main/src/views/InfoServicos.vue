<template>
  <div class="info-servicos container">
    <h1 class="page-title text-center mb-5">Serviços Disponíveis</h1>

    <!-- Serviço 1 -->
    <div class="row align-items-center mb-5">
      <div class="col-md-6">
        <img src="@/assets/images/servicos/servico1.png" alt="Alojamento" class="img-fluid rounded shadow-sm" />
      </div>
      <div class="col-md-6">
        <h4 class="section-subtitle">Alojamento Diário e Prolongado</h4>
        <p>
          Garantimos um ambiente seguro e confortável para estadias curtas ou prolongadas. Cada cão tem sua própria box climatizada e equipada com cama ergonômica, manta personalizada e brinquedos de conforto. Oferecemos alimentação de alta qualidade, preparada sob orientação nutricional, e monitorização 24/7 por câmaras e rondas da equipa. Ideal para férias, viagens de trabalho ou situações inesperadas, o seu melhor amigo estará sempre em boas mãos.
        </p>
      </div>
    </div>

    <!-- Serviço 2 -->
    <div class="row align-items-center mb-5 flex-md-row-reverse">
      <div class="col-md-6">
        <img src="@/assets/images/servicos/servico2.png" alt="Banhos e Tosquias" class="img-fluid rounded shadow-sm" />
      </div>
      <div class="col-md-6">
        <h4 class="section-subtitle">Banhos e Tosquias Profissionais</h4>
        <p>
          Cuidamos da higiene completa do seu cão com produtos dermatologicamente testados e sem fragrâncias agressivas. Oferecemos banhos relaxantes com sais calmantes, limpeza de ouvidos e corte de unhas, seguido de tosquias adaptadas à raça e às preferências do tutor. A nossa equipa de groomers avalia pelagem, pele e estado geral durante o processo, reportando qualquer anomalia para intervenção precoce.
        </p>
      </div>
    </div>

    <!-- Serviço 3 -->
    <div class="row align-items-center mb-5">
      <div class="col-md-6">
        <img src="@/assets/images/servicos/servico3.png" alt="Enriquecimento" class="img-fluid rounded shadow-sm" />
      </div>
      <div class="col-md-6">
        <h4 class="section-subtitle">Atividades de Enriquecimento</h4>
        <p>
          Incentivamos a estimulação mental e física através de jogos interativos, brinquedos de desafio e mini-circuitos de agilidade. As sessões individuais e em grupo são planeadas para promover aprendizagem, confiança e socialização. Cada atividade é monitorizada para ajustar a dificuldade e evitar frustrações, garantindo momentos de diversão e desenvolvimento cognitivo diário.
        </p>
      </div>
    </div>

    <!-- Serviço 4 -->
    <div class="row align-items-center mb-5 flex-md-row-reverse">
      <div class="col-md-6">
        <img src="@/assets/images/servicos/servico4.png" alt="Passeios" class="img-fluid rounded shadow-sm" />
      </div>
      <div class="col-md-6">
        <h4 class="section-subtitle">Passeios Higiénicos e Seguros</h4>
        <p>
          Cada cão tem direito a até dois passeios diários em áreas vedadas com piso antiderrapante e sombras naturais. Os passeios são conduzidos por cuidadores treinados, que incentivam comportamentos adequados e reforçam a obediência. Garantimos tempo suficiente para exercício, aproveitamento de estímulos externos e cuidados de higiene pessoal no regresso, mantendo o espaço sempre limpo.
        </p>
      </div>
    </div>

    <!-- Serviço 5 -->
    <div class="row align-items-center mb-5">
      <div class="col-md-6">
        <img src="@/assets/images/servicos/servico5.png" alt="Transporte" class="img-fluid rounded shadow-sm" />
      </div>
      <div class="col-md-6">
        <h4 class="section-subtitle">Serviço de Transporte Porta a Porta</h4>
        <p>
          Com viaturas equipadas e certificadas, oferecemos recolha e entrega do seu cão em casa ou no trabalho. O serviço inclui check-list de segurança, cinto de retenção canino e acompanhamento personalizado durante todo o trajeto. Ideal para tutores com horários apertados ou sem transporte próprio, garantindo comodidade e redução de stress para o animal.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoServicos'
};
</script>

<style scoped>
.info-servicos {
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

.section-subtitle {
  color: #2a7f87;
  font-weight: 700;
  font-size: 1.4rem;
  margin-bottom: 12px;
  border-left: 5px solid #d49c68;
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
  border: 1px solid #e0ded9;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
}

.img-fluid:hover {
  transform: scale(1.02);
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
