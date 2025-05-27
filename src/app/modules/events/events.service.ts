import { Event } from './events.model';

const getAllEventsFromDB = async () => {
  const result = await Event.find();
  return result;
};

const getTopEventsFromDB = async () => {
  const result = await Event.find({ advertise: true, status: 'verified' });
  return result;
};

const getSingleEventFromDB = async (id: string) => {
  const result = await Event.findOne({ _id: id });
  return result;
};

export const EventServices = {
  getAllEventsFromDB,
  getTopEventsFromDB,
  getSingleEventFromDB,
};
