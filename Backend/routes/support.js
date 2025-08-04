import express from 'express';
const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  // Store in DB or send email
  console.log('Support request received:', { name, email, message });

  res.status(200).json({ message: 'Support request submitted' });
});

export default router;
