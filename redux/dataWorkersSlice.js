import { createSlice } from '@reduxjs/toolkit'

const dataWorkersSlice = createSlice({
  name: 'dataWorkers',
  initialState:{
    workers: []
  },
  reducers: {
    setWorkers(state, action) {
      state.workers = action.payload
    }
  }
})

export const { setWorkers } = dataWorkersSlice.actions

export default dataWorkersSlice.reducer