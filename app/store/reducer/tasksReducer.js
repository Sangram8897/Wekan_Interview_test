const initialState = {
    tasks: [],
    error: null,
  };
  
  const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'TASK_LIST_SUCCESS':
        return {
          ...state,
          tasks: action.payload,
          error: null,
        };
      case 'TASK_LIST_FAILURE':
        return {
          ...state,
          tasks: [],
          error: action.payload,
        };

      default:
        return state;
    }
  };
  
  export default tasksReducer;