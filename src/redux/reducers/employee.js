import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../services';

export const getEmployees = createAsyncThunk('empolyee/getEmployees', async (token, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}users/ALL`, {
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

export const creatEmployee = createAsyncThunk(
  'employee/creatEmployee',
  async ({ name, email, password, role, contact, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}users/create`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
          contact,
        }),
      });
      let data = await response.json();
      if (response.status >= 200 && response.status <= 300) {
        return data;
      } else {
        return rejectWithValue(data?.msg);
      }
    } catch (e) {
      rejectWithValue(e.response.data);
    }
  }
);

export const updateEmployee = createAsyncThunk(
  'employee/updateEmployee',
  async ({ name, role, user_id, contact, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/users/edit-profile`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          role,
          user_id,
          contact,
        }),
      });
      let data = await response.json();
      if (response.status === 200) {
        return data;
      } else {
        return rejectWithValue(data?.msg);
      }
    } catch (e) {
      alert(e.toString());
      rejectWithValue(e.response.data);
    }
  }
);

export const deleteEmployee = createAsyncThunk('task/deleteEmployee', async ({ id, token }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}users/delete?id=${id}`, {
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

export const changePassword = createAsyncThunk(
  'employee/changePassword',
  async ({ email, password, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}users/reset`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      let data = await response.json();
      if (response.status === 200) {
        return data;
      } else {
        return rejectWithValue(data?.msg);
      }
    } catch (e) {
      alert(e.toString());
      rejectWithValue(e.response.data);
    }
  }
);

export const changeRole = createAsyncThunk(
  'employee/changeRole',
  async ({ user_id, role, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}users/edit-role`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id,
          role,
        }),
      });
      let data = await response.json();
      if (response.status === 200) {
        return data;
      } else {
        return rejectWithValue(data?.msg);
      }
    } catch (e) {
      alert(e.toString());
      rejectWithValue(e.response.data);
    }
  }
);

export const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    employee: [],
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
    [getEmployees.pending]: (state) => {
      state.isFetching = true;
    },
    [getEmployees.fulfilled]: (state, { payload }) => {
      state.employee = payload.records;
      state.isFetching = false;
    },

    [getEmployees.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    },
    [creatEmployee.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [creatEmployee.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.successMessage = 'Employee Created';
    },
    [creatEmployee.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = 'Please Provide Correct Data';
      state.isSuccess = false;
    },
    [updateEmployee.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [updateEmployee.fulfilled]: (state, { payload }) => {
      console.log('update reducer call');
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.successMessage = 'Updated Successfully';
    },
    [updateEmployee.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = 'Please Provide Correct Data';
      state.isSuccess = false;
    },
    [changePassword.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [changePassword.fulfilled]: (state, { payload }) => {
      console.log('update record');
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.successMessage = 'Updated Successfully';
    },
    [changePassword.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = 'Please Provide Correct Data';
      state.isSuccess = false;
    },
    [changeRole.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [changeRole.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.successMessage = 'Updated Successfully';
    },
    [changeRole.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = 'Please Provide Correct Data';
      state.isSuccess = false;
    },
    [deleteEmployee.pending]: (state) => {
      state.isFetching = true;
    },
    [deleteEmployee.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.successMessage = payload;
    },

    [deleteEmployee.rejected]: (state, { payload }) => {
      console.warn('payload', payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    },
  },
});

export const employeeSelector = (state) => state.employee;
export const { clearState } = employeeSlice.actions;
export default employeeSlice.reducer;
