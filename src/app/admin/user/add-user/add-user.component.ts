import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { HttpClientService } from 'src/app/service/http-client.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  @Input()
  user!: User  
  newUser!: User;

  @Output() refreshList = new EventEmitter();
  constructor(private httpService: HttpClientService,
    private router: Router) { }

  ngOnInit(): void {
    this.newUser = Object.assign({}, this.user);

  }
  addUser() { 
    console.log(this.newUser);
    this.httpService.addUser(this.user).subscribe(
      (user) => { 
        this.refreshList.emit();
        this.router.navigate(['admin', 'users']);
      }
    );
  }
}
