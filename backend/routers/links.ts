import express from "express";
import Link from "../models/Links";
import {LinkWithoutId} from "../types";

const linksRouter = express.Router();

linksRouter.get('/:shortUrl', async (req, res) => {
  try {
    const result = await Link.findOne({shortUrl: req.params.shortUrl});

    if (!result) {
      return res.sendStatus(404);
    }

    return res.status(301).redirect(result.url)
  } catch {
    return res.sendStatus(500);
  }
});



linksRouter.post('/links', async (req, res) => {
  const abc = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
  let randomString = "";

    while (randomString.length < 7) {
      randomString += abc[Math.floor(Math.random() * abc.length)];
    }

  const result = await Link.findOne({shortUrl: 'gDasd'});

    if (result) {
      while (result.shortUrl === randomString){
        while (randomString.length < 7) {
          randomString += abc[Math.floor(Math.random() * abc.length)];
        }
      }
    }

  try {
    const linkData: LinkWithoutId = {
      url: req.body.url,
      shortUrl: randomString,
    };

    const link = new Link(linkData);

    try {
      await link.save();
      return res.send(link);
    } catch (error) {
      return res.status(400).send(error);
    }
  } catch (e) {
    return res.sendStatus(500);
  }
});

export default linksRouter;