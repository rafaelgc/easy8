<template>
  <div>
    <nav class="main-menu">
      <explorer-menu></explorer-menu>
    </nav>
    <div class="working-area">
      <div class="file-explorer">
        <div class="breadcrumb">
          <span v-for="(crumb, index) in $store.state.explorer.breadcrumbs" v-bind:key="crumb.id" v-on:click="goBackTo(index)">{{ crumb.name }}/</span>
        </div>
        <div class="empty-folder" v-if="!$store.getters.loading && $store.state.explorer.folders.length == 0 && $store.state.explorer.sources.length == 0">
          Parece que esta carpeta está vacía. ¯\_(ツ)_/¯
        </div>
        <a v-if="!$store.getters.inRoot" class="entry folder" v-on:dblclick="goBackTo(-1)">
          <div class="decoration"></div>
          ../
        </a>
        <a class="entry folder" v-bind:class="{selected: entry.selected, cutting: entry.cutting}" v-for="entry in $store.state.explorer.folders" v-bind:key="entry.id" v-on:click="select(entry)" v-on:dblclick="enterDirectory(entry)">
          <div class="decoration"></div>
          {{ entry.name }}
        </a>
        <a class="entry file" v-bind:class="{selected: entry.selected, cutting: entry.cutting}" v-for="entry in $store.state.explorer.sources" v-bind:key="entry.id" v-on:click="select(entry)" v-on:dblclick="openSource(entry)">{{ entry.name }}</a>

        <div v-if="$store.state.explorer.editingEntry" class="folder-editor" v-bind:class="{ 'visible': $store.state.explorer.editingEntry }">
          <h2>Carpeta</h2>
          <form action="">
            <div class="input-block">
              <label>Nombre</label>
              <input class="wide big" v-model="$store.state.explorer.editingEntry.name">
            </div>

            <div class="separator">
              <h3>Buzón</h3>
              <hr>
            </div>

            <div class="inbox">
              <div class="input-block">
                <label><input type="checkbox" v-model="$store.state.explorer.editingEntry.folder.inbox">Es un buzón</label>
              </div>
              <template v-if="$store.state.explorer.editingEntry.folder.inbox">
                <div class="input-block">
                  <label>Nombre del buzón</label>
                  <input class="wide" v-model="$store.state.explorer.editingEntry.folder.inbox_name">
                </div>
                <div class="input-block">
                  <label>Contraseña</label>
                  <input class="wide" type="password" v-model="$store.state.explorer.editingEntry.folder.inbox_password">
                </div>
              </template>
            </div>

            <button class="btn" v-on:click="closeFolderSettings()">Cancelar</button>
            <button class="btn primary" v-on:click="saveFolderSettings()">Guardar</button>
          </form>
        </div>

        <div v-if="false" class="folder-editor" v-bind:class="{ 'visible': true }">
          <h2>Enviar fichero</h2>
          <form action="">
            <div class="input-block">
              <label>Nombre del buzón</label>
              <input class="input wide big" >
            </div>
            <div class="input-block">
              <label>Contraseña</label>
              <input class="input wide big" type="password" >
            </div>

            <button class="btn" v-on:click="closeFolderSettings()">Cancelar</button>
            <button class="btn primary" v-on:click="saveFolderSettings()">Enviar</button>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

import resources from '../resources';

export default {
  components: {
    'explorer-menu': require('./ExplorerMenuComponent.vue').default
  },
  data: function () {
    return {}
  },
  methods: {
    enterDirectory: function (entry) {
      this.$store.dispatch('enterDirectory', entry);
    },

    openSource: function (entry) {
      this.$router.push({ name: 'simulator', params: { entryId: entry.id } });
    },

    goBackTo: function (index) {
      this.$store.dispatch('leaveDirectory', index);
    },

    select: function (entry) {
      console.log('select');
      this.$store.dispatch('select', entry);
    },

    clearSelection: function () {
      console.log('clear');
      for (var i = 0; i < this.$store.state.explorer.folders.length; i++) {
        this.$store.explorer.state.folders[i].selected = false;
      }

      for (var i = 0; i < this.$store.state.explorer.sources.length; i++) {
        this.$store.explorer.state.sources[i].selected = false;
      }
    },

    saveFolderSettings: function () {
      this.$store.dispatch('updateEditingFolder');
      this.closeFolderSettings();
    },

    closeFolderSettings: function () {
      this.$store.explorer.state.editingEntry = null;
    }
  },
  created: function () {
    var self = this;

    if (this.$store.state.explorer.breadcrumbs.length == 0) {
      // We want to show the contents of the root folder. Since we
      // don't know its id we first request it.

      resources.folder.get({ parent: null }).then(function (response) {
        console.log(response);
        var root = response.body[0];

        //this.$store.state.explorer.breadcrumbs = [root];
        // As soon as we get the root folder we request it's children.
        //self.listDirectory(root.id);
        self.$store.dispatch('enterDirectory', root);
      });
    }
    
  }
}
</script>

<style scoped>
  .breadcrumb span {
    cursor: pointer;
  }

  /*****************************************
  ***           FILE EXPLORER            ***
  *****************************************/

  .file-explorer {
    position: relative;
    padding: 25px 35px 25px 35px;
  }

  .file-explorer .breadcrumb {
    color: #727272;
    font-size: 90%;
    padding: 0px 0px 30px 5px;
  }

  .entry {
    position: relative;
    width: 100px;
    height: 100px;
    background-color: white;
    display: block;
    margin: 5px;
    box-shadow: 0px 0px 3px -2px rgba(0,0,0,0.75);
    cursor: pointer;
    box-sizing: border-box;
    color: #727272;
    text-align: center;
    font-size: 80%;
    padding: 10px 5px;
    text-decoration: none;
    outline: none;
    float: left;
    border: solid 1px #ebebeb;
    user-select: none;

    animation-name: entry-animation;
    animation-duration: 0.3s;
  }

  @keyframes entry-animation {
      from { transform: scale(0, 0); }
      to   { transform: scale(1, 1); }
  }

  .entry:hover {
    box-shadow: 0px 0px 4px -2px rgba(0,0,0,0.75);
  }

  .entry:active {
    box-shadow: 0px 0px 0px -2px rgba(0,0,0,0.75);
  }

  .entry.folder .decoration {
    position: absolute;
    top: -13px;
    left: 0;
    height: 0px;
    width: 35px;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 12px solid white;
  }

  .selected {
    border: solid 1px #1e7fce;
  }

  .cutting {
    opacity: 0.6;
  }

  .entry.folder.selected .decoration {
    border-bottom: 12px solid #1e7fce;
  }

  .empty-folder {
    font-size: 90%;
    color: #757575;
    text-align: center;
  }

  .folder-editor {
    position: fixed;
    width: 500px;
    max-width: 100%;
    background-color: white;
    top: 100px;
    left: 0;
    right: 0;
    margin: 0 auto;
    box-shadow: 0px 0px 3px -1px rgba(0,0,0,0.75);
    z-index: 10001;
    border: solid 1px #D1D1D1;
    display: none;
  }

  .folder-editor.visible {
    display: block;
    animation-name: entry-animation;
    animation-duration: 0.2s;
  }

  .folder-editor h2 {
    font-size: 120%;
    color: #616161;
    /*background-color: #f6f6f6;*/
    padding: 15px;
    font-weight: normal;
    margin: 0;
    border-top: solid 5px #1e7fce;
    border-bottom: solid 1px #e9e9e9;
  }

  .folder-editor form {
    padding: 15px;
  }

  .folder-editor .input-block {
    margin-bottom: 15px;
  }

  .folder-editor .separator h3 {
    font-weight: bold;
    background-color: white;
    display: inline-block;
    color: #777777;
    margin: 0 0 0 10px;
    padding: 0 5px;
    text-transform: uppercase;
    font-size: 90%;
  }

  .folder-editor .separator hr {
    position: relative;
    top: -1.1em;
    border: solid 1px #e7e7e7;
    z-index: -1;
  }

</style>
