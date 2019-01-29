<template>
  <div class="login-area lshadow">
    <h1>Iniciar sesión</h1>

    <form v-on:submit="authenticate">
      <alert type="error" v-bind:visible="showLoginError">
        {{ loginErrorMessage }}
      </alert>
      <alert type="success" v-bind:visible="registerSuccess">
        Se ha enviado un correo de verificación a tu correo electrónico. Accede a él para verificar tu cuenta.
      </alert>
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
import Alert from './AlertComponent.vue';
export default {
  data: function () {
    return {
      login: {
        email: '',
        password: ''
      },
      showLoginError: false,
      loginErrorMessage: '',
      registerSuccess: false
    }
  },
  methods: {
    authenticate: function (ev) {
      var self = this;

      this.$store.dispatch('login', this.login).then(function (response) {
        self.$router.push({ name: 'explorer' });
        self.showLoginError = false;
      }).catch(function (response) {
        console.log(response);
        self.showLoginError = true;
        self.loginErrorMessage = response.body.message;
        console.log('Error');
      });

      ev.preventDefault();
    }
  },
  created: function () {
    if (this.$route.query.email) {
        this.login.email = this.$route.query.email;
        this.registerSuccess = true;
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
