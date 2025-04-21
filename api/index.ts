import { createNestServer } from '../src/main';
import type { IncomingMessage, ServerResponse } from 'http';

let cachedServer: any;

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (!cachedServer) {
    cachedServer = await createNestServer();
  }
  return cachedServer(req, res);
}