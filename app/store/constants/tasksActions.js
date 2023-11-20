
export const addTaskRequest = (data) => ({
  type: 'ADD_TASK_REQUEST',
  payload: data,
});

export const addTaskSuccess = () => ({
  type: 'ADD_TASK_SUCCESS',
});

export const deleteTaskRequest = (id) => ({
  type: 'DELETE_TASK_REQUEST',
  payload: id,
});

export const deleteTaskSuccess = () => ({
  type: 'DELETE_TASK_SUCCESS',
});

export const editTaskRequest = (uid, data) => ({
  type: 'EDIT_TASK_REQUEST',
  payload: { uid: uid, data: data },
});

export const editTaskSuccess = () => ({
  type: 'EDIT_TASK_SUCCESS',
});

export const taskListRequest = (data) => ({
  type: 'TASK_LIST_REQUEST',
  payload: data,
});

export const tasksListSuccess = (tasks) => ({
  type: 'TASK_LIST_SUCCESS',
  payload: tasks,
});

export const taskListFailure = (error) => ({
  type: 'TASK_LIST_FAILURE',
  payload: error,
});

export const addTaskFailure = (error) => ({
  type: 'ADD_TASK_FAILURE',
  payload: error,
});
