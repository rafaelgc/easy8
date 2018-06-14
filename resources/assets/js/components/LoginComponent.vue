<template>
  <div class="login-area lshadow">
    <h1>Iniciar sesión</h1>

    <form v-on:submit="authenticate">
      <alert type="error" v-bind:visible="showLoginError">Las credenciales son incorrectas o el usuario no está registrado.</alert>
      <div class="input-block">
        <label>Correo electrónico</label>
        <input name="email" class="input wide big" v-model="login.email">
      </div>

      <div class="input-block">
        <label>Contraseña</label>
        <input name="password" class="input wide big" type="password" v-model="login.password">
      </div>
      
      <button class="btn primary">Iniciar sesión</button>

    </form>

  </div>
</template>

<script>
export default {
  data: function () {
    return {
      login: {
        email: '',
        password: ''
      },
      showLoginError: false
    }
  },
  methods: {
    authenticate: function (ev) {
      var self = this;

      this.$store.dispatch('login', this.login).then(function (response) {
        self.$router.push({ name: 'explorer' });
        self.showLoginError = false;
      }).catch(function () {
        self.showLoginError = true;
        console.log('Error');
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
