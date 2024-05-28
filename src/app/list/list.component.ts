import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListService } from '../services/list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  
  item: any;
  date= "";
  modality = "";
  position = "";
  entry = "";
  external="";
  city="";
  validate:boolean = false;
  lists:any;
  product:any;
  id:any;
  listsPrroducts : string[] = [];
  listsPrroductsCheck : any[] = [];
  total=0;
  identification="";
  direccion="";


  constructor(
    private router: Router,
    private listService : ListService
  ) { }
  
  ngOnInit(): void {
    this.getListProducts();
    this.listsPrroductsCheck = JSON.parse(localStorage.getItem('productos')|| '{}');
  }

  valueProducts(){
    this.listsPrroductsCheck.forEach(element => {
        this.total += parseInt(element.valor);//Parseo a int para evitar NaN
    });
  }

 getListProducts(){
  this.listService.get().subscribe(data =>
   this.lists = data.response );

}

createItem(){

  var item = {
      cedula: this.identification,
      direccion: this.direccion,
      id_producto: this.product.id
  }
  this.listService.createItem(item).subscribe(data =>
    this.removeProduct());

}

addProduct(){
  this.listsPrroducts.push(this.product);
  localStorage.setItem('productos',JSON.stringify(this.listsPrroducts));
  this.listsPrroductsCheck = JSON.parse(localStorage.getItem('productos')|| '{}');
  this.valueProducts();
}

removeProduct(){
  localStorage.removeItem('productos');
  location.reload();
}


}
