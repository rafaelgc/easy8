<template>
<div>
  <div class="section no-sep" v-if="$store.state.simulator.entry">{{ $store.state.simulator.entry.name }}</div>
  <ul>
    <li><a v-on:click="save()" class="clickable">Guardar</a></li>
    <li><a v-on:click="download()" class="clickable">Descargar</a></li>
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
    },

    download: function () {
      var element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.$store.state.simulator.content));
      element.setAttribute('download', this.$store.state.simulator.entry.name);

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    }
  },
  created: function () {
  }
}
</script>

<style>

</style>
