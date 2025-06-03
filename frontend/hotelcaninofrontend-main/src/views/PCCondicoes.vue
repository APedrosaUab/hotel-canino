<template>
  <div class="pc-condicoes container">
    <h1 class="page-title text-center mb-4">Condições de Alojamento</h1>

    <p class="lead text-center mb-5">
      Para garantir o bem-estar de todos os nossos hóspedes, definimos um conjunto de regras simples mas fundamentais.
    </p>

    <div class="condicoes-bloco">
      <h4>📋 Requisitos de Saúde</h4>
      <p>
        Todos os cães devem estar <strong>vacinados</strong> contra raiva, esgana, parvovirose e tosse do canil. É obrigatória a apresentação
        do <strong>boletim de vacinas atualizado</strong> no momento do check-in. Recomendamos também a aplicação de antiparasitários externos
        antes da estadia.
      </p>
    </div>

    <div class="condicoes-bloco">
      <h4>🛏️ Itens Obrigatórios</h4>
      <p>
        Cada hóspede deve trazer a sua <strong>ração habitual</strong> e, opcionalmente, uma manta ou brinquedo pessoal.
        O objetivo é garantir o conforto emocional durante a estadia.
      </p>
    </div>

    <div class="condicoes-bloco">
      <h4>🐶 Comportamento</h4>
      <p>
        Aceitamos cães sociáveis e bem integrados com humanos. Cães com historial de agressividade deverão ser avaliados previamente.
        Os cães que não se adaptarem ao ambiente do hotel poderão ser devolvidos antecipadamente ao tutor.
      </p>
    </div>

    <div class="condicoes-bloco">
      <h4>⏱️ Horários</h4>
      <p>
        Check-in: das <strong>8h às 12h</strong> | Check-out: até às <strong>18h</strong>. Entradas ou saídas fora deste horário apenas com agendamento prévio.
      </p>
    </div>

    <div class="condicoes-bloco">
      <h4>💶 Cancelamentos</h4>
      <p>
        Cancelamentos devem ser comunicados com <strong>mínimo de 48h de antecedência</strong> para reembolso total. Em caso de não comparência,
        será cobrada a primeira diária.
      </p>
    </div>

    <p class="text-center mt-5">
      Em caso de dúvida, por favor <router-link to="/contactos" class="link-contacto">entre em contacto connosco</router-link>.
    </p>
  </div>
</template>

<script>
export default {
  name: 'PCCondicoes'
};
</script>

<style scoped>
.pc-condicoes {
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
  font-size: 2.4rem;
}

/* Blocos */
.condicoes-bloco {
  margin-bottom: 2.5rem;
  padding: 15px 20px;
  border-left: 6px solid #4ecdc4;
  background-color: #fffdf3;
  border-radius: 6px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05);
}

.condicoes-bloco h4 {
  margin-bottom: 0.75rem;
  color: #555;
  font-size: 1.25rem;
  font-weight: 600;
}

.condicoes-bloco p {
  font-size: 1rem;
  line-height: 1.6;
}

/* Link */
.link-contacto {
  color: #4ecdc4;
  font-weight: 600;
  text-decoration: underline;
}

.link-contacto:hover {
  text-decoration: none;
}

/* Responsivo */
@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .condicoes-bloco {
    padding: 15px;
  }
}
</style>
