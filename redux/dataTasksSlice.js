import { createSlice } from '@reduxjs/toolkit'

const dataTaskSlice = createSlice({
  name: 'tasks',
  initialState:{
    tasks: []
  },
  reducers: {
    setTask(state, action) {
      state.tasks = action.payload
    }
  }
})

export const { setTask } = dataTaskSlice.actions

export default dataTaskSlice.reducer