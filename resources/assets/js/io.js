/*=====================================================
 INPUT/OUTPUT
 */

export default class IO {
  constructor() {
    this.output = 0;
  }

  /*Método para establecer el valor de la salida.*/
  setOutput(output) {
    this.output = ALU.ca2ToInt(output, 8);
    this.onUpdateOutputCallback && this.onUpdateOutputCallback(this.output);
  }

  /*Método para solicitar la entrada de un dato.*/
  getInputRequest(func) {
    this.onInputRequestCallback && this.onInputRequestCallback(func);
  }

  onOutputUpdate(func) {
    this.onUpdateOutputCallback = func;
  }

  onInputRequest(func) {
    this.onInputRequestCallback = func;
  }

}
