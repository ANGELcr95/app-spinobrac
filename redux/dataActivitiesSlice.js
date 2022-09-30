import { createSlice } from '@reduxjs/toolkit'

const dataActivitiesSlice = createSlice({
  name: 'activities',
  initialState:{
    activities: null,
    activitiesShow: null,
    pending:null
  },
  reducers: {
    setActivities(state, action) {
      state.activities = action.payload
      console.log("actualize");
      
    },
    showActivities(state, action) {
      state.activitiesShow = action.payload
    },
    toggleActivity(state, action) {
      const todo = state.find(todo => todo.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
      }
    }
  }
})

export const { setActivities, showActivities, toggleActivity } = dataActivitiesSlice.actions

export default dataActivitiesSlice.reducer