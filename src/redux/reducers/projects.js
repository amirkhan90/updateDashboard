import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../services';

export const getProjects = createAsyncThunk('project/getProjects', async (token, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}projects/get`, {
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

export const createProject = createAsyncThunk(
  'project/createProject',
  async ({ title, description, site_location, user_id, site_contact, site_address, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}projects/create`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          site_location,
          user_id,
          site_contact,
          site_address,
        }),
      });
      let data = await response.json();
      if (response.status === 201) {
        return data;
      } else {
        return rejectWithValue(data?.msg);
      }
    } catch (e) {
      rejectWithValue(e.response.data);
    }
  }
);

export const updateProject = createAsyncThunk(
  'project/updateProject',
  async ({ title, description, project_id, start_date, site_contact, site_address, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}projects/edit`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          project_id,
          start_date,
          site_contact,
          site_address,
        }),
      });
      let data = await response.json();
      if (response.status !== 400) {
        return data;
      } else {
        return rejectWithValue(data?.msg);
      }
      return data;
    } catch (e) {
      rejectWithValue(e.response.data);
    }
  }
);

export const deleteProject = createAsyncThunk('task/deleteProject', async ({ id, token }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}projects/delete-project?id=${id}`, {
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
export const projectSlice = createSlice({
  name: 'projects',
  initialState: {
    projects: [],
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
  [getProjects.pending]: (state) => {
    state.isFetching = true;
  },
  extraReducers: {
    [getProjects.fulfilled]: (state, { payload }) => {
      state.projects = payload.records;
      state.isFetching = false;
    },

    [getProjects.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    },
    [createProject.pending]: (state) => {
      state.isFetching = true;
    },

    [createProject.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.successMessage = 'Created Successfully';
    },
    [createProject.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = 'Please Provide Correct Data';
    },
    [updateProject.pending]: (state) => {
      state.isFetching = true;
    },
    [updateProject.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.successMessage = 'Update Success';
    },
    [updateProject.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = 'Please Provide Correct Data';
    },
    [deleteProject.pending]: (state) => {
      state.isFetching = true;
    },
    [deleteProject.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.successMessage = payload;
    },

    [deleteProject.rejected]: (state, { payload }) => {
      console.warn('payload', payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    },
  },
});

export const projectSelector = (state) => state.projects;
export const { clearState } = projectSlice.actions;
export default projectSlice.reducer;
