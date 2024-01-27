import { NextFunction, Request, Response, Router } from 'express';
import { runDockerProcess } from '../utils/docker';


const router = Router();

router.post('/run-c', async (req: Request, res: Response) => {
    console.log("run-c");
    try {
        const code = req.body.code;
        const inputData = req.body.inputData;
        const executionOutput = await runDockerProcess(code, inputData, 'c-service');
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
