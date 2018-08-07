<template>
  <div class="switches">
    <span class="switch" v-bind:class="{ on: i }" v-bind:key="index" v-for="(i, index) in state" v-on:click="switchIt(index)">
      <span class="thing"></span>
    </span>
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

    methods: {
      switchIt: function (index) {
        Vue.set(this.state, index, !this.state[index]);

        this.$emit('changed', this.getIntValue());
      },

      getIntValue: function () {
        var val = 0;

        for (var i = 0; i < 8; i++) {
          val = val << 1;
          val |= this.state[i];
        }

        return val;
      }
    },

    created: function () {
      console.log(this.value);
    }
  }
</script>

<style scoped>
  .switches {
    width: 200px;
    text-align: center;
  }

  .switch {
    display: inline-block;
    width: 15px;
    height: 35px;
    background-color: #d4d4d4;
    margin: 1px;
    position: relative;
    cursor: pointer;
  }

  .switch .thing {
    width: 15px;
    height: 17px;
    position: absolute;
    left: 0px;
    top: 17px;
    background-color: #9c9c9c;
  }

  .switch.on .thing {
    top: 0px;
  }

</style>