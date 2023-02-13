import mongoose, {Types} from 'mongoose';
import Album from "./Albums";
const Schema = mongoose.Schema;

const TrackSchema = new Schema({
  album: {
    type: Schema.Types.ObjectId,
    ref: 'Album',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => Album.findById(value),
      message: 'Album does not exist'
    }
  },
  name: {
    type: String,
    required: true
  },
  time: String,
});

const Track = mongoose.model('Track', TrackSchema);
export default Track;








