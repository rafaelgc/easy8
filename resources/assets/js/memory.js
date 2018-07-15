/*=====================================================
 MEMORIA PRINCIPAL
 Contiene un array 'bytes' con el contenido de la memoria.
 Los datos se almacenan en formato decimal.
 La clase tiene un puntero llamado "assemblyPointer" hacia
 una posición de memoria que determina en qué posición
 guardar el siguiente byte de código durante el ensamblado.
 La memoria recibe como parámetro:
 -Los registros. Los necesita para acceder al contador de programa (PC).
 -Tamaño de la memoria (opcional). Por defecto es 256.
 */

export default class Memory {
  constructor(registers, size) {
    this.registers = registers;
    this.size = size ? size : 256;
    this.bytes = [];
    this.assemblyPointer = 0;

    this.clear();
  }

  //Escribe bytes de manera sucesiva. Usado durante el ensamblado.
  writeByte(byte) {
    this.bytes[this.assemblyPointer] = byte;
    this.assemblyPointer++;
  }

  //Reinicia la memoria.
  clear() {
    this.bytes = [];
    for (var i = 0; i < this.size; i++) {
      this.bytes.push(0);
    }
    this.assemblyPointer = 0;
  }

  //Lee el contenido apuntado por el contador de programa.
  readByte() {
    return this.bytes[this.registers.get('PC')];
  }

  //Mueve hacia adelante el contador de programa.
  //Devuelve el contenido de la memoria en ese punto.
  nextByte() {
    this.registers.incr('PC');
    return this.bytes[this.registers.get('PC')];
  }

  //Escribir un valor en una dirección.
  writeAddress(address, value) {
    this.bytes[address] = value;

    if (this.onUpdateCallback) this.onUpdateCallback(this);
  }

  //Leer un valor de una dirección.
  readAddress(address) {
    return this.bytes[address];
  }

  print() {
    console.log(this.bytes);
  }

  onUpdate(func) {
    this.onUpdateCallback = func;
  }

  getSize() {
    return this.size;
  }

  getData() {
    return this.bytes;
  }
}

