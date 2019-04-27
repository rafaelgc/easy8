import Vue from 'vue';

export default {
  folder: Vue.resource('folder{/entryId}'),
  source: Vue.resource('source{/entryId}'),
  entry:  Vue.resource('entry{/entryId}')
}