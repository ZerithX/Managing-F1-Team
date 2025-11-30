import express from 'express';
import router from './routes/routes.js';

const app = express(); 
const PORT = 3000;

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 


app.use(router);