/*=====================================================
 FUNCIONES DE ENSAMBLAJE Y COMPROBACIÓN DE PARÁMETROS
 Las siguientes funciones comprueban si determinada instrucción
 tiene unos parámetros correctos (p. ej.: MOVE RA, 66 -> OK; MOVE BB, 66 -> ERROR)
 Además se encarga de escribir en la memoria la instrucción. Cada función
 se encarga de almacenar un tipo determinado de instrucción.
 Si siguen un formato incorrecto las funciones devolverán false y si es correcto true.
 */

export default {
  writeAddress(dirOrTag, memory, environment) {
    //La dirección que se quiere guardar en la memoria
    // puede se una dirección real o una etiqueta.

    if (environment.isTag(dirOrTag)) {
      //Si es una etiqueta se añade a la lista de etiquetas
      //sin resolver. (Las etiquetas son resueltas más tarde).
      environment.addUnresolvedTag(dirOrTag, memory.assemblyPointer);
      //Como se desconoce la dirección de salto, se guarda un 0
      //de manera provisional.
      memory.writeByte(0);
    }
    else {
      //Si es una dirección real tan sólo hay que
      //guardar la dirección.
      memory.writeByte(parseInt(dirOrTag, 16));
    }
  },

  /*
   Ensamblaje de instrucciones que se codifican con un sólo byte
   como STOP o INC RA
   */
  oneByteAssembly(memory, params) {
    memory.writeByte(this.code);
    return true;
  },

  /*
   Ensamblaje de instrucciones que se codifican con dos bytes
   y que tienen el formato MNEMOTECNICO + RA + DIRECCION/VALOR
   */
  raValueAssembly(memory, params, environment) {
    if (params[0] !== 'RA') return false;

    memory.writeByte(this.code);
    //La entrada viene codificada en hexadecimal pero se convierte
    //a entero.

    //TODO: COMPROBAR FORMATO DE params[1]

    this.writeAddress(params[1], memory, environment);
    //memory.writeByte(parseInt(params[1], 16));

    return true;
  },

  /*
   Ensamblaje de la instrucción MOVE que puede tener dos formas:
   -MOVE RA, DIR
   -MOVE DIR, RA
   Hay que diferenciarlas usando su código.
   */
  moveAssembly(memory, params, environment) {
    if (this.code === 1 && params[0] === 'RA') {
      memory.writeByte(this.code);
      //TODO
      //memory.writeByte(parseInt(params[1], 16));
      this.writeAddress(params[1], memory, environment);
      return true;
    }
    else if (this.code === 2 && params[1] === 'RA') {
      memory.writeByte(this.code);
      //TODO
      //memory.writeByte(parseInt(params[0], 16));
      this.writeAddress(params[0], memory, environment);
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
  valueDirAssembly(memory, params, environment) {
    memory.writeByte(this.code);
    this.writeAddress(params[0], memory, environment);
    return true;
  }

};