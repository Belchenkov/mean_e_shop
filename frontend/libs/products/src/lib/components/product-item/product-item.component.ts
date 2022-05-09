import { Component, Input, OnInit } from '@angular/core';

import { Product } from '@frontend/products';

@Component({
  selector: 'products-product-item',
  templateUrl: './product-item.component.html',
  styles: [
  ]
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
