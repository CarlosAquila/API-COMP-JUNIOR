import express from 'express';
import { errorHandler } from './middlewares/serverMiddleware';
import { routes } from './routes';

const port = 3000;

const app = express();

app.use(express.json());

app.use(routes);

app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));