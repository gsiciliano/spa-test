import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const notesStore = new Vuex.Store({
    state: {
        notes: [],
    },
    mutations: {
        increment (state) {
            state.noteCount++
        },
        FETCH(state, notes) {
            state.notes = notes;
        },
        DELETE_NOTE({ commit, state }, noteId) {
            // this.dispatch('fetch');
        }
    },
    actions: {
        fetch({ commit }) {
            return axios.get('/api/notes')
                .then((response) => {
                    const notes = response.data;
                    // state.notes.push(...notes);
                    commit('FETCH', notes)
                })
                .catch();
        },
        deleteNote({ commit }, noteId) {
            axios.delete(`/api/notes/${noteId}`)
                .then(() => {
                    this.dispatch('fetch');
                })
                .catch((error) => {
                });
        },
        edit({commit}, note) {
            axios.put(`/api/notes/${note.id}`, {
                title: note.title
            })
                .then((response) => {
                  this.dispatch('fetch');
                });
        }
    }
});

export default notesStore;

