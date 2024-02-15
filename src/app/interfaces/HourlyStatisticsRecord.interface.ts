interface HourlyStatistic {
  [hourRange: string]: number;
}

export interface HourlyStatisticsRecord {
  [date: string]: HourlyStatistic;
}
