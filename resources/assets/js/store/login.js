import Vue from 'vue';

export default {
  state: {
    authenticated: false,
    token: ''
  },

  mutations: {
    authenticate: function (state) {
      state.authenticated = true;
    },

    logout: function (state) {
      state.authenticated = false;
    },

    setToken: function (state, token) {
      state.token = token;
    },
  },

  actions: {
    login: function (context, data) {
      var login = new Vue.resource('login');

      return login.save({}, data).then(function (response) {
        console.log(response);
        context.commit('setToken', response.body.api_token);
        context.commit('authenticate');
        Vue.http.headers.common['Authorization'] = 'Bearer ' + response.body.api_token;

        window.localStorage.setItem('token', response.body.api_token);
      });
    },

    loginWithToken: function (context, token) {
      context.commit('setToken', token);
      context.commit('authenticate');
    },

    logout: function (context) {
      window.localStorage.removeItem('token');
      context.commit('logout');
    },

    register: function (context, data) {
      var register = new Vue.resource('register');

      return register.save({}, data);
    },
  }
}