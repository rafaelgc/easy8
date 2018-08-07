<template>
  <div class="login-area lshadow">
    <h1>Iniciar sesión</h1>

    <form v-on:submit="register">

      <alert type="error" visible="true" v-bind:key="error" v-for="error in errors">{{ error }}</alert>

      <div class="input-block">
        <label>Nombre</label>
        <input name="email" class="input wide big" v-model="registerData.name">
      </div>
      <div class="input-block">
        <label>Apellidos</label>
        <input name="email" class="input wide big" v-model="registerData.surname">
      </div>
      <div class="input-block">
        <label>Correo electrónico</label>
        <input name="email" class="input wide big" v-model="registerData.email">
      </div>
      <div class="input-block">
        <label>Contraseña</label>
        <input name="password" class="input wide big" type="password" v-model="registerData.password">
      </div>
      <div class="input-block">
        <label>Repetir contraseña</label>
        <input name="password" class="input wide big" type="password" v-model="registerData.password_confirmation">
      </div>
      
      <button class="btn primary">Registrarme</button>

    </form>

  </div>
</template>

<script>
export default {
  data: function () {
    return {
      registerData: {
          email: '',
          password: '',
          password_confirmation: '',
          name: '',
          surname: ''
      },
      errors: []
    }
  },
  methods: {
    register: function (ev) {
      var self = this;
      this.errors = [];

      this.$store.dispatch('register', this.registerData).then(function (response) {
        // Redirect the user to the login page.
        self.$router.push({ name: 'login', query: { email: self.registerData.email }});

      }).catch(function (response) {
        var errObj = response.body.errors;
        for (var prop in errObj) {
          if (errObj.hasOwnProperty(prop)) {
            self.errors.push(errObj[prop][0]);
          }
        }
      });

      ev.preventDefault();
    }
  }
}
</script>

<style scoped>

.login-area {
  width: 500px;
  margin: 35px auto;
  padding: 25px 30px 30px 30px;
  background-color: white;
}

.login-area h1 {
  font-size: 100%;
  color: #505050;
  margin: 0px 0px 20px 0px;
  letter-spacing: 1px;
}

.input-block {
  margin-bottom: 15px;
}

</style>
