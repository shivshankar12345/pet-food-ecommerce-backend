import express from 'express';
import { ProductController } from '../controllers/product.controller'
import { upload } from '../middleware/upload.middleware';

const productController = new ProductController();
const router = express.Router();

router.post('/createproducts', upload.single('image'), (req, res) => productController.createProduct(req, res));
router.get('/getAllproducts', (req, res) => productController.getAllProducts(req, res));
router.get('/getproducts/:id', (req, res) => productController.getProductById(req, res));
router.put('/updateproducts/:id', upload.single('image'), (req, res) => productController.updateProduct(req, res));
router.delete('/deleteproducts/:id', (req, res) => productController.deleteProduct(req, res));

export default router;
