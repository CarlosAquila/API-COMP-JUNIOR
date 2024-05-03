import express from 'express';
import { errorHandler } from './middlewares/serverMiddleware';

const port = 3000;
const app = express();

// to do: add routes

app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));