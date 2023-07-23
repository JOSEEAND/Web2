import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  lotsOfTabs = new Array(2).fill(0).map((_, index) => `Tab ${index}`);
}
