import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  User } from 'src/app/model/User';
import { HttpClientService } from 'src/app/service/http-client.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: Array<User> = [] ;
  selectedUser: User = new User ;
  action!:string; 
  

  constructor(private httpService: HttpClientService, private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() { 
   this.refreshList();
   
  }
  handleSuccessfulResponse(response: any) {
    this.users = response;
  } 

  // when we add a user we send action=add
  addUser() {
    this.selectedUser = new User(); 
   // console.log( "user" + this.selectedUser.name);
    this.router.navigate(['admin', 'users'], { queryParams: { action: 'add' } });
  } 
  refreshList() {
    this.httpService.getUsers().subscribe(
      response => this.handleSuccessfulResponse(response),
    );
    // get the param value
   this.activatedRoute.queryParams.subscribe(
     (params) => {
       console.log(params);
       this.action = params['action'];
       const selectedUserId = params['id'];
       if (selectedUserId) {
         this.selectedUser = this.users.find(user => user.id === +selectedUserId)!
       }
     }
   )
  }

  viewUser(id: number) { 
    console.log(this.selectedUser);
    
    this.router.navigate(['admin', 'users'], { queryParams: {id, action: 'view' } });

  }

}
