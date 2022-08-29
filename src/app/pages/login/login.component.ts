import { Component, OnInit } from '@angular/core';
import {ResourceService} from "../services/resource.service";
import {User} from "../class/user";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User = {name : '', password: ''};
  error = false;

  constructor(private resourceService: ResourceService, private router: Router) { }

  ngOnInit(): void {
    localStorage.removeItem('connected');
  }

  click(){
    this.resourceService.getUser().subscribe(value => {
      if (this.user.name != value[0].name  || this.user.password != value[0].password){
       this.error = true
      }
      else {
       this.error = false;
       localStorage.setItem('connected', "true");
       this.router.navigate(['/welcome']);
      }
    })
  }
}
