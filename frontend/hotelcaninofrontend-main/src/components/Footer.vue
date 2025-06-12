<template>
  <footer class="py-4 footer-hotel">
    <div class="container-footer">
      <div class="row">
        <div class="col-12 col-md-6 left-footer">
          <p class="mb-0">© 2025 Hotel Canino. Todos os direitos reservados.</p>
        </div>
        <div class="col-12 col-md-6 text-md-end right-footer">
          <p class="mb-0">Plataformas de Conteúdos Web - Grupo VII (Claudia & André)</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
};
</script>

<style scoped>
.footer-hotel {
  background-color: #f9f7ef; /* tom areia suave */
  color: #3a3a3a; /* castanho escuro para contraste */
  font-size: 14px;
  border-top: 3px solid #2a7f87; /* verde */
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  transition: background-color 0.3s ease;
}

.container-footer {
  padding: 0 24px;
}

.left-footer,
.right-footer {
  font-size: 14px;
  font-weight: 400;
}

.left-footer {
  text-align: left;
}

.right-footer {
  text-align: right;
  color: #6b705c;
}

@media screen and (max-width: 767px) {
  .left-footer,
  .right-footer {
    font-size: 12px;
    text-align: left;
    margin-top: 4px;
  }
}
</style>
