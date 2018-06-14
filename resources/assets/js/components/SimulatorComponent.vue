<template>
  <div>
    <div class="button-area">
      <a class="btn primary">Ensamblar y ejecutar</a>
      <a class="btn">Ensamblar</a>
      <a class="btn">Parar</a>
      <a class="btn">Ejecutar paso</a>
    </div>
    <div class="editor-container">
      <textarea id="editor"></textarea>  
    </div>
    
  </div>
</template>

<script>
export default {
  created: function() {},
  mounted: function() {
    var regex = /(?:MOVEI|MOVE|COMPAREI|COMPARE|JUMP|JLESS|JEQUAL|JGREATER|ADDI|ADD|INC|SUBI|SUB|DEC|CALL|RET|PUSH|POP|STOP|IN|OUT)\b/;

    console.log(CodeMirror);

    var editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
      lineNumbers: true,
      mode: "simplemode"
    });

    this.$store.dispatch('loadSource', this.$route.params.entryId).then(function (response) {
      editor.setValue(response.body.source.content);
    });
  }
};
</script>

<style>
  #editor {
    z-index: 0;
    border: solid 1px black;
  }

  .button-area {
    padding: 15px;
  }

  .editor-container {
    padding: 10px;
  }

  .CodeMirror {
      border: solid 1px #d6d6d6 !important;
      height: 600px !important;
  }


</style>
