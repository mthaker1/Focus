import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { NgFlashMessageService } from 'ng-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router,
              private ngFlashMessageService: NgFlashMessageService) { }

  ngOnInit() {
  }

  onLogoutClick(){
    this.authService.logout();
    this.ngFlashMessageService.showFlashMessage({messages: ['You are now logged out'], type: 'success'});
    this.router.navigate(['/login']);
  }

}
