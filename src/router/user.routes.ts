import { Router } from 'express';
import { userLogin, userRegister } from '../controllers/user.controller';
const validator = require('express-joi-validation').createValidator({});
import Joi from 'joi';
const router = Router();

const UserJOI = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

router.post('/login', validator.body(UserJOI), userLogin);
router.post('/register', validator.body(UserJOI), userRegister);

export default router;
