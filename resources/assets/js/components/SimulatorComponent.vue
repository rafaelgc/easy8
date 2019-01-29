<template>
  <div>
    <div class="button-area">
      <a class="btn primary" v-on:click="assemblyAndRun()">Ensamblar y ejecutar</a>
      <a class="btn" v-on:click="assembly()">Ensamblar</a>
      <a class="btn">Parar</a>
      <a class="btn">Ejecutar paso</a>
      <a class="btn right" v-if="view == 1" v-on:click="view = 0">Ir al editor</a>
      <a class="btn right" v-if="view == 0" v-on:click="view = 1">Ir al simulador</a>
    </div>

    <div v-if="view == 0" class="editor-and-periphericals">
      <div class="editor-container">
        <textarea id="editor" v-model="$store.state.simulator.content"></textarea>
      </div>

      <div class="input-container">
        <div v-if="peripherals.keyboard.visible">
          <div class="name">Teclado<span class="close" v-on:click="peripherals.keyboard.visible = false">x</span></div>
          <div class="component">
            <HexKeyboard v-on:keyPress="hexKeyboardKeyPress"></HexKeyboard>
          </div>
        </div>

        <div v-if="peripherals.leds.visible">
          <div class="name">LEDS<span class="close" v-on:click="peripherals.leds.visible = false">x</span></div>
          <div class="component">
            <Leds v-bind:value="leds"></Leds>
          </div>
        </div>

        <div v-if="peripherals.switches.visible">
          <div class="name">Switches<span class="close" v-on:click="peripherals.switches.visible = false">x</span></div>
          <div class="component">
            <Switches v-on:changed="changed"></Switches>
          </div>
        </div>

        <div v-if="peripherals.temperatureSensor.visible">
          <div class="name">Sensor de temperatura<span class="close" v-on:click="peripherals.temperatureSensor.visible = false">x</span></div>
          <div class="component">
            <Temperature></Temperature>
          </div>
        </div>
      </div>
    </div>

    <div v-if="view == 1" class="peripheral">

    </div>

  </div>
</template>

<script>
import RuntimeEnvironment from '../runtime-environment';
import Assembler from '../assembler';

import instructionSet from '../instruction-set';

import HexKeyboard from './HexKeyboard.vue';
Vue.component('HexKeyboard', HexKeyboard);

import Leds from './Leds.vue';
Vue.component('Leds', Leds);

import Switches from './Switches.vue';
Vue.component('Switches', Switches);

import Temperature from './Temperature.vue';
Vue.component('Temperature', Temperature);

export default {
  data: function () {
    return {
      view: 0,
      leds: 10,

      peripherals: {
        keyboard: {
          visible: true
        },

        leds: {
          visible: true
        },

        switches: {
          visible: true
        },

        temperatureSensor: {
          visible: true
        }
      }
    }
  },
  methods: {
    assemblyAndRun: function () {
      console.log(this.$store.state.simulator.content);
    },

    assembly: function () {
      console.log('assembly');
      //this.runtimeEnvironment.assembly(this.$store.state.simulator.content);
      var assembler = new Assembler(this.runtimeEnvironment.getMemory(), instructionSet);
      assembler.setOnSyntaxError(this.onSyntaxError);
      assembler.assembly(this.$store.state.simulator.content);

      this.runtimeEnvironment.getMemory().print();
    },

    onSyntaxError: function (message) {
      console.log(message);
    },

    onMemoryUpdate: function () {
      console.log('Memory Updated');
    },

    onRegisterUpdate: function () {

    },

    onOutputUpdate: function () {
    },

    onInputRequest: function () {

    },

    hexKeyboardKeyPress: function (val) {
      //this.leds = val.value;
    },

    changed: function (val) {
      this.leds = val;
    }
  },
  created: function() {},
  mounted: function() {
    var self = this;
    var regex = /(?:MOVEI|MOVE|COMPAREI|COMPARE|JUMP|JLESS|JEQUAL|JGREATER|ADDI|ADD|INC|SUBI|SUB|DEC|CALL|RET|PUSH|POP|STOP|IN|OUT)\b/;

    var editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
      lineNumbers: true,
      mode: "simplemode"
    });

    this.$store.dispatch('loadSource', this.$route.params.entryId).then(function (response) {
      editor.setValue(response.body.source.content);
      self.$store.state.simulator.entry = response.body;

      self.$store.state.simulator.content = response.body.source.content;
    });

    editor.on('change', function () {
      self.$store.state.simulator.content = editor.getValue();
    });

    this.runtimeEnvironment = new RuntimeEnvironment(instructionSet);
    this.runtimeEnvironment.setCallbacks({
      onMemoryUpdate: this.onMemoryUpdate,
      onRegisterUpdate: this.onRegisterUpdate,
      onOutputUpdate: this.onOutputUpdate,
      onSyntaxError: this.onSyntaxError,
      onInputRequest: this.onInputRequest
    });

  }
};
</script>

<style scoped>
  #editor {
    z-index: 0;
    border: solid 1px black;
  }

  .button-area {
    padding: 15px;
  }

  .button-area .right {
    float: right;
  }

  .editor-and-periphericals {
    display: flex;
  }

  .editor-container {
    padding: 10px;
    width: 50%;

  }

  .CodeMirror {
      border: solid 1px #d6d6d6 !important;
      height: 600px !important;
  }

  .input-container {
    width: 50%;
    display: flex;
    flex-wrap: wrap;

    height: 600px;
    align-items: flex-start;
    align-content: flex-start;
  }

  .name {
    border-bottom: solid 1px #d6d6d6;
    padding: 5px;
    margin-bottom: 5px;
    color: #656565;
    text-transform: uppercase;
    font-size: 90%;
  }

  .close {
    float: right;
    cursor: pointer;
  }

  .component {
    padding: 5px;
  }

  .input-container > * {
    background-color: white;
    margin: 3px;
    border: solid 1px #d6d6d6;
  }


</style>
