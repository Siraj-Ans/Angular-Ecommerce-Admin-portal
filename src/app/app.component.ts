import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Ecommerce-admin-portal';

  onDropdown(): void {
    document
      .getElementById('hamburger-menu')
      .classList.toggle('hamburger-toggle');
    document.getElementById('adminPanel').classList.toggle('show');
  }
}
