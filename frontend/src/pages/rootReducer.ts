import { combineReducers } from '@reduxjs/toolkit';
import { CalendarModule } from './Calendar/CalendarModule';

export const rootReducer = combineReducers({
    schedules: CalendarModule.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;