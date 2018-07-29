class Processor {
  constructor() {
    this.registers = {
      ra: 0,
      ret: 0,
      pc: 0,
      z: 0,
      c: 0,
      n: 0,
      sp: 0
    }
  }

  getRegisters() {
    return this.registers;
  }

  getPC() {
    return this.registers.pc;
  }

  getRA() {
    return this.registers.ra;
  }
}