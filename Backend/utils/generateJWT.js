import jwt from 'jsonwebtoken';

// ⬇️ Add this above your controller function
const generateJWT = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

export default generateJWT;