<template>
<div>
  <div class="section no-sep" v-if="$store.state.simulator.entry">{{ $store.state.simulator.entry.name }}</div>
  <ul>
    <li><a v-on:click="$emit('save')" class="clickable">Guardar</a></li>
    <li><a v-on:click="$emit('download')" class="clickable">Descargar</a></li>
    <li><router-link v-bind:to="{ name: 'explorer' }">Volver al explorador</router-link></li>
  </ul>
  <div class="section no-sep">Vista</div>
  <ul>
    <li><a href="#" v-on:click="$store.dispatch('goToEditor')" v-bind:style="{'text-decoration': $store.getters.currentView == 'editor' ? 'underline' : 'none'}">Editor</a></li>
    <li><a href="#" v-on:click="$store.dispatch('goToSimulator')" v-bind:style="{'text-decoration': $store.getters.currentView == 'simulator' ? 'underline' : 'none'}">Simulador</a></li>
  </ul>

  <div class="section no-sep">Formato</div>
  <ul>
    <li><a href="#" v-on:click="$emit('format-changed', 'hex')" v-bind:style="{'text-decoration': numericFormat == 'hex' ? 'underline' : 'none'}">Hexadecimal</a></li>
    <li><a href="#" v-on:click="$emit('format-changed', 'decimal-signed')" v-bind:style="{'text-decoration': numericFormat == 'decimal-signed' ? 'underline' : 'none'}">Decimal</a></li>
    <li><a href="#" v-on:click="$emit('format-changed', 'bin')" v-bind:style="{'text-decoration': numericFormat == 'bin' ? 'underline' : 'none'}">Binario</a></li>
  </ul>
</div>
</template>

<script>
export default {
  props: {
    numericFormat: { type: String }
  },
  methods: {
  },
  created: function () {
  }
}
</script>

<style>

</style>
