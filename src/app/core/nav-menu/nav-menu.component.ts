import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bb-nav-menu',
  templateUrl: './nav-menu.component.html'
})
export class NavMenuComponent implements OnInit {
  navbarCollapsed = true;

  constructor() { }

  ngOnInit() {
  }

}
