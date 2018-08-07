<template>
  <div class="keyboard">
    <div class="display">
      <span v-bind:key="index" v-for="(i, index) in input">{{ i }}</span>
    </div>
    <div class="hex-keyboard">
      <button v-bind:key="k" v-for="k in keys" v-on:click="keyPress(k)">{{ k }}</button>
    </div>
    <div style="text-align: center; margin-top: 5px;">
      <button class="action"></button>
    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        input: ['0', '0'],
        keys: ['C', 'D', 'E', 'F',
               '8', '9', 'A', 'B',
               '4', '5', '6', '7',
               '0', '1', '2', '3']
      }
    },

    methods: {
      keyPress: function (key) {
        Vue.set(this.input, 0, this.input[1]);
        Vue.set(this.input, 1, key);

        this.$emit('keyPress', { key: key, value: this.toInt() });
      },

      toInt: function () {
        return parseInt(this.input[0].concat(this.input[1]), 16);
      }
    }
  }
</script>

<style scoped>
.keyboard {
  width: 200px;
}

.keyboard .action {
  width: 50px;
  height: 50px;
  background-color: red;
  border-radius: 25px;
  outline: none;
}

.hex-keyboard {
  width: 200px;
  height: 200px;
  background-color: #fafafa;
  display: flex;
flex-wrap: wrap;
}

.keyboard .display {
  padding: 5px;
  background-color: white;
  text-align: right;
  border: solid 1px #2e383c;
}

.hex-keyboard button {
  flex-basis: 25%;
}
</style>