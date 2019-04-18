/*=====================================================
 INPUT/OUTPUT
 */

export const IODevices = {
  KEYBOARD: 0,
  DISPLAY: 1,
  K_BUTTON: 2,
  TEMPERATURE_SENSOR: 6,
  SWITCHES: 8,
  LEDS: 9,
  BUTTON: 170,
};

import Vue from 'vue';

export default class IO {

  constructor() {
    this.output = 0;
    this.ports = Array(256).fill(0);
    this.onUpdateCallback = null;
  }

  clear() {
    for (var i = 0; i < this.ports.length; i++) {
      this.ports[i] = 0;
    }
  }

  readPort(port) {
    return this.ports[port];
  }

  writePort(port, value) {
    this.ports[port] = value;
    this.onUpdateCallback && this.onUpdateCallback(this, port, value);
  }

  getData() {
    return this.ports;
  }

  onUpdate(callback) {
    this.onUpdateCallback = callback;
  }

}
