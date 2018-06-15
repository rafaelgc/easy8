<template>
<div>
  <div class="section no-sep">Directorio</div>
  <ul>
    <li><a class="clickable" v-on:click="newFolder()">Nueva carpeta</a></li>
    <li><a class="clickable" v-on:click="newProgram()">Nuevo programa</a></li>
  </ul>
  <template v-if="$store.state.explorer.selectionCount > 0">
    <div class="section">Selección</div>
    <ul>
      <li><a class="clickable" v-on:click="deleteSelectedEntries()">Eliminar</a></li>
    </ul>
  </template>
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
    },

    newProgram: function () {
      var name = prompt('Nombre del fichero:');
      if (!name.endsWith('.asm')) {
        name += '.asm';
      }

      this.$store.dispatch('createSource', { name: name });
    },

    deleteSelectedEntries: function () {
      this.$store.dispatch('deleteSelectedEntries');
    }
  }
};
</script>

<style>
</style>
