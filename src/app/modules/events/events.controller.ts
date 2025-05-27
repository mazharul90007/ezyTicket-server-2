import { Request, Response } from 'express';
import { EventServices } from './events.service';

const getAllEvents = async (req: Request, res: Response) => {
  try {
    const result = await EventServices.getAllEventsFromDB();
    res.status(200).json({
      success: true,
      message: 'All Events are retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch events data',
      error: error.message,
    });
  }
};

export const EventsControllers = {
  getAllEvents,
};
