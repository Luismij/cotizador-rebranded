const express = require('express');
const router = express.Router();
const customerCtrl = require('../controllers/customer.controller')
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
router.post("/", [verifyToken, customerCtrl.createCustomer])

/**
 * @swagger
 * /customer/:
 *  get:
 *    summary: Get customer list of a user
 *    tags: [Customer]
 *    parameters:
 *      - in: header
 *        name: jwt-token
 *        schema:
 *          type: string
 *          example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ1OTIyNTY4fQ.rkIDY2KI-n0VJ8d77cyMA75SYKhNxQleNo1Stfyxhyc
 *        required: true
 *    responses:
 *      200:
 *        description: Get customers array
 *      400:
 *        description: Something went wrong
 *      500:
 *        description: Server error
 */
router.get("/", [verifyToken, customerCtrl.getCustomersByUserId])

/**
 * @swagger
 * /customer/{id}:
 *  get:
 *    summary: Get customer by id
 *    tags: [Customer]
 *    parameters:
 *      - in: header
 *        name: jwt-token
 *        schema:
 *          type: string
 *          example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ1OTIyNTY4fQ.rkIDY2KI-n0VJ8d77cyMA75SYKhNxQleNo1Stfyxhyc
 *        required: true
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          example: 1111
 *    responses:
 *      200:
 *        description: Get customer info
 *      400:
 *        description: Something went wrong
 *      500:
 *        description: Server error
 */
router.get("/:id", [verifyToken, customerCtrl.getCustomerById])

/**
 * @swagger
 * /customer/{id}:
 *  delete:
 *    summary: Delete customer by id
 *    tags: [Customer]
 *    parameters:
 *      - in: header
 *        name: jwt-token
 *        schema:
 *          type: string
 *          example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ1OTIyNTY4fQ.rkIDY2KI-n0VJ8d77cyMA75SYKhNxQleNo1Stfyxhyc
 *        required: true
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          example: 1111
 *    responses:
 *      200:
 *        description: Deleted customer
 *      400:
 *        description: Something went wrong
 *      500:
 *        description: Server error
 */
 router.delete("/:id", [verifyToken, customerCtrl.deleteCustomerById])

module.exports = router;
