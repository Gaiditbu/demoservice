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
  productData:Product[]

  ngOnInit(): void {
    this.getMenuId = this.param.snapshot.paramMap.get('id');
    console.log(this.getMenuId,'getmenu');
    if(this.getMenuId)
    {
      this.service.fetchProducts().subscribe((data: Product[]) => {
        this.productData = data;
        if (this.productData.length <= 0) {
          this.menuData =  this.service.foodDetails.filter((value)=>{
            return value.id == this.getMenuId;
          });
        } else {
          this.menuData = this.productData.filter((value)=>{
            return value.id == this.getMenuId;
          });
        }
      })
    }
    
  }

}
