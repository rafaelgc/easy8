<template>
  <div class="leds">
      <span class="led" v-bind:class="{ on: i }" v-bind:key="index" v-for="(i, index) in state"></span>
  </div>
</template>

<script>
  export default {
    props: ['value'],
    data: function () {
      return {
        state: [false, false, false, false, false, false, false, false]
      }
    },

    watch: {
      value: function (val) {
        console.log(val);
        if (val === undefined) return;

        console.log(val);

        this.setValue(val);
      }
    },

    methods: {
      setValue: function (val) {
        console.log('setValue');
        for (var i = 0; i < 8; i++) {
          Vue.set(this.state, 7 - i, val & 0x01);
          val = (val >> 1);
        }
      }
    },

    created: function () {
      this.setValue(this.value);
    }
  }
</script>

<style scoped>

  .leds {
    width: 200px;
    text-align: center;
  }

  .led {
    display: inline-block;
    width: 10px;
    height: 25px;
    background-color: grey;
    margin: 1px;
  }

  .led.on {
    background-color: #ff0000;
  }

</style>