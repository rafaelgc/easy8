<template>
  <div class="alert" v-bind:class="[type]" v-if="visible"><slot></slot></div>
</template>

<script>
export default {
  props: ['type', 'visible']
}
</script>

<style scoped>
  .alert {
    padding: 15px;
    border: #f1f1f1 solid 1px;
    border-left: #f1f1f1 solid 4px;
    background-color: #fdfdfd;
  }

  .error {
    border-left-color: #c41212;
  }

  .success {
    border-left-color: #429146;
  }

  .info {
    border-left-color: rgb(21, 144, 192);
  }

</style>
