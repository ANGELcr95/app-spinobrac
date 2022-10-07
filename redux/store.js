import { configureStore } from '@reduxjs/toolkit'
import dataActivitiesSlice from './dataActivitiesSlice'
import dataTasksSlice from './dataTasksSlice'
import dataWorkersSlice from './dataWorkersSlice'
import routeIdSlice from './routeSlice'
import todoSlice from './todoSlice'
export const store = configureStore({
  reducer: {
    todos: todoSlice,
    routeId: routeIdSlice,
    activities: dataActivitiesSlice,
    tasks: dataTasksSlice,
    workers: dataWorkersSlice
  },
})