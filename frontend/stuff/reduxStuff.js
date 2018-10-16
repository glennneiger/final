import {createStore} from 'redux'

const postStoreReducer = function(state, action) {
  var newState = state;
  if(action.type === "uri") {
    return {uri: action.payload};
  } else {
    if(action.type === "title"){
      newState.title = action.payload;
      return newState;
    }
    if(action.type === "category"){
      newState.category = action.payload;
      return newState;
    }
    if(action.type === "thumbnail"){
      newState.thumbnail = action.payload;
      return newState;
    };
  };
};
export const postStore = createStore(postStoreReducer, 'not working');

const vidStoreReducer = function(state, action) {
  return action.payload;
};
export const vidStore = createStore(vidStoreReducer, {data: 'state.data', current: 'state.current'});

const queueStoreReducer = function(state, action) {
  if(action.type == 'queue') {
    return {data: action.payload}
  } else {
    const queueStore = state;
  if(action.type == 'change current') {
      queueStore.current = action.payload;
    return queueStore;
  }
}
}
export const queueStore = createStore(queueStoreReducer);

const commentStoreReducer = function(state, action) {
    return action.payload;
};
export const commentStore = createStore(commentStoreReducer);
