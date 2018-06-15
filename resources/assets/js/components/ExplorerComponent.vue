<template>
  <div class="file-explorer">
    <div class="breadcrumb">
      <span v-for="(crumb, index) in $store.state.explorer.breadcrumbs" v-bind:key="crumb.id" v-on:click="goBackTo(index)">{{ crumb.name }}/</span>
    </div>
    <a class="entry" v-bind:class="{selected: entry.selected}" v-for="entry in $store.state.explorer.folders" v-bind:key="entry.id" v-on:click="select(entry)" v-on:dblclick="enterDirectory(entry)">
      /{{ entry.name }}
    </a>
    <a class="entry" v-bind:class="{selected: entry.selected}" v-for="entry in $store.state.explorer.sources" v-bind:key="entry.id" v-on:click="select(entry)" v-on:dblclick="openSource(entry)">{{ entry.name }}</a>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      folder: this.$resource('folder'),
      source: this.$resource('source'),
    }
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
      this.$store.dispatch('select', entry);
    },

    clearSelection: function () {
      console.log('clear');
      for (var i = 0; i < this.$store.state.explorer.folders.length; i++) {
        this.$store.state.explorer.folders[i].selected = false;
      }

      for (var i = 0; i < this.$store.state.explorer.sources.length; i++) {
        this.$store.state.explorer.sources[i].selected = false;
      }
    }
  },
  created: function () {
    var self = this;

    if (this.$store.state.explorer.breadcrumbs.length == 0) {
      // We want to show the contents of the root folder. Since we
      // don't know it's id we first request it.

      this.folder.get({parent: null, api_token: this.$store.state.login.token}).then(function (response) {
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

<style>
  .breadcrumb span {
    cursor: pointer;
  }

/*****************************************
***           FILE EXPLORER            ***
*****************************************/

.file-explorer {
  padding: 35px;
  padding-top: 25px;
}

.file-explorer .breadcrumb {
  color: #727272;
  font-size: 90%;
  padding: 0px 0px 30px 5px;
}

.entry {
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

  border: none;
  outline: none;
  box-sizing: border-box;
  float: left;
  
  border: solid 1px #ebebeb;
  user-select: none;
}

.entry:hover {
  box-shadow: 0px 0px 4px -2px rgba(0,0,0,0.75);
}

.entry:active {
  box-shadow: 0px 0px 0px -2px rgba(0,0,0,0.75);
}

.selected {
  border: solid 1px #1e7fce;
}
</style>
