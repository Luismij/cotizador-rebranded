const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller')
const { verifyToken } = require('../middlewares/authJWT')

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: The user name
 *        email:
 *          type: string
 *          description: The user email
 *        password:
 *          type: string
 *          description: The user password
 *      required:
 *        - userName
 *        - email
 *        - password
 *      example:
 *        name: Alan Kay
 *        email: alan@example.com
 *        password: password123
 */

/**
 * @swagger
 * /user/signup:
 *  post:
 *    summary: Create a new user
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: New user created
 *      400:
 *        description: Something went wrong
 *      500:
 *        description: Server error
 */
router.post("/signup", userCtrl.signUp)

/**
 * @swagger
 * /user/login:
 *  post:
 *    summary: Login user
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *          properties:
 *            email:
 *              type: string
 *              description: The user email
 *            password:
 *             type: string
 *             description: The user password
 *          required:
 *            - email
 *            - password
 *          example:
 *            email: alan@example.com
 *            password: password123
 *    responses:
 *      200:
 *        description: Successfully login
 *      400:
 *        description: Something went wrong
 *      500:
 *        description: Server error
 */
router.post("/login", userCtrl.logIn)

/**
 * @swagger
 * /user/loginjwt:
 *  get:
 *    summary: Login user with JWT
 *    tags: [User]
 *    parameters:
 *      - in: header
 *        name: jwt-token
 *        schema:
 *          type: string
 *          example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ1OTIyNTY4fQ.rkIDY2KI-n0VJ8d77cyMA75SYKhNxQleNo1Stfyxhyc
 *        required: true
 *    responses:
 *      200:
 *        description: Successfully login
 *      400:
 *        description: Something went wrong
 *      500:
 *        description: Server error
 */
router.get("/loginjwt", [verifyToken, userCtrl.logInJWT])

module.exports = router;
