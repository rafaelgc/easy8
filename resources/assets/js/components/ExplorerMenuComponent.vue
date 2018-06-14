<template>
<div>
  <div class="section no-sep">Directorio</div>
  <ul>
    <li><a class="clickable" v-on:click="newFolder()">Nueva carpeta</a></li>
    <li><router-link v-bind:to="{ name: 'simulator' }">Nuevo programa</router-link></li>
  </ul>

  <div class="section">Fichero blabla.asm</div>
  <ul>
    <li><a href="#">Abrir</a></li>
    <li><a href="#">Enviar</a></li>
    <li><a href="#">Eliminar</a></li>
  </ul>
</div>
</template>

<script>
export default {
  data: function () {
    return {
    }
  },
  methods: {
    newFolder: function () {
        var name = prompt('Nombre de la carpeta');

        this.$store.dispatch('createFolder', { name: name });
    }
  }
};
</script>

<style>
</style>
