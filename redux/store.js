import { configureStore } from '@reduxjs/toolkit'
import dataActivitiesSlice from './dataActivitiesSlice'
import routeIdSlice from './routeSlice'
import todoSlice from './todoSlice'
export const store = configureStore({
  reducer: {
    todos: todoSlice,
    routeId: routeIdSlice,
    activities: dataActivitiesSlice
  },
})