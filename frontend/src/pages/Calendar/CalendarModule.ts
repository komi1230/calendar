import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Schedule } from './CalendarType';

type State = {
  count: number,
  schedules: Schedule[],
  selectedDate?: string,
  currentMonth: number,
  currentYear: number,
};

const initialState: State = {
  count: 2,
  schedules: [
    {
      id: 1,
      from: new Date(2020, 7, 3, 10).toString(),
      to: new Date(2020, 7, 3, 13).toString(),
    },
    {
      id: 2,
      from: new Date(2020, 7, 13, 14).toString(),
      to: new Date(2020, 7, 13, 15).toString(),
    },
  ],
  currentMonth: new Date().getMonth(),
  currentYear: new Date().getFullYear(),
};

export const CalendarModule = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    selectDate (state: State, action: PayloadAction<string>) {
      state.selectedDate = action.payload;
    },

    changeMonth (state: State, action: PayloadAction<string>) {
      switch (action.payload) {
        case 'INCREMENT':
          if (state.currentMonth === 11) {
            state.currentMonth = 0;
            state.currentYear += 1;
          } else {
            state.currentMonth += 1;
          }
          break;
        case 'DECREMENT':
          if (state.currentMonth === 0) {
            state.currentMonth = 12;
            state.currentYear -= 1;
          } else {
            state.currentMonth -= 1;
          }
          break;
      }
    },

    addSchedule (state: State, action: PayloadAction<Schedule>) {
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

export const { selectDate, addSchedule, deleteSchedule, changeMonth } = CalendarModule.actions;