export default {
  state: {
    entry: null,
    content: '',
    view: 'editor',

    assembler: null,
  },

  mutations: {
    setView(state, view) {
      state.view = view;
    }
  },

  actions: {
    setView(context, view) {
      context.commit('setView', view);
    },
    goToSimulator(context) {
      context.dispatch('setView', 'simulator');
    },
    goToEditor(context) {
      context.dispatch('setView', 'editor');
    }
  }
}