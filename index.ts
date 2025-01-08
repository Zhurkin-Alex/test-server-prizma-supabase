import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();
const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

app.get('/users', async (req: Request, res: Response) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

app.post('/users', async (req: Request, res: Response) => {
    const { email, name } = req.body;
    const user = await prisma.user.create({
        data: { email, name },
    });
    res.status(201).json(user);
});

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
export default app;