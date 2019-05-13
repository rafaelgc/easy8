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
import ALU from './alu';

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
      var top = memory.readAddress(registers.get('SP') + 1);
      if (registers.get('SP') < memory.size - 1) {
        registers.incr('SP', 1);
        memory.writeAddress(registers.get('SP'), 0);
        registers.set('RA', top);
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
    run: function (memory, registers, io, environment) {
      registers.set('RA', environment.nextByte());
    }
  },
  {
    mnemotic: 'MOVE',
    code: 1,
    assembly: assemblyRules.moveAssembly,
    run: function (memory, registers, io, environment) {
      var addr = environment.nextByte();
      registers.set('RA', memory.readAddress(addr));
    }
  },
  {
    mnemotic: 'MOVE',
    code: 2,
    assembly: assemblyRules.moveAssembly,
    run: function (memory, registers, io, environment) {
      var v = environment.nextByte();
      memory.writeAddress(v, registers.get('RA'));
    }
  },
  {
    mnemotic: 'ADDI',
    code: 3,
    assembly: assemblyRules.raValueAssembly,
    run: function (memory, registers, io, environment) {
      registers.incrUpdatingFlags('RA', environment.nextByte());
    }
  },
  {
    mnemotic: 'ADD',
    code: 4,
    assembly: assemblyRules.raValueAssembly,
    run: function (memory, registers, io, environment) {
      var addr = environment.nextByte();
      registers.incrUpdatingFlags('RA', memory.readAddress(addr));
    }
  },
  {
    mnemotic: 'SUBI',
    code: 5,
    assembly: assemblyRules.raValueAssembly,
    run: function (memory, registers, io, environment) {
      registers.decrUpdatingFlags('RA', environment.nextByte());
    }
  },
  {
    mnemotic: 'SUB',
    code: 6,
    assembly: assemblyRules.raValueAssembly,
    run: function (memory, registers, io, environment) {
      var addr = environment.nextByte();
      registers.decrUpdatingFlags('RA', memory.readAddress(addr));
    }
  },
  {
    mnemotic: 'COMPAREI',
    code: 9,
    assembly: assemblyRules.valueDirAssembly,
    run: function (memory, registers, io, environment) {
      var val = environment.nextByte();
      ALU.sumUpdatingFlags(registers.get('RA'), -val, 8, registers);
    }
  },
  {
    mnemotic: 'COMPARE',
    code: 10,
    assembly: assemblyRules.valueDirAssembly,
    run: function (memory, registers, io, environment) {
      var val = memory.readAddress(environment.nextByte());
      ALU.sumUpdatingFlags(registers.get('RA'), -val, 8, registers);
    }
  },
  {
    mnemotic: 'JUMP',
    code: 11,
    assembly: assemblyRules.valueDirAssembly,
    run: function (memory, registers, io, environment) {
      //environment.nextByte() desplaza el PC a la
      //siguiente posición y devuelve el contenido
      //de la memoria en ese punto. En este caso, esa posición
      //contiene la dirección objetivo del salto.
      var target = environment.nextByte();

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
    run: function (memory, registers, io, environment) {
      var target = environment.nextByte();

      if (registers.get('N')) {
        registers.set('PC', target - 1);
      }
    }
  },
  {
    mnemotic: 'JGREATER',
    code: 13,
    assembly: assemblyRules.valueDirAssembly,
    run: function (memory, registers, io, environment) {
      var target = environment.nextByte();

      if (!registers.get('N') && !registers.get('Z')) {
        registers.set('PC', target - 1);
      }
    }
  },
  {
    mnemotic: 'JEQUAL',
    code: 14,
    assembly: assemblyRules.valueDirAssembly,
    run: function (memory, registers, io, environment) {
      var target = environment.nextByte();
      if (registers.get('Z') === 1) {
        registers.set('PC', target - 1);
      }
    }
  },
  {
    mnemotic: 'CALL',
    code: 17,
    assembly: assemblyRules.valueDirAssembly,
    run: function (memory, registers, io, environment) {
      registers.set('RET', registers.get('PC') + 1);
      //Se suma +1 para que registers.ret apunte a
      //la dirección donde está el parámetro del CALL
      //y no al propio CALL. Nota: cuando se dan saltos registers.ret
      //debe ser la dirección anterior al objetivo porque
      //en el bucle de ejecución de las instrucciones se realizará
      //un incremento justo después de la ejecución del salto.
      var target = environment.nextByte() - 1;
      registers.set('PC', target);

    }
  },
  {
    mnemotic: 'IN',
    code: 19,
    assembly: assemblyRules.valueDirAssembly,
    run: function (memory, registers, io, runtimeEnvironment) {
      var port = runtimeEnvironment.nextByte();
      registers.set('RA', io.readPort(port));
    }
  },
  {
    mnemotic: 'OUT',
    code: 20,
    assembly: assemblyRules.valueDirAssembly,
    run: function (memory, registers, io, environment) {
      var port = environment.nextByte();
      io.writePort(port, registers.get('RA'));
    }
  },
  {
    mnemotic: 'SLEEP',
    code: 22,
    assembly: assemblyRules.valueDirAssembly,
    run: function (memory, registers, io, runtimeEnvironment) {
      var addr = runtimeEnvironment.nextByte();
      runtimeEnvironment.sleep(memory.readAddress(addr) * 1000);
    }
  },
  {
    mnemotic: 'SLEEPI',
    code: 23,
    assembly: assemblyRules.valueDirAssembly,
    run: function (memory, registers, io, runtimeEnvironment) {
      runtimeEnvironment.sleep(runtimeEnvironment.nextByte() * 1000);
    }
  },
  {
    mnemotic: 'RAND',
    code: 24,
    assembly: assemblyRules.oneByteAssembly,
    run: function (memory, registers) {
      registers.set('RA', Math.floor(Math.random() * 255) + 1);
    }
  },
  {
    mnemotic: 'BYTE',
    code: -1,
    assembly: function (assembler, params) {
      assembler.writeByte(parseInt(params[0], 16));
      return true;
    }
  },
  {
    mnemotic: 'LOAD_Z',
    code: 25,
    assembly: assemblyRules.oneByteAssembly,
    run: function (memory, registers) {
      registers.set('RA', registers.get('Z'));
    }
  },
  {
    mnemotic: 'LOAD_N',
    code: 26,
    assembly: assemblyRules.oneByteAssembly,
    run: function (memory, registers) {
      registers.set('RA', registers.get('N'));
    }
  },
  {
    mnemotic: 'LOAD_C',
    code: 27,
    assembly: assemblyRules.oneByteAssembly,
    run: function (memory, registers) {
      registers.set('RA', registers.get('C'));
    }
  },
  {
    mnemotic: 'LOAD_V',
    code: 28,
    assembly: assemblyRules.oneByteAssembly,
    run: function (memory, registers) {
      registers.set('RA', registers.get('V'));
    }
  },
  {
    mnemotic: 'LOAD_NV',
    code: 29,
    assembly: assemblyRules.oneByteAssembly,
    run: function (memory, registers) {
      registers.set('RA', registers.get('NV'));
    }
  },

];