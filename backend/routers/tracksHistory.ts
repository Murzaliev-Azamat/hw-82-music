import express from 'express';
import User from '../models/User';
import mongoose, { Error } from 'mongoose';
import {TrackHistoryMutation, TrackMutation} from "../types";
import Track from "../models/Track";
import TrackHistory from "../models/TrackHistory";
import trackHistory from "../models/TrackHistory";

const tracksHistoryRouter = express.Router();

// tracksHistoryRouter.post('/', async (req, res, next) => {
//   try {
//     const user = new User({
//       username: req.body.username,
//       password: req.body.password
//     });
//
//     user.generateToken();
//     await user.save();
//     return res.send(user);
//   } catch (error) {
//     if (error instanceof Error.ValidationError) {
//       return res.status(400).send(error);
//     }
//
//     return next(error);
//   }
// });


// usersRouter.post('/sessions', async (req, res) => {
//   const user = await User.findOne({username: req.body.username});
//
//   if (!user) {
//     return res.status(400).send({error: 'Username not found'});
//   }
//
//   const isMatch = await user.checkPassword(req.body.password);
//
//   if (!isMatch) {
//     return res.status(400).send({error: 'Password is wrong'});
//   }
//
//   user.generateToken();
//   await user.save();
//
//   return res.send({message: 'Username and password correct!', user});
// });
//
//
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