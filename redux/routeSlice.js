import { createSlice } from '@reduxjs/toolkit'


const routeSlice = createSlice({
  name: 'routeId',
  initialState: [],
  reducers: {
    toggleRouteId(state, action) {
      state[0] = action.payload
    }
  }
})

export const { toggleRouteId } = routeSlice.actions

export default routeSlice.reducer