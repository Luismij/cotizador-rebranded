const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/product.cotroller')
const { verifyToken } = require('../middlewares/authJWT')

/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: The product name
 *        email:
 *          type: string
 *          description: The product email
 *        phone:
 *          type: number
 *          description: The product phone
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
 * /product/:
 *  get:
 *    summary: Get products list
 *    tags: [Product]
 *    parameters:
 *    - in: header
 *      name: jwt-token
 *      schema:
 *        type: string
 *        example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ1OTIyNTY4fQ.rkIDY2KI-n0VJ8d77cyMA75SYKhNxQleNo1Stfyxhyc
 *      required: true
 *    responses:
 *      200:
 *        description: Get products list
 *      400:
 *        description: Something went wrong
 *      500:
 *        description: Server error
 */
router.get("/", [verifyToken, productCtrl.getProducts])

/**
* @swagger
* /product/update:
*  get:
*    summary: Update product list
*    tags: [Product]
*    responses:
*      200:
*        description: Updated product list
*      400:
*        description: Something went wrong
*      500:
*        description: Server error
*/
router.get("/update", productCtrl.updateProducts)

module.exports = router;
