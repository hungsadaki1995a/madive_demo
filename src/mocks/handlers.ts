import { rest } from 'msw';
import nodeList from './nodeList.json';
import metaList from './metaList.json';

export const handlers = [
  rest.post('/nodeList', async (req, res, ctx) => {
    await sleep(200);
    return res(ctx.status(200), ctx.json(nodeList));
  }),
  rest.post('/metaList', async (req, res, ctx) => {
    await sleep(200);
    return res(ctx.status(201), ctx.json(metaList));
  }),
];

async function sleep(timeout: number) {
  // fake
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
