require('./bootstrap');
window.Vue = require('vue');
import VueRouter from 'vue-router';
import Vuex from 'vuex'
import VueResource from 'vue-resource';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueResource);

//////////////////////////////////////////
///             API CONFIG             ///
//////////////////////////////////////////

let baseUrl = ''
if (process.env.NODE_ENV === 'production') {
  Vue.http.options.root = 'http://localhost:8000/api';
}
else {
  Vue.http.options.root = 'http://localhost:8000/api';
}

//////////////////////////////////////////
///               ROUTER               ///
//////////////////////////////////////////
Vue.component('alert', require('./components/AlertComponent.vue'));

const routes = [
  {
    name: 'login',
    path: '/', alias: '/login',
    components: {
      'working-area': require('./components/LoginComponent.vue'),
      'main-menu': require('./components/LoginMenuComponent.vue')
    },
    meta: { requiresAuth: false }
  },
  {
    name: 'explorer',
    path: '/explorer',
    components: {
      'working-area': require('./components/ExplorerComponent.vue'),
      'main-menu': require('./components/ExplorerMenuComponent.vue')
    },
    meta: { requiresAuth: true }
  },

  {
    name: 'simulator',
    path: '/simulator/:entryId?',
    components: {
      'working-area': require('./components/SimulatorComponent.vue'),
      'main-menu': require('./components/SimulatorMenuComponent.vue')
    },
    meta: { requiresAuth: true }
  },
];

const router = new VueRouter({
  routes: routes
});

//////////////////////////////////////////
///           GLOBAL STATE             ///
//////////////////////////////////////////
const store = new Vuex.Store({
  state: {
    api: {
      folder: Vue.resource('folder'),
      source: Vue.resource('source{/entryId}'),
      entry:  Vue.resource('entry{/entryId}')
    },
    router: router,
    login: {
      authenticated: false,
      token: ''
    },
    explorer: {
      folders: [],
      sources: [],
      breadcrumbs: [],
      selectionCount: 0
    },
    simulator: {
      entryId: -1,
      content: ''
    }
  },
  mutations: {
    authenticate: function (state) {
      state.login.authenticated = true;
    },
    setToken: function (state, token) {
      state.login.token = token;
    },

    incrementSelectionCount: function (state) {
      state.explorer.selectionCount++;
    },

    decrementSelectionCount: function (state) {
      state.explorer.selectionCount--;
    }
  },
  actions: {
    login: function (context, data) {
      var login = new Vue.resource('login');

      return login.save({}, data).then(function (response) {
        console.log(response);
        context.commit('setToken', response.body.api_token);
        context.commit('authenticate');

        window.localStorage.setItem('token', response.body.api_token);
      });
    },
    
    loginWithToken: function (context, token) {
      context.commit('setToken', token);
      context.commit('authenticate');
    },

    // Creates a folder in the current working directory and
    // reloads.
    createFolder: function (context, data) {
      if (!data.name) return;
      
      data.parent = context.state.explorer.breadcrumbs[context.state.explorer.breadcrumbs.length - 1].id;
      console.log(data);
      console.log(context.state.explorer.breadcrumbs);
      return context.state.api.folder.save({ api_token: context.state.login.token }, data).then(function (response) {
        // To update  the folders:
        context.dispatch('loadFolders', data.parent);
      });
    },

    createSource: function (context, data) {
      if (!data.name) return;

      data.parent = context.state.explorer.breadcrumbs[context.state.explorer.breadcrumbs.length - 1].id;

      return context.state.api.source.save({ api_token: context.state.login.token }, data).then(function (response) {
        // To update  the folders:
        context.dispatch('loadSources', data.parent);
      });
    },

    // Updates the opened file.
    updateSource: function (context) {
      return context.state.api.source.save({ entryId: context.state.simulator.entryId, api_token: context.state.login.token }, {
        content: context.state.simulator.content
      }).then(function (response) {
      });
    },

    // Loads folders contained in the id entry. Does not update
    // the breadcrumbs.
    loadFolders: function (context, id) {
      return context.state.api.folder.get({parent: id, api_token: context.state.login.token}).then(function (response) {
        context.state.explorer.folders = response.body;
      });
    },

    // Loads sources contained in the id entry. Does not update
    // the breadcrumbs.
    loadSources: function (context, id) {
      return context.state.api.source.get({parent: id, api_token: context.state.login.token}).then(function (response) {
        context.state.explorer.sources = response.body;
      });
    },

    // Loads folders and sources. Doesn't modifies the breadcrumbs. Use
    // enterDirectory and leaveDirectory.
    listDirectory: function (context, id) {
      context.dispatch('loadFolders', id);
      context.dispatch('loadSources', id);
    },

    enterDirectory: function (context, entry) {
      context.state.explorer.folders = [];
      context.state.explorer.sources = [];

      context.state.explorer.breadcrumbs.push(entry);
      context.dispatch('listDirectory', entry.id);

      /// CLEAR SELECTION!!
    },

    leaveDirectory: function (context, breadcrumbIndex) {
      context.state.explorer.folders = [];
      context.state.explorer.sources = [];

      context.state.explorer.breadcrumbs.splice(breadcrumbIndex + 1, context.state.explorer.breadcrumbs.length - breadcrumbIndex);
      context.dispatch('listDirectory', context.state.explorer.breadcrumbs[breadcrumbIndex].id)

      /// CLEAR SELECTION!!
    },

    loadSource: function (context, id) {
      return context.state.api.source.get({ api_token: context.state.login.token, entryId: id });
    },

    select: function (context, entry) {
      if (entry.selected) {
        entry.selected = false;
        context.commit('decrementSelectionCount');
      }
      else {
        Vue.set(entry, 'selected', true);
        context.commit('incrementSelectionCount');
      }
    },

    deleteSelectedEntries: function (context) {
      var promises = [];
      for (var i = 0; i < context.state.explorer.folders.length; i++) {
        if (context.state.explorer.folders[i].selected) {
          promises.push(context.dispatch('deleteEntry', context.state.explorer.folders[i].id));
        }
      }

      for (var i = 0; i < context.state.explorer.sources.length; i++) {
        if (context.state.explorer.sources[i].selected) {
          promises.push(context.dispatch('deleteEntry', context.state.explorer.sources[i].id));
        }
      }

      Promise.all(promises).then(function () {
        // Reload current directory.
        context.dispatch('listDirectory', context.state.explorer.breadcrumbs[context.state.explorer.breadcrumbs.length - 1].id);
      });
    },

    deleteEntry: function (context, id) {
      return context.state.api.entry.delete({ entryId: id, api_token: context.state.login.token });
    }
    
  }
});

//////////////////////////////////////////
///             LOGIN CHECK            ///
//////////////////////////////////////////

router.beforeEach(function (to, from, next) {
  if (!store.state.login.authenticated && window.localStorage.getItem('token')) {
    store.dispatch('loginWithToken', window.localStorage.getItem('token'));
  }

  if (to.name == 'login' && store.state.login.authenticated === true) {
    next({ name: 'explorer' });
  }
  if (to.meta.requiresAuth && store.state.login.authenticated === false && to.name != 'login') {
    next({ name: 'login' });
  }
  else {
    next();
  }
});

//////////////////////////////////////////
///            VUE INSTANCE            ///
//////////////////////////////////////////

const app = new Vue({
  router: router,
  store: store,
  resource: VueResource,
  created: function () {
  },
  mounted: function () {
  }
}).$mount('#app');
