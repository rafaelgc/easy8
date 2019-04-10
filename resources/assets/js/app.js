require('./bootstrap');
window.Vue = require('vue');
import VueRouter from 'vue-router';
import Vuex from 'vuex'
import VueResource from 'vue-resource';
import Entry from './entry';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueResource);

//////////////////////////////////////////
///             API CONFIG             ///
//////////////////////////////////////////

let baseUrl = '';
if (process.env.NODE_ENV === 'production') {
  console.log('PRODUCTION API');
  Vue.http.options.root = 'http://vps483433.ovh.net/api';
}
else {
  console.log('DEVELOPMENT API');
  Vue.http.options.root = 'http://localhost:8000/api';
}

//////////////////////////////////////////
///               ROUTER               ///
//////////////////////////////////////////
Vue.component('alert', require('./components/AlertComponent.vue'));

const routes = [
  {
    name: 'register',
    path: '/register',
    components: {
        'working-area': require('./components/RegisterComponent.vue'),
        'main-menu': require('./components/LoginMenuComponent.vue')
    },
    meta: { requiresAuth: false, redirectIfAuthenticated: true }
  },
  {
    name: 'login',
    path: '/', alias: '/login',
    components: {
      'working-area': require('./components/LoginComponent.vue'),
      'main-menu': require('./components/LoginMenuComponent.vue')
    },
    meta: { requiresAuth: false, redirectIfAuthenticated: true }
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
      folder: Vue.resource('folder{/entryId}'),
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
      selectionCount: 0,
      uniqueSelectedEntry: null,
      loading: false,
      editingEntry: null,
      cutEntries: [],
    },
    simulator: {
      entry: null,
      content: ''
    }
  },
  getters: {
    cwd: function (state) {
      return state.explorer.breadcrumbs[state.explorer.breadcrumbs.length - 1];
    },
    inRoot: function (state) {
      return state.explorer.breadcrumbs.length == 1;
    },
    loading: function (state) {
      return state.explorer.loading;
    },
    cuttedEntries: function (state) {
      return state.explorer.cutEntries;
    }
  },
  mutations: {
    authenticate: function (state) {
      state.login.authenticated = true;
    },

    logout: function (state) {
      state.login.authenticated = false;
    },

    setToken: function (state, token) {
      state.login.token = token;
    },

    incrementSelectionCount: function (state) {
      state.explorer.selectionCount++;
    },

    decrementSelectionCount: function (state) {
      state.explorer.selectionCount--;
    },

    setSelectionCount: function (state, value) {
      state.explorer.selectionCount = value;
    }
  },
  actions: {

    ////////////////////////////////////////////////////////
    ///                AUTHENTICATION                   ////
    ////////////////////////////////////////////////////////

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

    logout: function (context) {
      window.localStorage.removeItem('token');
      context.commit('logout');
    },

    register: function (context, data) {
      var register = new Vue.resource('register');

      return register.save({}, data);
    },

    ////////////////////////////////////////////////////////
    ///                  FILE EXPLORER                  ////
    ////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////
    ///          FILE CREATION AND MODIFICATION          ///

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
      return context.state.api.source.save({ entryId: context.state.simulator.entry.id, api_token: context.state.login.token }, {
        content: context.state.simulator.content
      }).then(function (response) {
      });
    },

    updateEditingFolder: function (context) {
      context.state.api.folder.save({ entryId: context.state.explorer.editingEntry.id, api_token: context.state.login.token }, context.state.explorer.editingEntry).then(function (response) {
        // To update  the folders:
        context.dispatch('listDirectory', context.getters.cwd.id);
      })
    },

    cutSelectedEntries: function (context) {
      context.state.explorer.cutEntries.splice(0, context.state.explorer.cutEntries.length);
      var entries = context.state.explorer.folders.concat(context.state.explorer.sources);
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].selected) {
          context.state.explorer.cutEntries.push(entries[i]);
          Vue.set(entries[i], 'cutting', true);
          console.log(entries[i].name);
        }
      }
    },

    pasteEntries: function (context) {
      for (var i = 0; i < context.state.explorer.cutEntries.length; i++) {
        var entry = context.state.explorer.cutEntries[i];
        context.state.api.entry.save({ entryId: entry.id }, { parent_id: context.getters.cwd.id, api_token: context.state.login.token });
      }
      context.state.explorer.cutEntries.splice(0, context.state.explorer.cutEntries.length);
      context.dispatch('listDirectory', context.getters.cwd.id);
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
    },

    ////////////////////////////////////////////////////////
    ///                    NAVIGATION                    ///

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

    loadSource: function (context, id) {
      return context.state.api.source.get({ api_token: context.state.login.token, entryId: id });
    },

    // Loads folders and sources. Doesn't modifies the breadcrumbs. Use
    // enterDirectory and leaveDirectory.
    listDirectory: function (context, id) {
      context.state.explorer.loading = true;
      Promise.all([
        context.dispatch('loadFolders', id),
        context.dispatch('loadSources', id)]).then(function () {
        context.state.explorer.loading = false;
        context.dispatch('clearSelection');
      });
    },

    enterDirectory: function (context, entry) {
      context.state.explorer.folders = [];
      context.state.explorer.sources = [];

      context.state.explorer.breadcrumbs.push(entry);
      context.dispatch('listDirectory', entry.id);

    },

    leaveDirectory: function (context, breadcrumbIndex) {
      if (breadcrumbIndex == -1) { breadcrumbIndex = context.state.explorer.breadcrumbs.length - 2; }
      context.state.explorer.folders = [];
      context.state.explorer.sources = [];

      context.state.explorer.breadcrumbs.splice(breadcrumbIndex + 1, context.state.explorer.breadcrumbs.length - breadcrumbIndex);
      context.dispatch('listDirectory', context.state.explorer.breadcrumbs[breadcrumbIndex].id);
    },

    select: function (context, entry) {
      console.log(entry);
      if (entry.selected) {
        entry.selected = false;
        context.commit('decrementSelectionCount');
      }
      else {
        Vue.set(entry, 'selected', true);
        context.commit('incrementSelectionCount');
      }

      if (context.state.explorer.selectionCount == 1) {
        for (var i = 0; i < context.state.explorer.folders.length; i++) {
          if (context.state.explorer.folders[i].selected) {
            context.state.explorer.uniqueSelectedEntry = context.state.explorer.folders[i];
            break;
          }
        }

        for (var i = 0; i < context.state.explorer.sources.length; i++) {
          if (context.state.explorer.sources[i].selected) {
            context.state.explorer.uniqueSelectedEntry = context.state.explorer.sources[i];
            break;
          }
        }
      }
      else {
        context.state.explorer.uniqueSelectedEntry = null;
      }
    },

    editSelectedEntry: function (context) {
      context.state.explorer.editingEntry = Entry.clone(context.state.explorer.uniqueSelectedEntry);
    },

    clearSelection: function (context) {
      context.commit('setSelectionCount', 0);
      context.state.explorer.uniqueSelectedEntry = null;
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

  if (to.meta.redirectIfAuthenticated && store.state.login.authenticated === true) {
    next({ name: 'explorer' });
  }
  else if (to.meta.requiresAuth && store.state.login.authenticated === false && to.name != 'login') {
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
