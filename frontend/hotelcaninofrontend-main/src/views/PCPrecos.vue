<template>
  <div class="pc-precos container">
    <h1 class="page-title text-center mb-4">Tabela de Preços</h1>

    <p class="lead text-center mb-5">
      Descubra os nossos serviços premium a preços acessíveis, pensados para o bem-estar do seu melhor amigo.
    </p>

    <div class="table-responsive">
      <table class="table table-bordered table-hover bg-white text-dark shadow rounded">
        <thead class="table-warning text-dark text-center">
          <tr>
            <th style="width: 20%">Serviço</th>
            <th>Descrição</th>
            <th style="width: 15%">Preço</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Alojamento Diário</strong></td>
            <td>Inclui box individual, alimentação e passeio supervisionado</td>
            <td class="text-center">15€ / dia</td>
          </tr>
          <tr>
            <td><strong>Alojamento Semana Completa</strong></td>
            <td>7 dias com desconto (ideal para férias prolongadas)</td>
            <td class="text-center">90€</td>
          </tr>
          <tr>
            <td><strong>Banho e Secagem</strong></td>
            <td>Com produtos hipoalergénicos e ambiente climatizado</td>
            <td class="text-center">18€</td>
          </tr>
          <tr>
            <td><strong>Tosquia</strong></td>
            <td>Corte completo com máquina e tesoura, personalizado</td>
            <td class="text-center">25€</td>
          </tr>
          <tr>
            <td><strong>Transporte</strong></td>
            <td>Ida e volta até 15 km do hotel (requer marcação prévia)</td>
            <td class="text-center">10€</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p class="mt-4 text-center text-nota">
      <strong>Notas:</strong> Pagamentos realizados preferencialmente no check-in. Todos os preços incluem IVA à taxa legal em vigor.
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

/* Título */
.page-title {
  color: #4ecdc4;
  font-weight: 700;
  font-size: 2.4rem;
}

/* Tabela */
.table {
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.table th,
.table td {
  vertical-align: middle;
  padding: 16px;
}

.table thead {
  background-color: #ffe66d !important;
}

.table-hover tbody tr:hover {
  background-color: #f9f9f9;
}

/* Nota final */
.text-nota {
  font-size: 0.95rem;
  color: #444;
}

/* Responsivo */
@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .table {
    font-size: 0.9rem;
  }

  .table th,
  .table td {
    padding: 12px;
  }
}
</style>
