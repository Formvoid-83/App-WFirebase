import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private sellingCart: Product[] = [];

  private _products: BehaviorSubject<Product[]>

  constructor() {
    this._products = new BehaviorSubject<Product[]>([]);
   }

   get products(){
    return this._products.asObservable();
   }

   addNewProduct(product: Product){
      this.sellingCart.push(product);
      this._products.next(this.sellingCart);
   }
} 
