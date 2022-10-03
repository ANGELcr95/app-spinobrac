import { createSlice } from '@reduxjs/toolkit'

const dataActivitiesSlice = createSlice({
  name: 'activities',
  initialState:{
    activities: null,
    activitiesShow: null,
    dateShow:null
  },
  reducers: {
    setActivities(state, action) {
      state.activities = action.payload
    },
    showActivities(state, action) {
      state.activitiesShow = action.payload
    },
    setDateShow(state, action) {
      state.dateShow = action.payload
      
    }
  }
})

export const { setActivities, showActivities, setDateShow } = dataActivitiesSlice.actions

export default dataActivitiesSlice.reducer