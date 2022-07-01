const initialState = 0;
const changeOpenModel = (state = initialState, action) => {
  switch (action.type) {
    case 'TRUEOPENLOGIN':
      return 1;
    case 'TRUEOPENREGISTER':
      return 2;
    case 'FALSEOPEN':
      return 0;
    default: return state;
  }
}

export default changeOpenModel;