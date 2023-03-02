import { Descriptions } from '../config/descriptions';
import { FlightCSV, ItineraryCSV, NameCSVs, PowerConsumptionByTime, ScheduleFlightData, ScheduleFlightResponse } from '../interfaces/csv.interface';
import { readCSV } from '../utils/csv.utils';
import { Options } from 'csv-parse';

const { error } = Descriptions.general;

export const processCSVs = async (files: Express.Multer.File[]): Promise<ScheduleFlightResponse[]> => {
  const scheduleData = await combineFileData(files);
  const response: ScheduleFlightResponse[] = [];
  for (const schedule of scheduleData) {
    const data: PowerConsumptionByTime[] = [];

    for (const flight of schedule.flight) {
      data.push({
        time: flight.TIME_StartTime,
        powerConsumption: calculatePowerConsumption(flight),
      });
    }

    response.push({
      data,
      itinerary: schedule.itinerary,
    });
  }
  return response;
};

const combineFileData = async (files: Express.Multer.File[]): Promise<ScheduleFlightData[]> => {
  const itineraries = await readItinerary(files);
  const scheduleData = await mergeFlightAndItinerary(itineraries, files);
  return scheduleData;
};

const readItinerary = async (files: Express.Multer.File[]): Promise<ItineraryCSV[]> => {
  const file = files.find((file) => file.fieldname === NameCSVs.itinerary);
  if (!file) throw new Error(error.itineraryFileNotFound);
  const csvOptions: Options = {
    trim: true,
    group_columns_by_name: true,
    columns: true,
    cast: (value, context) => {
      if (['day starting time in milliseconds since midnight', 'itinerary ID'].includes(String(context.column))) return Number(value);
      return value;
    },
  };
  return readCSV<ItineraryCSV>(file, csvOptions);
};

const mergeFlightAndItinerary = async (itineraries: ItineraryCSV[], files: Express.Multer.File[]) => {
  const options: Options = {
    group_columns_by_name: true,
    columns: true,
    cast: (value, _context) => (!isNaN(Number(value)) ? Number(value) : value),
  };
  const scheduleFlights: ScheduleFlightData[] = [];
  for (const itinerary of itineraries) {
    const file = files.find((file) => file.originalname === itinerary['flight data file']);
    if (!file) throw new Error(error.flightsFileNotFound);
    const flight = await readCSV<FlightCSV>(file, options);
    if (!flight.length) throw new Error(error.flightsFileNotFound);
    scheduleFlights.push({ flight: flight, itinerary });
  }

  return scheduleFlights;
};

const calculatePowerConsumption = (flight: FlightCSV): number => flight.BATT_VFilt * flight.BATT_CFilt;
