<template>
<div>
  <div class="section no-sep">Filename.asm</div>
  <ul>
    <li><a v-on:click="save()" class="clickable">Guardar</a></li>
    <li><a href="#">Descargar</a></li>
    <li><router-link v-bind:to="{ name: 'explorer' }">Volver al explorador</router-link></li>
  </ul>
  <div class="section no-sep">Vista</div>
  <ul>
    <li><a href="#">Editor</a></li>
    <li><a href="#">Simulador</a></li>
  </ul>
</div>
</template>

<script>
export default {
  methods: {
    save: function () {
      this.$store.dispatch('updateSource');
    }
  },
  created: function () {
    this.$store.state.simulator.entryId = this.$route.params.entryId;
  }
}
</script>

<style>

</style>
