import dotenv from 'dotenv'
import express from 'express';
import router from './routes/workouts.js';
import userRouter from './routes/user.js';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
dotenv.config();
const WorkoutRoutes = router;
const UserRoutes = userRouter;

//environment variables
const PORT = process.env.PORT || 3000;
const MongoDBURI = process.env.MONGO_URI;


//middleware
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});


//routes
app.use('/api/workouts', WorkoutRoutes);
app.use('/api/user', UserRoutes);


//connect to db
const connect = async () => {
  mongoose.connect(MongoDBURI)
  .then(() => {
    //listening for requests
    app.listen(PORT, () => {
      console.log(`connected to db and listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error)
  })
}

connect();
