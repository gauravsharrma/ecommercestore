import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ProductService, Product } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto): Product {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll(): Product[] {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Product {
    return this.productService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Product {
    return this.productService.update(Number(id), updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    return this.productService.remove(Number(id));
  }
}
