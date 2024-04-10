import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent implements OnInit {
  myform:FormGroup|any;
  constructor(public dialogRef: MatDialogRef<DialogComponent>, private builder:FormBuilder, private prodServ:ProductService) {}
  closeDialog() {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.myform=this.builder.group({
      name:this.builder.control('',Validators.required),
      image:this.builder.control('',Validators.required),
      price:this.builder.control('',Validators.required),
      qantity: 0,
      total:0.00,
    });
  }
  public myError = (controlName: string, errorName: string) =>{
    return this.myform.controls[controlName].hasError(errorName);
    }

  addToCart(){
      console.log(this.myform.value)
      this.prodServ.postProduct(this.myform.value)
      this.myform.reset()
    }
}

