// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import wordsArr from "./wordsArr"
export default function handler(req, res) {
  const words = wordsArr;

  res.status(200).json(words)
}
