<template>
  <div class="pc-condicoes container">
    <h1 class="page-title text-center mb-4">Condições de Alojamento</h1>

    <p class="lead text-center mb-5">
      Para garantir o bem-estar de todos os nossos hóspedes, definimos um conjunto de regras claras, pensadas para proteger a saúde, segurança e conforto dos cães.
    </p>

    <div class="condicoes-bloco">
      <h4>📋 Requisitos de Saúde</h4>
      <p>
        Todos os cães devem estar <strong>vacinados</strong> contra raiva, esgana, parvovirose e tosse do canil, com o <strong>boletim de vacinas atualizado</strong> apresentado no check-in. É obrigatório também um comprovativo de desparasitação interna (últimos 6 meses) e externa (últimos 30 dias). Em caso de alterações no estado de saúde durante a estadia, iremos contactar o tutor e, se necessário, encaminhar o cão para atendimento veterinário de urgência.
      </p>
    </div>

    <div class="condicoes-bloco">
      <h4>🛏️ Itens Obrigatórios</h4>
      <p>
        Cada hóspede deve trazer a sua <strong>ração habitual</strong> em quantidade suficiente para toda a estadia, embalagens originais e instruções de alimentação. Recomendamos incluir uma manta ou brinquedo favorito para conforto emocional. Itens extra como toalhas, coleiras adicionais ou medicamentos de uso diário devem ser entregues na receção com descrição e posologia.
      </p>
    </div>

    <div class="condicoes-bloco">
      <h4>🐶 Comportamento e Socialização</h4>
      <p>
        Aceitamos cães sociáveis e sem histórico de agressividade grave. Todos passam por avaliação comportamental à chegada. Cães tímidos ou ansiosos terão adaptação gradual, enquanto cães com comportamentos ofensivos serão encaminhados para sessões individuais. A socialização em grupo é facultativa e realizada em áreas específicas, sempre sob supervisão. Garantimos reforço positivo e nunca aplicamos métodos aversivos.
      </p>
    </div>

    <div class="condicoes-bloco">
      <h4>⏱️ Horários de Entrada e Saída</h4>
      <p>
        <strong>Check-in:</strong> das 8h às 12h;<br />
        <strong>Check-out:</strong> até às 18h.<br />
        Chegadas ou partidas fora deste horário requerem agendamento prévio e poderão implicar custos adicionais. Em feriados e fins de semana, consulte horários especiais.
      </p>
    </div>

    <div class="condicoes-bloco">
      <h4>💶 Política de Cancelamento</h4>
      <p>
        Cancelamentos comunicados com <strong>48h de antecedência</strong> garantem reembolso total. Para cancelamentos entre 24h e 48h, oferta de crédito para futura reserva. Cancelamentos com menos de 24h ou não comparência implicam cobrança da primeira diária completa. Alterações de datas sujeitas à disponibilidade.
      </p>
    </div>

    <div class="condicoes-bloco">
      <h4>📜 Regulamentos Complementares</h4>
      <ul>
        <li>Não é permitido trazer alimentos humanos não aprovados pelo staff.</li>
        <li>Objetos frágeis ou de valor elevado são de responsabilidade do tutor.</li>
        <li>Visitas de familiares devem ser agendadas e limitadas a horários pré-definidos.</li>
        <li>Em caso de emergência, o tutor será contactado através dos números fornecidos.</li>
      </ul>
    </div>

    <p class="text-center mt-5">
      Em caso de dúvida, por favor <router-link to="/contactos" class="link-contacto">entre em contacto connosco</router-link>.<br/>
      Estamos sempre disponíveis para esclarecer quaisquer questões e personalizar a sua experiência.
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

.page-title {
  color: #4ecdc4;
  font-weight: 700;
  font-size: 2.4rem;
}

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

.condicoes-bloco p,
.condicoes-bloco ul {
  font-size: 1rem;
  line-height: 1.6;
}

.condicoes-bloco ul {
  padding-left: 1.2rem;
  list-style-type: disc;
}

.link-contacto {
  color: #4ecdc4;
  font-weight: 600;
  text-decoration: underline;
}
.link-contacto:hover {
  text-decoration: none;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  .condicoes-bloco {
    padding: 15px;
  }
}
</style>
