/*=====================================================
 REGISTROS
 -RA: contenido del registro contador.
 -PC: contador de programa.
 -SP: puntero de pila.
 -RET: dirección previa a la de retorno.
 -Z: si, tras una operación, RA es cero, Z = 1.
 -C: guarda el acarreo de la última operación.
 -N: si, tras una operación, RA es negativo, N = 1.
 */

export default class Registers {
  constructor() {
    this.reset();
  }

  reset() {
    this.regs = {
      ra: 0,
      ret: 0,
      pc: 0,
      z: 0,
      c: 0,
      n: 0,
      sp: 0
    };
  }
  
  get(reg) {
    return this.regs[reg.toLowerCase()];
  }
  
  set(reg, value) {
    this.regs[reg.toLowerCase()] = value;
    this.onUpdateCallback && this.onUpdateCallback(reg, value);
  
    //this.updateZero(reg);
  }
  
  incr(reg, value) {
    if (!value) value = 1;
  
    var newValue = ALU.sum(this.get(reg), value, 8);
  
    this.set(reg, newValue.result);
  
    this.updateZero(reg);
    this.updateCarry(reg, newValue.carry);
    this.updateNegative(reg);
  
    this.onUpdateCallback && this.onUpdateCallback(reg, value);
  }
  
  decr(reg, value) {
    if (!value) value = 1;
  
    this.incr(reg, -value);
  }
  
  updateZero(reg) {
    if ('ra' === reg.toLowerCase()) {
      if (this.get('RA') === 0) {
        this.set('Z', 1);
      }
      else {
        this.set('Z', 0);
      }
    }
  };
  
  updateCarry(reg, carry) {
    if ('ra' === reg.toLowerCase()) {
      this.set('C', carry);
    }
  }
  
  updateNegative(reg) {
    if ('ra' === reg.toLowerCase()) {
      this.set('N', ALU.isNegative(this.get('RA'), 8) ? 1 : 0);
    }
  }
  
  print() {
    console.log('RA: ' + this.get('RA'));
  }
  
  toString() {
    var str = '';
    str = str.concat('RA\t' + ALU.ca2ToInt(this.get('RA'), 8) + '\n');
    str = str.concat('PC\t' + this.get('PC') + '\n');
    str = str.concat('SP\t' + this.get('SP') + '\n');
    str = str.concat('Z\t' + this.get('Z') + '\n');
    str = str.concat('C\t' + this.get('C') + '\n');
    str = str.concat('N\t' + this.get('N') + '\n');
    return str;
  }
  
  onUpdate(func) {
    this.onUpdateCallback = func;
  }

}
