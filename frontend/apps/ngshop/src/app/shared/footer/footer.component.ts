import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'eshop-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

  constructor() { }

  get lastYear(): number {
    return new Date().getFullYear();
  }

  ngOnInit(): void {
  }

}
