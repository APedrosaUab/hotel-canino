<template>
  <div class="info-instalacoes container">
    <h1 class="page-title text-center mb-5">As Nossas Instalações</h1>

    <!-- Bloco 1 -->
    <div class="row align-items-center mb-5">
      <div class="col-md-6">
        <img src="@/assets/images/instalacoes/hotel1.png" alt="Box individual" class="img-fluid rounded shadow" />
      </div>
      <div class="col-md-6">
        <h4 class="section-subtitle">Boxes Individuais Confortáveis</h4>
        <p>
          Cada hóspede tem a sua própria box equipada com cama elevada, manta macia e sistema de ventilação. O espaço é acolhedor e higienizado diariamente, garantindo o conforto e o descanso que o seu cão merece.
        </p>
      </div>
    </div>

    <!-- Bloco 2 -->
    <div class="row align-items-center mb-5 flex-md-row-reverse">
      <div class="col-md-6">
        <img src="@/assets/images/instalacoes/hotel2.png" alt="Área exterior" class="img-fluid rounded shadow" />
      </div>
      <div class="col-md-6">
        <h4 class="section-subtitle">Áreas Exteriores com Atividades</h4>
        <p>
          Dispomos de pátios com relva sintética onde os cães podem brincar, correr e socializar, sempre com supervisão profissional. Ideal para gastar energias e manter-se ativo durante a estadia.
        </p>
      </div>
    </div>

    <!-- Bloco 3 -->
    <div class="row align-items-center mb-5">
      <div class="col-md-6">
        <img src="@/assets/images/instalacoes/hotel3.png" alt="Espaço de convívio" class="img-fluid rounded shadow" />
      </div>
      <div class="col-md-6">
        <h4 class="section-subtitle">Espaço de Convívio Supervisionado</h4>
        <p>
          Para cães sociáveis, oferecemos sessões de interação num ambiente seguro e controlado. A sala de convívio estimula o bem-estar emocional dos nossos hóspedes e promove o comportamento positivo.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoInstalacoes'
};
</script>
<style scoped>
.info-instalacoes {
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
