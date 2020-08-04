import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Schedule } from './CalendarType';

type State = {
  count: number,
  schedules: Schedule[],
};

const initialState: State = {
  count: 2,
  schedules: [
    {
      id: 1,
      from: new Date(2020, 7, 3, 10),
      to: new Date(2020, 7, 3, 13)
    },
    {
      id: 2,
      from: new Date(2020, 7, 13, 14),
      to: new Date(2020, 7, 3, 15)
    },
  ]
};

export const CalendarModule = createSlice({
  name: "schedules",
  initialState,
  reducers: {
    addSchedule(state: State, action: PayloadAction<Schedule>) {
      state.count += 1;
      
      const newSchedule: Schedule = {
        id: state.count,
        from: action.payload.from,
        to: action.payload.to,
      };

      state.schedules = [newSchedule, ...state.schedules];
    },

    deleteSchedule (state: State, action: PayloadAction<Schedule>) {
      state.schedules = state.schedules.filter(s => s.id !== action.payload.id);
    }
  }
});

export const { addSchedule, deleteSchedule } = CalendarModule.actions;