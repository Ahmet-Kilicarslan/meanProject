import {ConflictError, NotFoundError} from '../../Utilities/errors.js';
import ProductFactory from "./ProductFactory.js";

export default class ProductService {

    constructor(productRepository) {
        this.productRepository = productRepository;
    }

    async ensureUniqueName(name) {
        const existingName = await this.productRepository.getProductByName(name);

        if (existingName) {
            throw new ConflictError("Name already exists");
        }
    }


    async createProduct(product) {


        try {
            const newProduct = await ProductFactory.createProduct(product);

            //await this.ensureUniqueName(newProduct.name);

            return await this.productRepository.save(newProduct);
        } catch (error) {
            throw error;
        }
    }

    async updateProduct(product) {

        try {
            const fetchedProduct = await this.productRepository.getProductById(product.id);

            if (fetchedProduct.name) {
                fetchedProduct.changeName(fetchedProduct.name);
            }


            if (!fetchedProduct.amount < 0) {
                fetchedProduct.changeAmount(fetchedProduct.amount);
            }

            if (fetchedProduct.price) {
                fetchedProduct.changePrice(fetchedProduct.price);
            }

            return await this.productRepository.save(fetchedProduct);
        } catch (error) {
            throw error;
        }


    }
    async updateAmount(id, amount) {
        try{

            const fetchedProduct = await this.productRepository.getProductById(id);

            if (!fetchedProduct.amount < 0) {
                fetchedProduct.changeAmount(amount);
            }

            return await this.productRepository.save(fetchedProduct);
        }catch (error) {
            throw error;
        }
    }

    async deleteProduct(productId) {
        return await this.productRepository.deleteProduct(productId);
    }

    async getProductById(productId) {
        const fetchedProduct = await this.productRepository.getProductById(productId);

        if (!fetchedProduct) {
            throw new NotFoundError('Product not found');
        }
        return fetchedProduct;
    }

    async getProductsByName(name) {
        const fetchedProduct = await this.productRepository.getProductsByName(name);
        if (!fetchedProduct) {
            throw new NotFoundError('Product not found');
        }
        return fetchedProduct;
    }

    async getAllProducts() {

        try {

            return await this.productRepository.getAllProducts();
        }catch (error) {
            throw error;
        }
    }

    async getAllProductsWithDetails() {
        try {
            return await this.productRepository.getAllProductsWithDetails();
        }catch (error) {
            throw error;
        }

    }

}