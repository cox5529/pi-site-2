import { WeatherReportDto } from './weather-report-dto';

export interface WeatherDto {
  location: string;
  current: WeatherReportDto;
  hourlyForecast: WeatherReportDto[];
  dayForecast: WeatherReportDto;
}
