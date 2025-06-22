import { NextApiRequest, NextApiResponse } from 'next';
import { getApiDocs } from '../../utils/swagger';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiDocs = getApiDocs();
  res.status(200).json(apiDocs);
}