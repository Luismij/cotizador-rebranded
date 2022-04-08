const express = require('express');
const router = express.Router();
const discountCtrl = require('../controllers/discount.controller')
const { verifyToken } = require('../middlewares/authJWT')

/**
 * @swagger
 * /discount:
 *  get:
 *    summary: Get discount
 *    tags: [Discount]
 *    parameters:
 *      - in: header
 *        name: jwt-token
 *        schema:
 *          type: string
 *          example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMjE5NTFkMjhhZjc5ZTFkYmZmYTJhOCIsImlhdCI6MTY0NjM2ODA1Nn0.lG9s_sMGmnVJfp3TDJpbmSmZfxcu0WKHRRM5UCEqV-Y
 *        required: true
 *    responses:
 *      200:
 *        description: Get discount
 *      400:
 *        description: Something went wrong
 *      500:
 *        description: Server error
 */
router.get("/discount", [verifyToken, discountCtrl.editDiscount])

/**
 * @swagger
 * /discount:
 *  put:
 *    summary: Edit discount
 *    tags: [Discount]
 *    parameters:
 *      - in: header
 *        name: jwt-token
 *        schema:
 *          type: string
 *          example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMjE5NTFkMjhhZjc5ZTFkYmZmYTJhOCIsImlhdCI6MTY0NjM2ODA1Nn0.lG9s_sMGmnVJfp3TDJpbmSmZfxcu0WKHRRM5UCEqV-Y
 *        required: true
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Discount'
 *    responses:
 *      200:
 *        description: Discuount edited
 *      400:
 *        description: Something went wrong
 *      500:
 *        description: Server error
 */
router.put("/discount", [verifyToken, discountCtrl.editDiscount])

module.exports = router;
