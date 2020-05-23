// returns functions we can call on it to get information about its internal state
// protects state by creating a closure so that it can only be accessed by invoking a function
function createStore() { 
 let state

 function dispatch(action) {
    state = reducer(state, action)
    render()
  }

  function getState() {
    return state
  }

  return { 
    dispatch,
    getState
  }
}

// the REDUCER function for mutating state, sets count to 0 if state undefined
function reducer(state = { count: 0 }, action) {
  switch (action.type) {
    case 'INCREASE_COUNT':
      return { count: state.count + 1 };
    default:
      return state;
  }
};

// makes DOM reflect our app's state
function render() {
  let container = document.getElementById('container');
  container.textContent = store.getState().count;
};

// declare the store by invoking method, making internal methods available and initial state undefined
let store = createStore();
// immediately calls dispatch with default action to set state to { count: 0 }
store.dispatch({ type: '@@INIT' })

// create listeners that allow user to alter state in a controlled way
let button = document.getElementById('button');
button.addEventListener('click', function() {
    store.dispatch({ type: 'INCREASE_COUNT' });
})



