export interface WeatherReportDto {
  time: string;
  feelsLike: number;
  windSpeed: number;
  temperature: number;
  high: number;
  low: number;
  precipitationChance: number;
  description: string;
  icon: string;
}
