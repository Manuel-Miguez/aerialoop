export interface ChartProps {
  [key: string]: any;
  chartData: Record<string, any>;
  chartOptions: Record<string, any>;
}

export enum ChartColors {
  black = "black",
  blue = "blue",
  red = "red",
  green = "green",
  gray = "gray",
}
