import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/product.model';
import { OrderDetailsService } from 'src/app/services/order-details.service';

@Component({
  selector: 'app-menupage',
  templateUrl: './menupage.component.html',
  styleUrls: ['./menupage.component.css']
})
export class MenupageComponent implements OnInit {

  constructor(private param:ActivatedRoute,private service:OrderDetailsService) { }
  getMenuId:any;
  menuData:any;
  productData:Product[] = [];

  ngOnInit(): void {
    this.getMenuId = this.param.snapshot.paramMap.get('id');
    console.log(this.getMenuId,'getmenu');
    if(this.getMenuId)
    {
      ////Static data
      // this.menuData =  this.service.foodDetails.filter((value)=>{
      //     return value.id == this.getMenuId;
      //   });

      ////Use API
      this.productData = this.service.fetchProducts();
      this.menuData = this.productData.filter((value)=>{
        return value.id == this.getMenuId;
      });
        console.log(this.menuData,'menudata>>');
        
    }
    
  }

}
