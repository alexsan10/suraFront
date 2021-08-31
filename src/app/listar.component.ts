import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../Service/service.service'
import { Producto } from 'src/app/Modelo/Persona';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  send_date=new Date();
   formattedDate : any;
   
  producto: Producto[];
  constructor(private service: ServiceService, private router: Router) { 

    this.send_date.setMonth(this.send_date.getMonth()+8);
     this.formattedDate=this.send_date.toISOString().slice(0,10);
 console.log(this.formattedDate); 
  }

  ngOnInit() {
    this.service.getProducto()
      .subscribe(data => {
        this.producto = data;
      });

  }

  

  Editar(producto:Producto):void{
    localStorage.setItem("id",producto.id.toString());
    this.router.navigate(["edit"]);
  }

  Delete(producto:Producto){
    this.service.deleteProducto(producto)
    .subscribe(data=>{
      this.producto=this.producto.filter(p=>p!==producto);
      alert("Usuario eliminado...");
    })
  }

}
