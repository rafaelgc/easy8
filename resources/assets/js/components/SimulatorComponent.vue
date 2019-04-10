<template>
  <div>
    <div class="button-area">
      <a class="btn primary" v-on:click="assemblyAndRun()">Ensamblar y ejecutar</a>
      <a class="btn" v-on:click="assembly()">Ensamblar</a>
      <a class="btn">Parar</a>
      <a class="btn">Ejecutar paso</a>
      <a class="btn right" v-if="view == 1" v-on:click="view = 0">Ir al editor</a>
      <a class="btn right" v-if="view == 0" v-on:click="view = 1">Ir al simulador</a>
      <div style="clear: both"></div>
    </div>

    <div v-if="view == 0" class="editor-and-periphericals">
      <div class="editor-container">
        <codemirror v-model="$store.state.simulator.content" :options="cmOptions"></codemirror>
        <!--<textarea ref="editor" v-model="$store.state.simulator.content"></textarea>-->
      </div>

      <div class="input-container">
        <!--<div v-if="peripherals.keyboard.visible">
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
        -->
      </div>

      <div class="memory-displays">
        <div class="memory code">
          <h2>Memoria de código</h2>
          <div v-if="memory" v-for="entry in memory" class="entry">{{ entry }}</div>
        </div>

        <div class="memory data">
          <h2>Memoria de datos</h2>
          <div v-if="memory" v-for="entry in memory" class="entry">{{ entry }}</div>
        </div>

        <div class="memory heap">
          <h2>Memoria de pila</h2>
          <div v-if="memory" v-for="entry in memory" class="entry">{{ entry }}</div>
        </div>

        <div class="memory heap">
          <h2>Puertos</h2>
          <div v-if="memory" v-for="entry in memory" class="entry">{{ entry }}</div>
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

import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'

export default {
  components: {
    codemirror: codemirror
  },
  data: function () {
    return {
      view: 0,
      leds: 10,

      memory: null,

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
      },

      cmOptions: {
        // codemirror options
        tabSize: 4,
        mode: 'text/javascript',
        theme: 'base16-dark',
        lineNumbers: true,
        line: true,
        // more codemirror options, 更多 codemirror 的高级配置...
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

    onSyntaxError: function (message, line) {
      alert('Error en la línea ' + line + ': ' + message);
      /*console.log(message);*/
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

    /*var editor = CodeMirror.fromTextArea(this.$refs.editor, {
      lineNumbers: true,
      mode: "simplemode"
    });*/

    this.$store.dispatch('loadSource', this.$route.params.entryId).then(function (response) {
      //editor.setValue(response.body.source.content);
      self.$store.state.simulator.entry = response.body;

      self.$store.state.simulator.content = response.body.source.content;
    });

    /*editor.on('change', function () {
      self.$store.state.simulator.content = editor.getValue();
    });*/

    this.runtimeEnvironment = new RuntimeEnvironment(instructionSet);
    this.runtimeEnvironment.setCallbacks({
      onMemoryUpdate: this.onMemoryUpdate,
      onRegisterUpdate: this.onRegisterUpdate,
      onOutputUpdate: this.onOutputUpdate,
      onSyntaxError: this.onSyntaxError,
      onInputRequest: this.onInputRequest
    });

    this.memory = this.runtimeEnvironment.getMemory().getData();
  }
};
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }

  .button-area {
    padding: 15px;
  }

  .button-area .right {
    float: right;
  }

  .editor-and-periphericals {
    display: flex;
    flex-wrap: wrap;
  }

  .editor-container {
    padding: 10px;
    width: 50%;
  }

  .input-container {
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

  .memory-displays {
    width: 100%;
    display: flex;
  }

  .memory-displays .memory {
    flex-grow: 1;
    border: solid 1px #eeeeee;
    background-color: white;
    margin: 10px;
    flex-basis: 25%;
  }

  .memory-displays .memory h2 {
    padding: 10px 0;
    margin: 0;
    font-size: 80%;
    text-align: center;
    color: #4c4c4c;
  }

  .memory-displays .memory .entry {
    padding: 3px 10px;
    font-size: 80%;
  }

  .memory-displays .memory .entry:nth-child(even) {
    background-color: #fcfcfc;
  }

  .memory-displays .memory .entry:hover {
    background-color: #d9d9d9;
  }



</style>
