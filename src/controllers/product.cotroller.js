const Product = require('../models/Product');
const axios = require('axios').default
const HttpsProxyAgent = require("https-proxy-agent")
const _ = require('lodash')

const updateProducts = async (req, res) => {
  try {
    await Product.deleteMany({})
    const httpsAgent = new HttpsProxyAgent({ host: '154.9.32.21', port: '8800' })
    const categories = (await axios.get('https://api.cataprom.com/rest/categorias/', { httpsAgent })).data.resultado
    let products = []
    for (const category of categories) {
      const addProducts = async () => {
        try {
          const productsOfCategory = (await axios.get(`https://api.cataprom.com/rest/categorias/${category.id}/productos`, { httpsAgent })).data.resultado
          products = products.concat(productsOfCategory)
        } catch (error) {
          await addProducts()
        }
      }
      await addProducts()
    }
    let finalListOfProducts = products.map((p) => {
      let prices = []
      for (let i = 1; i <= 5; i++) {
        if (p[`precio${i}`] && p[`precio${i}`] > 0) {
          prices.push({
            price: p[`precio${i}`],
            description: p[`descripcionPrecio${i}`]
          })
        }
      }
      const product = {
        sku: p.referencia,
        name: p.nombre,
        resume: p.resumen,
        keywords: p.palabrasClaveSeo,
        description: p.descripcionProducto,
        photo: p.imageUrl,
        prices
      }
      return product
    })
    finalListOfProducts = _.uniqBy(finalListOfProducts, (p) => p.sku)
    const result = await Product.insertMany(finalListOfProducts)
    return res.status(200).json(result)
  } catch (error) {
    return res.status(400).json({ message: 'Something went wrong', error })
  }
}

/**
 * Function that allows to create a new customer.
 * @returns {Object} Success message or error message
 */
const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
    return res.status(200).json(products)
  } catch (error) {
    return res.status(400).json({ message: 'Something went wrong' })
  }
}

module.exports = {
  getProducts,
  updateProducts
}