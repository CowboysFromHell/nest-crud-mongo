import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name)
        private productModel:Model<ProductDocument>
    ){}

    async create(createProductDto:CreateProductDto):Promise<Product>{
        const newProduct = new this.productModel(createProductDto)
        return newProduct.save()
    }

    async findAll():Promise<Product[]>{
        return this.productModel.find().exec()
    }

    async findOne(id:string):Promise<Product>{
        return this.productModel.findById(id).exec()
    }

    async update(id:string, updateProductDto:UpdateProductDto):Promise<Product>{
        return this.productModel
        .findByIdAndUpdate(id, updateProductDto, {new:true})
        .exec()
    }

    async delete(id:string):Promise<{message:string}>{
        try{
            const result = await this.productModel.findByIdAndDelete(id).exec()

            if(!result){
                throw new NotFoundException(`Product with ID ${id} not found`)
            }
            return {message:"Delete Successful"}
        }
        catch(error){
            throw new InternalServerErrorException(
                'An error occured during deletion',
            )
        }
    }
}
