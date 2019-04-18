<template>
  <div class="main-layout">
    <div class="button-area">
      <button class="btn primary" v-on:click="assemblyAndRun()">Ensamblar y ejecutar</button>
      <button class="btn" v-on:click="assembly()">Ensamblar</button>
      <button class="btn">Parar</button>
      <button class="btn" v-on:click="runStep">Ejecutar paso</button>
      <button class="btn right" v-if="view == 1" v-on:click="view = 0">Ir al editor</button>
      <button class="btn right" v-if="view == 0" v-on:click="view = 1">Ir al simulador</button>
      <div style="clear: both"></div>
    </div>

    <div v-if="view == 0" class="editor-and-registers">
      <div class="editor-container">
        <codemirror v-model="$store.state.simulator.content" :options="cmOptions"></codemirror>
        <!--<textarea ref="editor" v-model="$store.state.simulator.content"></textarea>-->
      </div>

      <div class="registers" v-if="registers">

        <div class="register">
          <h2>RA</h2>
          <div class="value">{{ registers.ra | toHex }}</div>
        </div>

        <div class="register">
          <h2>PC</h2>
          <div class="value">{{ registers.pc | toHex }}</div>
        </div>

        <div class="register">
          <h2>RET</h2>
          <div class="value">{{ registers.ret | toHex }}</div>
        </div>

        <div class="register">
          <h2>SP</h2>
          <div class="value">{{ registers.sp | toHex }}</div>
        </div>
      </div>
    </div>

    <div class="editor-and-registers">
      <div class="memory-displays">
        <div class="memory code">
          <h2>Memoria de código</h2>
          <div class="scroll">
            <div v-if="memory" v-for="(entry, index) in memory" ref="codeMemory" class="entry" :class="{ highlight: index == registers.pc }">
             <span class="address"> {{ index | toHex }}</span> <span class="value">{{ entry | toHex }}</span>
            </div>
          </div>
        </div>

        <div class="memory data">
          <h2>Memoria de datos</h2>
          <div class="scroll">
            <div v-if="memory" v-for="(entry, index) in memory" ref="dataMemory" class="entry" :class="{ highlight: index == lastModifiedMemoryAddress }">
              <span class="address"> {{ index | toHex }}</span> <span class="value">{{ entry | toHex }}</span>
            </div>
          </div>
        </div>

        <div class="memory heap">
          <h2>Memoria de pila</h2>
          <div class="scroll">
            <div v-if="memory" v-for="(entry, index) in memory" ref="stackMemory" class="entry" :class="{ highlight: index == registers.sp }">
              <span class="address"> {{ index | toHex }}</span> <span class="value">{{ entry | toHex }}</span>
            </div>
          </div>
        </div>

        <div class="memory heap">
          <h2>Puertos</h2>
          <div class="scroll">
            <div v-if="memory" v-for="(entry, index) in ports" class="entry" :class="{ highlight: index == lastModifiedPort }">
              <span class="address"> {{ index | toHex }}</span> <span class="value">{{ entry | toHex }}</span>
            </div>
          </div>
        </div>

      </div>
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

import { IODevices } from '../io';

export default {
  components: {
    codemirror: codemirror
  },
  filters: {
    toHex(value) {
      var hex = value.toString(16).toUpperCase();
      return '0x' + (hex.length < 2 ? '0' : '') + hex;
    }
  },
  data: function () {
    return {
      view: 0,
      leds: 10,

      assembler: null,

      memory: null,
      registers: null,
      ports: null,

      lastModifiedMemoryAddress: -1,
      lastModifiedPort: -1,

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
      this.assembler.setOnSyntaxError(this.onSyntaxError);
      this.assembler.assembly(this.$store.state.simulator.content);

      this.runtimeEnvironment.getMemory().print();
      this.runtimeEnvironment.resetProgram();
    },

    runStep() {
      this.runtimeEnvironment.runStep();

      this.$refs.codeMemory[Math.max(this.runtimeEnvironment.getRegisters().get('PC') - 4, 0)].scrollIntoView();
    },

    onSyntaxError: function (message, line) {
      alert('Error en la línea ' + line + ': ' + message);
    },

    onMemoryUpdate: function (memory, address, value) {
      // Scroll hacia la dirección modificada sólo cuando estamos ejecutando.
      // Esto es así para evitar mover el scroll cuando ensamblamos.
      if (!this.assembler.isAssembling()) {
        this.lastModifiedMemoryAddress = address;
        this.$refs.dataMemory[Math.max(address - 4, 0)].scrollIntoView();
      }
    },

    onPortUpdate: function (io, address, value) {
      console.log('UPATED');
      this.lastModifiedPort = address;
      this.$refs.ports[Math.max(address - 4, 0)].scrollIntoView();
    },

    onRegisterUpdate: function (register, value) {
      console.log(register);
      if (register == 'SP') {
        this.$refs.stackMemory[Math.max(value - 4, 0)].scrollIntoView();
      }
    },
  },
  created: function() {},
  mounted: function() {
    var self = this;
    var regex = /(?:MOVEI|MOVE|COMPAREI|COMPARE|JUMP|JLESS|JEQUAL|JGREATER|ADDI|ADD|INC|SUBI|SUB|DEC|CALL|RET|PUSH|POP|STOP|IN|OUT)\b/;

    this.$store.dispatch('loadSource', this.$route.params.entryId).then(function (response) {
      self.$store.state.simulator.entry = response.body;

      self.$store.state.simulator.content = response.body.source.content;
    });

    this.runtimeEnvironment = new RuntimeEnvironment(instructionSet);
    this.runtimeEnvironment.setCallbacks({
      onMemoryUpdate: this.onMemoryUpdate,
      onRegisterUpdate: this.onRegisterUpdate,
      onPortUpdate: this.onPortUpdate
    });

    this.memory = this.runtimeEnvironment.getMemory().getData();
    this.registers = this.runtimeEnvironment.getRegisters().getData();
    this.ports = this.runtimeEnvironment.getIo().getData();

    this.assembler = new Assembler(this.runtimeEnvironment.getMemory(), instructionSet);

    // Para poder manipular los puertos desde la consola del navegador.
    window.easy8 = {
      io: this.runtimeEnvironment.getIo(),
      IODevices: IODevices
    };
  }
};
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }

  .main-layout {
    display: flex;
    flex-direction: column;
    /*height: 100%;
    max-height: 100%;*/
    height: calc(100vh - 40px);

    overflow-y: auto;
  }

  .button-area {
    padding: 15px;
  }

  .button-area .right {
    float: right;
  }

  .editor-and-registers {
    display: flex;
    flex-wrap: wrap;
    flex-grow: 1;
    flex-basis: 40%;
    padding-bottom: 10px;
  }

  .editor-container {
    padding: 0 10px 10px 10px;
    width: 50%;
  }

  .editor-container .vue-codemirror {
    border: solid 1px #d6d6d6;
    height: 100%;
  }

  .editor-container .vue-codemirror >>> .CodeMirror {
    height: 100%;
  }

  .registers {
    display: flex;
    justify-content: center;
    width: 50%;
    align-items: flex-start;
  }

  .registers .register {
    padding: 13px 25px;
    border: solid 1px #cbcbcb;
    margin: 0 5px;
    min-width: 75px;
    background-color: white;
  }

  .registers .register h2 {
    font-size: 80%;
    margin: 0 0 5px 0;
    padding: 0;
    text-align: center;
    color: #525252;
  }

  .registers .register .value {
    text-align: center;
    font-size: 110%;
    font-family: monospace;
  }

  .memory-displays {
    width: 100%;
    display: flex;
    /*max-height: 100%;*/
    overflow-y: hidden;
  }

  .memory-displays .memory {
    flex-grow: 1;
    border: solid 1px #cbcbcb;
    background-color: white;
    margin: 10px;
    flex-basis: 25%;
    /*overflow-y: auto;*/
    display: flex;
    flex-direction: column;
  }

  .memory-displays .memory h2 {
    padding: 10px 0;
    margin: 0;
    font-size: 80%;
    text-align: center;
    color: #4c4c4c;
  }

  .memory-displays .memory .scroll {
    overflow-y: scroll;
  }

  .memory-displays .memory .entry {
    font-family: monospace;
    padding: 3px 10px;
    font-size: 12px;
  }

  .memory-displays .memory .entry .address {
    color: #6b6b6b;
    margin-right: 10px;
  }

  .memory-displays .memory .entry:nth-child(even) {
    background-color: #fcfcfc;
  }

  .memory-displays .memory .entry:hover {
    background-color: #eeeeee;
  }

  .memory-displays .memory .entry.highlight {
    background-color: #dfdfdf;
  }

</style>
