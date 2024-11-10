import express, { Application } from 'express';
import db from './config/connection.js';
import routes from './routes/index.js';

const app: Application = express();
const PORT = 3001;

app.use(express.json());
app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
