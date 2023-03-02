export enum NameCSVs {
  itinerary = 'itinerary',
  flights = 'flights',
}
export interface ItineraryCSV {
  'itinerary ID': number;
  'day starting time in milliseconds since midnight': number;
  ' from location': string;
  'to location': string;
  'flight data file': string;
}

export interface FlightCSV {
  TIME_StartTime: number;
  BATT_VFilt: number;
  BATT_CFilt: number;
  BATT_Discharged: number;
  BATT_Remaining: number;
  BATT_RemainingV: number;
  BATT_Warning: number;
}

export interface ScheduleFlightData {
  flight: FlightCSV[];
  itinerary: ItineraryCSV;
}

export interface PowerConsumptionByTime {
  powerConsumption: number;
  time: number;
}

export interface ScheduleFlightResponse {
  data: PowerConsumptionByTime[];
  itinerary: ItineraryCSV;
}
