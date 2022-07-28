import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { HttpClientService } from 'src/app/service/http-client.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  @Input("user") user!: User; 
  @Output() refreshList = new EventEmitter();

  constructor(private httpService: HttpClientService,
    private router: Router) { }

  ngOnInit(): void {
  }
  deleteUser() {
   this.httpService.deleteUser(this.user.id).subscribe(
     (user) => { 
       this.refreshList.emit();
       this.router.navigate(['admin', 'users']);
     }
   )
  }
}
