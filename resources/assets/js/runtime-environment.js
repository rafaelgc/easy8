/*=====================================================
 * SIMULADOR DE EJECUCIÓN
 *
 * */

import Registers from './registers';
import Memory from './memory';
import IO from './io';

export default class RuntimeEnvironment {
  constructor(instructionSet) {
    this.instructionSet = instructionSet;
    this.registers = new Registers();
    this.memory = new Memory(this.registers);
    this.io = new IO();

    this.int = null;
    this.running = false;
    this.sleeping = false;
    this.finished = false;

    this.tagsTable = {};
    this.unresolvedTags = [];

    this.callbacks = {};

  }

  getMemory() {
    return this.memory;
  }

  setCallbacks(callbacks) {
    /*Callbacks posibles:
     *
     * onMemoryUpdate -> la memoria principal ha sido actualizada.
     * onRegisterUpdate -> un registro ha sido actualizado.
     * onOutputUpdate -> la salida ha sido actualizada.
     * onSyntaxError -> error de sintaxis durante el ensamblado.
     * onInputRequest -> el programa solicita la entrada de algún dato.
     * */
    this.callbacks = callbacks;
  
    callbacks.onMemoryUpdate && this.memory.onUpdate(callbacks.onMemoryUpdate);
    callbacks.onRegistersUpdate && this.registers.onUpdate(callbacks.onRegistersUpdate);
    callbacks.onOutputUpdate && this.io.onOutputUpdate(callbacks.onOutputUpdate);
    callbacks.onInputRequest && this.io.onInputRequest(callbacks.onInputRequest);
  };
  
  assembly(sourceCode) {
    this.sourceCode = sourceCode;
  
    var lines = sourceCode.split('\n');
  
    this.tagsTable = {};
    this.unresolvedTags = [];
  
    //Reiniciar la memoria.
    this.memory.clear();
  
    var success = true;
  
    for (var i = 0; i < lines.length; i++) {
  
      if (!lines[i]) {
        continue;
      }
  
      var tokens = this.parseLine(lines[i]);

      console.log(tokens);
  
      //tokens[0] debe contener el comentario si la línea es un comentario.
      //tokens[1] contiene el mnemotécnico.
      //tokens[2] y tokens[3] contendrán los parámetros, si procede.
      //token[4] contendrá la etiqueta.
      if (!tokens) {
        this.callbacks.onSyntaxError &&
        this.callbacks.onSyntaxError(lines[i]);
        success = false;
        break;
      }
  
      //Si tokens.tag tiene algún valor significa que
      //hay una etiqueta y hay que almacenar
      //la dirección en la tabla de etiquetas que se usará posteriormente
      //en la etapa de resolución.
      if (tokens.tag) {
        this.tagsTable[tokens.tag] = this.memory.assemblyPointer;
      }
  
  
      if (!tokens.mnemotecnic) {
        //Es un comentario o un blanco, se pasa a la siguiente línea.
        continue;
      }
  
      //Buscar las instrucciones que coinciden en el array instructionSet.
      //Generalmente solo habrá un resulado pero alguna instrucción
      //aparece dos veces.
      var instructions = this.getInstructionsByMnemotic(tokens.mnemotecnic);

      console.log('A');
      this.callbacks.onSyntaxError('Holi');
      console.log('B');

      if (instructions.length === 0) {
        console.log(this.callbacks);
        //No se ha encontrado la instrucción correspondiente a un
        //mnemotécnico. Probablemente está mal escrito.
        this.callbacks.onSyntaxError &&
        this.callbacks.onSyntaxError(lines[i]);
        success = false;
        break;
      }
  
  
      //TODO: si todas devuelven false, error de sintaxis.
      for (var j = 0; j < instructions.length; j++) {
        if (instructions[j].assembly(this.memory, [tokens.param1, tokens.param2], this)) {
          break;
        }
      }
    }
  
    //Etapa de resolución.
    if (!this.resolveTags()) {
      success = false;
      this.callbacks.onSyntaxError('Etiqueta no encontrada.');
    }
  
    if (!success) {
      this.memory.clear();
    }
  };
  
  parseLine(line) {
    if (!line) return null;
  
    //La expresión regular comprueba que la instrucción tenga una de las
    //siguientes estructuras:
    //1. X Y Z  (P. ej.: MOVE RA, DIR)
    //2. X Y    (P. ej.: IN 01)
    //3. X      (P. ej.: STOP)
    //4. #COMENTARIO
    //5. [blancos]
    //Notar que la expresión regular se usa para comprobar la estructura
    //general de la instrucción y para tokenizarla. Sin embargo, los distintos
    //tokens no son validados. Ese trabajo se delega al método assembly de
    //la instrucción de turno.
    var results = line.match(/^(?:(?:\s*#.*)|(?:\s+)|(?:\s*(@\w+):\s*(?:#.*)?)|(?:\s*(?:(@\w+):)?\s*(\w+)(?:\s+(@?\w+)\s*(?:,\s*(@?\w+))?)?\s*(#.*)?))$/);
  
    if (!results) return null;
  
    return {
      tag: results[2] ? results[2] : results[1],
      mnemotecnic: results[3],
      param1: results[4],
      param2: results[5]
    };
  
  };
  
  run() {
    //Si se provoca la ejecución cuando ya estaba
    //ejecutándose el programa se reinicia el intervalo.
    if (this.int) {
      clearInterval(this.int);
    }
  
    this.running = true;
    this.sleeping = false;
  
    this.resetProgram();
  
    var self = this;
  
    this.int = setInterval(function () {
  
      if (self.running && !self.sleeping) {
        self.runStep();
      }
  
    }, 2);
  };
  
  runStep(goForward) {
    var byte = this.memory.readByte();
    console.log('PC: ' + this.registers.get('PC'));
  
    var instruction = this.getInstructionByCode(byte);
    console.log(instruction);
  
    if (!instruction) {
      console.log('Error de ejecución.');
      this.stop();
      //TODO
    }
    else if (!instruction.run) {
      console.log('Sin implementación para: ');
      console.log(instruction);
      this.stop();
    }
    else {
      if (instruction.run(this.memory, this.registers, this.io, this)) {
        this.stop();
      }
      else {
        //Cuando una instrucción detiene la ejecución se quiere
        //que el PC se mantenga en esa instrucción y no pase a
        //la siguiente.
        this.memory.nextByte();
      }
    }
  };
  
    resetProgram() {
    //this.assembly(this.sourceCode);
  
    //Reiniciar registros.
    this.registers.reset();
  
    //El puntero de pila apunta al final de la memoria.
    this.registers.set('SP', this.memory.size - 1);
  }
  
  stop() {
    this.running = false;
    this.sleeping = false;
  
    clearInterval(this.int);
  };
  
  sleep(timeout) {
    this.sleeping = true;
  
    var self = this;
  
    if (timeout) {
      setTimeout(function () { self.wakeUp(); }, timeout);
    }
  };
  
  wakeUp() {
  
    if (!this.sleeping) return;
    this.sleeping = false;
  };
  
  /*Si, durante el ensamblado, alguna instrucción hace referencia
   * a una etiqueta, se almacena la etiqueta y en qué posición habría
   * que guardar la dirección a la que referencia.
   *
   * Tras el ensamblado, cuando ya se deberían conocer las direcciones
   * de todas las etiquetas, se inicia la etapa de resolución.
   * */
  addUnresolvedTag(tag, memoryAddress) {
    //Se almacena la etiqueta del tag sin resolver
    //y la dirección en memoria DONDE SE DEBERÁ ESCRIBIR LA DIRECCIÓN DEFINITIVA.
    this.unresolvedTags.push({tag: tag, address: memoryAddress});
  };
  
  isTag(token) {
    if (token[0] == '@') {
      return true;
    }
  };
  
  /*
   * La etapa de resolución se inicia cuando se ha realizado el ensamblado.
   * En este punto ya, salvo que el programador cometa un error, ya se
   * conoce aqué dirección referencian todas las etiquetas.
   * Por tanto, aquí habrá que buscar todas las instrucciones que usaban
   * alguna etiqueta para reemplazarla por la dirección real en memoria.
   * */
  resolveTags() {
    for (var i = 0; i < this.unresolvedTags.length; i++) {
      // address contendrá la dirección a la que se referencia
      var address = this.tagsTable[this.unresolvedTags[i].tag];
      if (address === undefined) {
        return false;
      }
  
      //unresolvedTags[i].address es la dirección donde se
      //usó la etiqueta y donde habrá que escribir la dirección
      //definitiva.
      this.memory.writeAddress(this.unresolvedTags[i].address, address);
  
    }
  
    return true;
  }


  /*
   AUXILIARES
   */

  /*
   Devuelve las instrucciones que tienen como mnemotécnico
   el que se pasa por parámetro. Notar que devuelve un array
   porque puede haber varias instrucciones con el mismo
   mnemotécnico.
   */
  getInstructionsByMnemotic(mnemotic) {
    var resInstructions = [];

    for (var i = 0; i < this.instructionSet.length; i++) {
      if (this.instructionSet[i].mnemotic === mnemotic) {
        resInstructions.push(this.instructionSet[i]);
      }
    }

    return resInstructions;
  }

  getInstructionByCode(code) {
    for (var i = 0; i < this.instructionSet.length; i++) {
      if (code === this.instructionSet[i].code) {
        return this.instructionSet[i];
      }
    }
    return null;
  }

}