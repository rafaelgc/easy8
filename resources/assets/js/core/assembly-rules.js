/*=====================================================
 FUNCIONES DE ENSAMBLAJE Y COMPROBACIÓN DE PARÁMETROS
 Las siguientes funciones comprueban si determinada instrucción
 tiene unos parámetros correctos (p. ej.: MOVE RA, 66 -> OK; MOVE BB, 66 -> ERROR)
 Además se encarga de escribir en la memoria la instrucción. Cada función
 se encarga de almacenar un tipo determinado de instrucción.
 Si siguen un formato incorrecto las funciones devolverán false y si es correcto true.
 */

export default {
  /*
   Ensamblaje de instrucciones que se codifican con un sólo byte
   como STOP o INC RA
   */
  oneByteAssembly(assembler, params) {
    assembler.writeByte(this.code);
    return true;
  },

  /*
   Ensamblaje de instrucciones que se codifican con dos bytes
   y que tienen el formato MNEMOTECNICO + RA + DIRECCION/VALOR
   */
  raValueAssembly(assembler, params) {
    if (params[0] !== 'RA') return false;

    assembler.writeByte(this.code);
    //La entrada viene codificada en hexadecimal pero se convierte
    //a entero.

    //TODO: COMPROBAR FORMATO DE params[1]

    assembler.writeAddressOrTag(params[1]);
    //memory.writeByte(parseInt(params[1], 16));

    return true;
  },

  /*
   Ensamblaje de la instrucción MOVE que puede tener dos formas:
   -MOVE RA, DIR
   -MOVE DIR, RA
   Hay que diferenciarlas usando su código.
   */
  moveAssembly(assembler, params) {
    if (this.code === 1 && params[0] === 'RA') {
      assembler.writeByte(this.code);
      //TODO Mejorar errores
      //memory.writeByte(parseInt(params[1], 16));
      assembler.writeAddressOrTag(params[1]);
      return true;
    }
    else if (this.code === 2 && params[1] === 'RA') {
      assembler.writeByte(this.code);
      //TODO
      //memory.writeByte(parseInt(params[0], 16));
      assembler.writeAddressOrTag(params[0]);
      return true;
    }
    else {
      return false;
    }
  },

  /*
   Ensamblaje de instrucciones que se codifican con dos bytes
   y que tienen el formano MNEMOTECNICO + DIRECCION/VALOR.
   */
  valueDirAssembly(assembler, params) {
    assembler.writeByte(this.code);
    assembler.writeAddressOrTag(params[0]);
    // TODO check params[0] is numeric.
    return true;
  }

};