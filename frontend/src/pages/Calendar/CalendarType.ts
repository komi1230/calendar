export interface TileProps {
    year: number,
    month: number,
    day: string,
    date: number,
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    isScheduled: boolean,
};

export interface WeekTilesProps {
    dates: Date[],
    open: boolean,
    onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
    schedules: Schedule[],
}

export interface CalendarPageProps {
    year: number,
    month: number,
    schedules: Schedule[],
};

export type Schedule = {
    id?: number,
    from: Date,
    to: Date,
}