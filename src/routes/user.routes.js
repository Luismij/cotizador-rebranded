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
 *        webAddress:
 *          type: string
 *          description: The user web address
 *        logo:
 *          type: string
 *          description: The user logo
 *        nit:
 *          type: number
 *          description: The user nit
 *        address:
 *          type: string
 *          description: The user address
 *        businessName:
 *          type: string
 *          description: The user businessName
 *        phone:
 *          type: number
 *          description: The user phone
 *      required:
 *        - name
 *        - email
 *        - password
 *      example:
 *        name: Alan Kay
 *        email: alan@example.com
 *        password: password123
 *        webAddress: www.example.com
 *        nit: 654321
 *        address: Av98 98 98
 *        businessName: example
 *        phone: 123456
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
 * /user/:
 *  put:
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
router.put("/", [verifyToken, userCtrl.editUser])

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
 *          example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMjE5NTFkMjhhZjc5ZTFkYmZmYTJhOCIsImlhdCI6MTY0NjM2ODA1Nn0.lG9s_sMGmnVJfp3TDJpbmSmZfxcu0WKHRRM5UCEqV-Y
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
