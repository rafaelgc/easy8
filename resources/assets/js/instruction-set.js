/*=====================================================
 SET DE INSTRUCCIONES
 El siguiente array almacena el juego de instrucciones del Easy8
 junto con información sobre la instrucción:
 -mnemotic: código mnemotécnico de la instrucción.
 -code: código (decimal) que se usará para el ensamblado.
 -assembly: función que se ejecutará cuando se esté ensamblado
 la instrucción. La función recibe los siguientes parámetros:
 -memory: la memoria principal donde se escribirá la función.
 -params: array con los parámetros de la instrucción.
 -environtment: instancia del RuntimeEnvirontment.
 La función assembly deberá comprobar que los parámetros
 tienen el formato correcto. Si es así, deberá devolver
 true. Si no, devolverá false.
 La función assembly debe escribir en la memoria la
 codificación de la instrucción junto con los parámetros,
 si los tiene.
 -run: la función de ejecución de la instrucción. Recibe como
 parámetros:
 -memory: memoria principal.
 -registers: registros.
 -io: instancia de IO.
 -environment: instancia del entorno de ejecución.
 Si la función devuelve true se terminará la ejecución del programa,
 como haría la instrucción STOP.
 Si la función devuelve false o no devuelve nada, la ejecución
 sigue su curso.
 */

import assemblyRules from './assembly-rules';

export default [
  /*CODIFICADOS EN UN BYTE*/
  {
    mnemotic: 'STOP',
    code: 21,
    assembly: assemblyRules.oneByteAssembly,
    run: function () {
      return true; //Fin de la ejecución.
    }
  },
  {
    mnemotic: 'INC',
    code: 7,
    assembly: assemblyRules.oneByteAssembly,
    run: function (memory, registers) {
      registers.incr('RA');
    }
  },
  {
    mnemotic: 'DEC',
    code: 8,
    assembly: assemblyRules.oneByteAssembly,
    run: function (memory, registers) {
      registers.decr('RA');
    }
  },
  {
    mnemotic: 'PUSH',
    code: 15,
    assembly: assemblyRules.oneByteAssembly,
    run: function (memory, registers) {
      memory.writeAddress(registers.get('SP'), registers.get('RA'));
      registers.decr('SP', 1);
    }
  },
  {
    mnemotic: 'POP',
    code: 16,
    assembly: assemblyRules.oneByteAssembly,
    run: function (memory, registers) {
      if (registers.get('SP') < memory.size - 1) {
        //TODO: ¿se pone a 0?
        registers.incr('SP', 1);
        memory.writeAddress(registers.get('SP'), 0);
      }
    }
  },
  {
    mnemotic: 'RET',
    code: 18,
    assembly: assemblyRules.oneByteAssembly,
    run: function (memory, registers) {
      registers.set('PC', registers.get('RET'));
    }
  },
  /*CODIFICADOS EN DOS BYTES*/
  {
    mnemotic: 'MOVEI',
    code: 0,
    assembly: assemblyRules.raValueAssembly,
    run: function (memory, registers) {
      registers.set('RA', memory.nextByte());
    }
  },
  {
    mnemotic: 'MOVE',
    code: 1,
    assembly: assemblyRules.moveAssembly,
    run: function (memory, registers) {
      var addr = memory.nextByte();
      registers.set('RA', memory.readAddress(addr));
    }
  },
  {
    mnemotic: 'MOVE',
    code: 2,
    assembly: assemblyRules.moveAssembly,
    run: function (memory, registers) {
      var v = memory.nextByte();
      memory.writeAddress(v, registers.get('RA'));
    }
  },
  {
    mnemotic: 'ADDI',
    code: 3,
    assembly: assemblyRules.raValueAssembly,
    run: function (memory, registers) {
      registers.incr('RA', memory.nextByte());
    }
  },
  {
    mnemotic: 'ADD',
    code: 4,
    assembly: assemblyRules.raValueAssembly,
    run: function (memory, registers) {
      var addr = memory.nextByte();
      registers.incr('RA', memory.readAddress(addr));
    }
  },
  {
    mnemotic: 'SUBI',
    code: 5,
    assembly: assemblyRules.raValueAssembly,
    run: function (memory, registers) {
      registers.decr('RA', memory.nextByte());
    }
  },
  {
    mnemotic: 'SUB',
    code: 6,
    assembly: assemblyRules.raValueAssembly,
    run: function (memory, registers) {
      var addr = memory.nextByte();
      registers.decr('RA', memory.readAddress(addr));
    }
  },
  {
    mnemotic: 'COMPAREI',
    code: 9,
    assembly: assemblyRules.raValueAssembly,
    run: function (memory, registers) {
      var val = memory.nextByte();
      var res = ALU.sum(registers.get('RA'), -val, 8);
      registers.set('Z', res.result === 0 ? 1 : 0);
      registers.set('N', ALU.isNegative(res.result, 8) ? 1 : 0);
      registers.set('C', res.carry);
    }
  },
  {
    mnemotic: 'COMPARE',
    code: 10,
    assembly: assemblyRules.raValueAssembly,
    run: function (memory, registers) {
      var val = memory.readAddress(memory.nextByte());
      var res = ALU.sum(registers.get('RA'), -val, 8);
      registers.set('Z', res.result === 0 ? 1 : 0);
      registers.set('N', ALU.isNegative(res.result, 8) ? 1 : 0);
      registers.set('C', res.carry);
    }
  },
  {
    mnemotic: 'JUMP',
    code: 11,
    assembly: assemblyRules.valueDirAssembly,
    run: function (memory, registers, environment) {
      //Memory.nextByte() desplaza el PC a la
      //siguiente posición y devuelve el contenido
      //de la memoria en ese punto. En este caso, esa posición
      //contiene la dirección objetivo del salto.
      var target = memory.nextByte();

      //Se establece el contador de programa
      //para que la siguiente instrucción a ejecutar
      //sea a la que apunta target. Hay que restar 1 porque
      //después de ejecutar esta función se pasa al siguiente byte.
      registers.set('PC', target - 1);

    }
  },
  {
    mnemotic: 'JLESS',
    code: 12,
    assembly: assemblyRules.valueDirAssembly,
    run: function (memory, registers) {
      var target = memory.nextByte();

      if (registers.get('N')) {
        registers.set('PC', target - 1);
      }
    }
  },
  {
    mnemotic: 'JGREATER',
    code: 13,
    assembly: assemblyRules.valueDirAssembly,
    run: function (memory, registers) {
      var target = memory.nextByte();

      if (!registers.get('N') && !registers.get('Z')) {
        registers.set('PC', target - 1);
      }
    }
  },
  {
    mnemotic: 'JEQUAL',
    code: 14,
    assembly: assemblyRules.valueDirAssembly,
    run: function (memory, registers) {
      var target = memory.nextByte();
      if (registers.get('Z') === 1) {
        registers.set('PC', target - 1);
      }
    }
  },
  {
    mnemotic: 'CALL',
    code: 17,
    assembly: assemblyRules.valueDirAssembly,
    run: function (memory, registers) {
      registers.set('RET', registers.get('PC') + 1);
      //Se suma +1 para que registers.ret apunte a
      //la dirección donde está el parámetro del CALL
      //y no al propio CALL. Nota: cuando se dan saltos registers.ret
      //debe ser la dirección anterior al objetivo porque
      //en el bucle de ejecución de las instrucciones se realizará
      //un incremento justo después de la ejecución del salto.
      var target = memory.nextByte() - 1;
      registers.set('PC', target);

    }
  },
  {
    mnemotic: 'IN',
    code: 19,
    assembly: assemblyRules.valueDirAssembly,
    run: function (memory, registers, io, runtimeEnvironment) {
      if (memory.nextByte() == 0) {
        runtimeEnvironment.sleep();
        io.getInputRequest(function (input) {
          registers.set('RA', parseInt(input, 16));
          runtimeEnvironment.wakeUp();
          console.log('retomar ejecucion: ' + registers.get('PC'));
        });
      }
    }
  },
  {
    mnemotic: 'OUT',
    code: 20,
    assembly: assemblyRules.valueDirAssembly,
    run: function (memory, registers, io) {
      var port = memory.nextByte();
      if (port == 1) {
        io.setOutput(registers.get('RA'));
      }
    }
  },
  {
    mnemotic: 'SLEEP',
    code: 22,
    assembly: assemblyRules.valueDirAssembly,
    run: function (memory, registers, io, runtimeEnvironment) {
      runtimeEnvironment.sleep(memory.nextByte() * 1000);
    }
  },
  {
    mnemotic: 'RAND',
    code: 23,
    assembly: assemblyRules.oneByteAssembly,
    run: function (memory, registers) {
      registers.set('RA', Math.floor(Math.random() * 255) + 1);
    }
  },
  {
    mnemotic: 'BYTE',
    code: -1,
    assembly: function (memory, params) {
      memory.writeByte(parseInt(params[0], 16));
      return true;
    }
  }

];