import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Subject, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  Product: any;
  refeshProduct:any;
  constructor(private http : HttpClient) { }
    
    private _refeshProduct$ =new Subject<void>();
    get _refeshProduct(){
      return this._refeshProduct$;
    }
  postProduct(data:any){
    return this.http.post<any[]>("https://task-1-6f5bc-default-rtdb.firebaseio.com/product.json/",data).
    pipe(
      tap(()=>{
        this._refeshProduct.next()
      })
    ).subscribe((param:any)=>{console.log(param)})
  }
  
  getProduct(){
    return this.http.get<any>("https://task-1-6f5bc-default-rtdb.firebaseio.com/product.json").pipe(map((prod:any)=>{
       const myProdArray=[];
       for(let prodId in prod){
        myProdArray.push(({...prod[ prodId]}))
       }
       return myProdArray
    }));
  }
 
}
  


