const express = require('express');
const router = express.Router();
const markingCtrl = require('../controllers/marking.controller')
const { verifyToken } = require('../middlewares/authJWT')

/**
 * @swagger
 * components:
 *  schemas:
 *    Customer:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: The customer name
 *        email:
 *          type: string
 *          description: The customer email
 *        phone:
 *          type: number
 *          description: The customer phone
 *      required:
 *        - userId
 *        - name
 *      example:
 *        name: Andres Rios
 *        email: andres@example.com
 *        phone: 1111111
 */

/**
 * @swagger
 * /customer/:
 *  post:
 *    summary: Create a new customer
 *    tags: [Customer]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Customer'
 *    parameters:
 *    - in: header
 *      name: jwt-token
 *      schema:
 *        type: string
 *        example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ1OTIyNTY4fQ.rkIDY2KI-n0VJ8d77cyMA75SYKhNxQleNo1Stfyxhyc
 *      required: true
 *    responses:
 *      200:
 *        description: New customer created
 *      400:
 *        description: Something went wrong
 *      500:
 *        description: Server error
 */
router.post("/", [verifyToken, markingCtrl.createMarking])

/**
 * @swagger
 * /customer/:
 *  post:
 *    summary: Create a new customer
 *    tags: [Customer]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Customer'
 *    parameters:
 *    - in: header
 *      name: jwt-token
 *      schema:
 *        type: string
 *        example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ1OTIyNTY4fQ.rkIDY2KI-n0VJ8d77cyMA75SYKhNxQleNo1Stfyxhyc
 *      required: true
 *    responses:
 *      200:
 *        description: New customer created
 *      400:
 *        description: Something went wrong
 *      500:
 *        description: Server error
 */
 router.get("/", [verifyToken, markingCtrl.getMarkings])

module.exports = router;
