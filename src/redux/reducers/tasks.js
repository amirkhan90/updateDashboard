import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../services';

export const getTasks = createAsyncThunk('task/getTasks', async (token, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}tasks/get`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.status === 200) {
      return data;
    }
    return rejectWithValue(data?.msg);
  } catch (e) {
    return rejectWithValue(e.response.data);
  }
});

export const creatTask = createAsyncThunk(
  'task/creatTask',
  async ({ title, project_id, description, start_date, assigned_to, status, token }, { rejectWithValue }) => {
    try {
      console.log('token=>', token);
      const response = await fetch(`${BASE_URL}tasks/create`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          project_id,
          description,
          start_date,
          assigned_to,
          status,
        }),
      });
      let data = await response.json();
      console.warn('response', data);
      if (response.status === 201) {
        return data;
      } else {
        return rejectWithValue(data?.msg);
      }
    } catch (e) {
      console.warn('Error', e.response.data);
      rejectWithValue(e.response.data);
    }
  }
);

export const updateTask = createAsyncThunk(
  'task/updateTask',
  async ({ title, project_id, description, start_date, assigned_to, status, task_id, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}tasks/edit`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          project_id,
          description,
          start_date,
          assigned_to,
          status,
          task_id,
        }),
      });
      let data = await response.json();
      console.warn('response', data);
      return data.msg;
    } catch (e) {
      console.warn('Error', e.response.data);
      rejectWithValue(e.response.data);
    }
  }
);

export const deleteTask = createAsyncThunk('task/deleteTask', async ({ id, token }, { rejectWithValue }) => {
  console.log('token=>', token);
  try {
    console.log('id', id);
    const response = await fetch(`${BASE_URL}tasks/delete-task?id=${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    let data = await response.json();
    console.log('deleted', data);
    console.warn('response', data);
    return data.msg;
  } catch (e) {
    console.warn('Error', e.response.data);
    rejectWithValue(e.response.data);
  }
});
export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    successMessage: '',
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.errorMessage = '';
      return state;
    },
  },
  extraReducers: {
    [getTasks.pending]: (state) => {
      state.isFetching = true;
    },
    [getTasks.fulfilled]: (state, { payload }) => {
      state.tasks = payload.records;
      state.isFetching = false;
    },

    [getTasks.rejected]: (state, { payload }) => {
      console.warn('payload', payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    },
    [creatTask.pending]: (state) => {
      state.isFetching = true;
    },
    [creatTask.fulfilled]: (state, { payload }) => {
      console.warn('payload testing ', payload);
      state.isFetching = false;
      state.isSuccess = true;
      state.successMessage = 'Created Successfully';
    },
    [creatTask.rejected]: (state, { payload }) => {
      console.warn('payload ', payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = 'Please Provide Correct Data';
    },
    [updateTask.pending]: (state) => {
      state.isFetching = true;
    },
    [updateTask.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.successMessage = 'Updated Successfully';
    },
    [updateTask.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = 'Please Provide Correct Data';
    },
    [deleteTask.pending]: (state) => {
      state.isFetching = true;
    },
    [deleteTask.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.successMessage = payload;
    },

    [deleteTask.rejected]: (state, { payload }) => {
      console.warn('payload', payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    },
  },
});

export const tasksSelector = (state) => state.tasks;
export const { clearState } = tasksSlice.actions;
export default tasksSlice.reducer;
