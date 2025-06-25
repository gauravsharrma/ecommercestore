import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

export interface Product {
  id: number;
  name: string;
  price: number;
}

@Injectable()
export class ProductService {
  private products: Product[] = [];
  private nextId = 1;

  create(createProductDto: CreateProductDto): Product {
    const product: Product = {
      id: this.nextId++,
      ...createProductDto,
    };
    this.products.push(product);
    return product;
  }

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto): Product {
    const product = this.findOne(id);
    Object.assign(product, updateProductDto);
    return product;
  }

  remove(id: number): void {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    this.products.splice(index, 1);
  }
}
