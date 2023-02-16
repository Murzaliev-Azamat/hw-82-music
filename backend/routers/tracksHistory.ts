import express from 'express';
import User from '../models/User';
import mongoose from 'mongoose';
import {TrackHistoryMutation} from "../types";
import TrackHistory from "../models/TrackHistory";

const tracksHistoryRouter = express.Router();

tracksHistoryRouter.post('/', async (req, res,next) => {
  const token = req.get('Authorization');

  if (!token) {
    return res.status(401).send({error: 'No token present'});
  }

  const user = await User.findOne({token});

  if (!user) {
    return res.status(401).send({error: 'Wrong token!'});
  }

  const trackHistoryData: TrackHistoryMutation = {
    user: user._id,
    track: req.body.track,
    datetime: new Date(),
  };

  const trackHistory = new TrackHistory(trackHistoryData);

  try {
    await trackHistory.save();
    return res.send({
      username: user.username
    });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

export default tracksHistoryRouter;