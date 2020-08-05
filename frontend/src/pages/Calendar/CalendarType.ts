export interface TileProps {
    year: number,
    month: number,
    day: string,
    date: number,
    isScheduled: boolean,
};

export interface WeekTilesProps {
    dates: Date[],
    schedules: Schedule[],
}

export interface CalendarPageProps {
    year: number,
    month: number,
    schedules: Schedule[],
};

export type Schedule = {
    id?: number,
    from: string,
    to: string,
}