import { NextFunction, Request, Response, Router } from 'express';
import { runDockerProcess } from '../utils/docker';

const router = Router();


router.post('/run-python', async (req: Request, res: Response) => {
    try {
        const code = req.body.code;
        const inputData = req.body.inputData;

        const executionOutput = await runDockerProcess(code, inputData, 'python-service');
        res.send(executionOutput);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).send('Internal Server Error');
});

export default router;
