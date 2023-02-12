import express from "express";
import Artist from "../models/Artists";
import mongoose from "mongoose";
import {imagesUpload} from "../multer";
import {ArtistWithoutId} from "../types";

const artistsRouter = express.Router();

artistsRouter.get('/artists', async (req, res, next) => {
  try {
    const artists = await Artist.find();
    return res.send(artists);
  } catch (e) {
    return next(e);
  }
});

// artistsRouter.get('/:shortUrl', async (req, res) => {
//   try {
//     const result = await Artist.findOne({shortUrl: req.params.shortUrl});
//
//     if (!result) {
//       return res.sendStatus(404);
//     }
//
//     return res.status(301).redirect(result.url)
//   } catch {
//     return res.sendStatus(500);
//   }
// });



artistsRouter.post('/artists', imagesUpload.single('image'), async (req, res, next) => {
  const artistData: ArtistWithoutId = {
    name: req.body.name,
    image: req.file ? req.file.filename : null,
    info: req.body.info
  };

  const artist = new Artist(artistData);

  try {
    await artist.save();
    return res.send(artist);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

export default artistsRouter;