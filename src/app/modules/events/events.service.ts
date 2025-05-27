import { Event } from './events.model';

const getAllEventsFromDB = async () => {
  const result = await Event.find();
  return result;
};

export const EventServices = {
  getAllEventsFromDB,
};
