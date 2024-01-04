import { Component } from '@angular/core';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [PanelModule],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.sass'
})
export class PageNotFoundComponent {

}
