export interface DailyStatisticRecord {
  [date: string]: DailyStatistic;
}

interface DailyStatistic {
  firstCupTime: string;
  lastCupTime: string;
  averageCups: number;
}
