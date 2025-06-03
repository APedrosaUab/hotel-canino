<template>
  <div class="info-servicos container">
    <h1 class="page-title text-center mb-5">Serviços Disponíveis</h1>

    <!-- Serviço 1 -->
    <div class="row align-items-center mb-5">
      <div class="col-md-6">
        <img src="@/assets/images/servicos/servico1.png" alt="Alojamento" class="img-fluid rounded shadow" />
      </div>
      <div class="col-md-6">
        <h4 class="section-subtitle">Alojamento Diário e Prolongado</h4>
        <p>
          O seu cão pode pernoitar em segurança, com acesso a alimentação de qualidade, vigilância contínua
          e boxes confortáveis para descanso. Ideal para férias, viagens ou imprevistos.
        </p>
      </div>
    </div>

    <!-- Serviço 2 -->
    <div class="row align-items-center mb-5 flex-md-row-reverse">
      <div class="col-md-6">
        <img src="@/assets/images/servicos/servico2.png" alt="Banhos e Tosquias" class="img-fluid rounded shadow" />
      </div>
      <div class="col-md-6">
        <h4 class="section-subtitle">Banhos e Tosquias Profissionais</h4>
        <p>
          Higiene é bem-estar. Oferecemos banho com produtos hipoalergénicos e tosquias adaptadas à raça,
          sempre realizadas por profissionais experientes e cuidadosos.
        </p>
      </div>
    </div>

    <!-- Serviço 3 -->
    <div class="row align-items-center mb-5">
      <div class="col-md-6">
        <img src="@/assets/images/servicos/servico3.png" alt="Enriquecimento" class="img-fluid rounded shadow" />
      </div>
      <div class="col-md-6">
        <h4 class="section-subtitle">Atividades de Enriquecimento</h4>
        <p>
          Jogos interativos, brinquedos educativos e sessões de socialização fazem parte do nosso plano de
          enriquecimento diário. O objetivo? Estimular corpo e mente.
        </p>
      </div>
    </div>

    <!-- Serviço 4 -->
    <div class="row align-items-center mb-5 flex-md-row-reverse">
      <div class="col-md-6">
        <img src="@/assets/images/servicos/servico4.png" alt="Passeios" class="img-fluid rounded shadow" />
      </div>
      <div class="col-md-6">
        <h4 class="section-subtitle">Passeios Higiénicos</h4>
        <p>
          Os cães têm direito a até dois passeios diários, em espaço vedado e seguro, para fazerem as suas
          necessidades e esticar as patas ao ar livre.
        </p>
      </div>
    </div>

    <!-- Serviço 5 -->
    <div class="row align-items-center mb-5">
      <div class="col-md-6">
        <img src="@/assets/images/servicos/servico5.png" alt="Transporte" class="img-fluid rounded shadow" />
      </div>
      <div class="col-md-6">
        <h4 class="section-subtitle">Serviço de Transporte</h4>
        <p>
          Com marcação prévia, podemos recolher ou entregar o seu cão à porta de casa, garantindo segurança
          e comodidade. Serviço ideal para tutores sem mobilidade ou tempo disponível.
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
    background-color: #fefae0;
    color: #2e2e2e;
}

/* Título principal */
.page-title {
  color: #4ecdc4;
  font-weight: 700;
  font-size: 2.6rem;
}

/* Subtítulos */
.section-subtitle {
  color: #333333;
  font-weight: 600;
  font-size: 1.4rem;
  margin-bottom: 12px;
  border-left: 5px solid #ffe66d;
  padding-left: 12px;
}

/* Texto */
p {
  font-size: 1.05rem;
  line-height: 1.7;
  margin-top: 10px;
}

/* Imagens */
.img-fluid {
  width: 100%;
  max-height: 320px;
  object-fit: cover;
  border: 1px solid #ddd;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

/* Responsivo */
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
