import {Component, ViewEncapsulation} from '@angular/core';
import {MatCheckboxChange, MatCheckboxModule} from "@angular/material/checkbox";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatCheckboxModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
  onCheckboxChange(event: MatCheckboxChange) {
    console.log(event.checked);
  }



}
