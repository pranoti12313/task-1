import { Component, OnInit } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  product:any[]=[];
  total:any;
  Product: any[]=[];
 
 
  constructor(private dialog:MatDialog , private prodServ:ProductService){}
  openDialog(){
    this.dialog.open(DialogComponent,{
      width:'60%',
      enterAnimationDuration :'1000ms',
      exitAnimationDuration: '1000ms',
      panelClass: 'my-dialog'
    });
  };

  ngOnInit(): void {
    this.getProduct();
    this.prodServ._refeshProduct.subscribe(()=>{
      this.getProduct()
    })
  };
  increaseQuantity(param : any) {
       param.qantity++
  };
  decreaseQuantity(prod : any) {
    if(prod.qantity>1){
      prod.qantity = prod.qantity-1
    }
  };
  getTotal(): number {
    return this.Product.reduce((total, sm) => total + (sm.price * sm.qantity), 0);
  };
  getProduct(){
    this.prodServ.getProduct().subscribe(   
      {next:(param:any)=>{
        console.log(param)
        this.product=param
      }})
  };
 
  dataSendToBag(data:any) {
    let newData =Object.assign({},data)
    this.Product.push(newData);
}
  addToCart(prod:any){ 
    for(let i of this.Product ){
      if(i++){
        i.productPrice = prod.productQty * prod.productPrice
        i.productQty = prod.productQty
      }
    }
    this.dataSendToBag(prod);
    this.getTotal()
  };
  deleteProduct(index: number) {
    alert("Please Delete the Product from Shopping bag")
    this.Product.splice(index, 1);
  }
  
}


