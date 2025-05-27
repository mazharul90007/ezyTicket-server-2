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

const getSingleEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await EventServices.getSingleEventFromDB(id);
    res.status(200).json({
      success: true,
      message: 'Event has been retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch event data',
      error: error.message,
    });
  }
};

const getTopEvents = async (req: Request, res: Response) => {
  try {
    const result = await EventServices.getTopEventsFromDB();
    res.status(200).json({
      success: true,
      message: 'Top events have been retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch Top event',
      error: error.message,
    });
  }
};

export const EventsControllers = {
  getAllEvents,
  getSingleEvent,
  getTopEvents,
};
