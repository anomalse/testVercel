import { VercelRequest, VercelResponse } from '@vercel/node'

export default function handler( req, res) {
  const { name = 'Sabine' } = req.query
  return res.json({
    message: `Hello ${name}!`,
  })
}