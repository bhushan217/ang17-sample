import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { IUser } from './../index-db/index-db-interfaces/user.interface';
import { UserService } from './constants/services/user.service';
import { routes } from './app.routes';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {
  cUser: IUser = {
    id: 0, user_name: 'guest',
    role: 'GUEST',
    active_status: 'active'
  };
  openDrawer = true;
  themeCheck = true;
  title = 'ang17-sample';

  @ViewChild("app_main")
  mainContainer?: ElementRef

  topNavs: any[] = []

  userService = inject(UserService)
  constructor() {}
  async ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.initTheme()
    this.userService.list()
    this.topNavs = routes.filter( r => r.title).map( r => ({path: r.path, title: r.title, icon: r.data?.['icon']}))

  }

  initTheme(){
    if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
      // Set colorScheme to Dark if prefers-color-scheme is dark. Otherwise, set it to Light.
      this.themeCheck = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
    } else {
      // If the browser does not support prefers-color-scheme, set the default to dark.
      this.themeCheck = true;
    }
    this.setTheme();
  }

  toggleTheme() {
    this.themeCheck = !this.themeCheck;
    this.setTheme()
  }
  setTheme(){
    document.body.toggleAttribute('theme-dark', this.themeCheck);    
    document.querySelector('#app-theme-style')?.setAttribute('href','theme-'+(this.themeCheck?'dark': 'light')+'.css')

  }
  
  toggleNavDrawer(){
    this.openDrawer = !this.openDrawer;
    this.mainContainer?.nativeElement.toggleAttribute('nav-x', !this.openDrawer)
  }
}
