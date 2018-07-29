<template>
<div>
  <div class="section no-sep">Directorio</div>
  <ul>
    <li><a class="clickable" v-on:click="newFolder()">Nueva carpeta</a></li>
    <li><a class="clickable" v-on:click="newProgram()">Nuevo programa</a></li>
  </ul>
  <template v-if="$store.state.explorer.selectionCount > 0">
    <div class="section">Selección ({{ $store.state.explorer.selectionCount }})</div>
    <ul>
      <li><a class="clickable" v-on:click="deleteSelectedEntries()">Eliminar</a></li>
    </ul>
  </template>

  <template v-if="!$store.getters.inRoot && $store.getters.cwd">
    <div class="section">Buzón <template v-if="$store.getters.cwd.folder.inbox">/{{ $store.getters.cwd.folder.inbox_name }}</template></div>
    <ul>
      <li v-if="$store.getters.cwd.folder.inbox == false"><a class="clickable" v-on:click="enableInbox()">Habilitar</a></li>
      <li v-if="$store.getters.cwd.folder.inbox == true"><a class="clickable" v-on:click="enableInbox()">Deshabilitar</a></li>
    </ul>
  </template>

  <div class="section">Cuenta</div>
  <ul>
    <li><a v-on:click="logout()" class="clickable">Cerrar sesión</a></li>
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
    },

    logout: function () {
      this.$store.dispatch('logout');
      this.$router.push({ name: 'login' });
    }
  }
};
</script>

<style>
</style>
