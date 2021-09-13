import { Component, OnInit } from '@angular/core';
import { EndpointService } from '../service/endpoint.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: any = [];
  usersCount: number;
  adminCount: number = 0;
  activeCount: number = 0;


  constructor(private service :EndpointService) { }

  ngOnInit() { 
    this.getUsers()
  }

  getUsers() {
    this.service.getAllUsers().subscribe(res =>{
      this.users = res;
      this.usersCount = this.users.length;
      this.users.forEach(e => {
        if(e.isAdmin) {
          this.adminCount ++;
        }
        if(e.isActive) {
          this.activeCount ++;
        }
        
      });
    });
  }

  deleteUser(data) {
    this.service.deleteUserbyId(data._id).subscribe(res => {
      alert("User deleted successfully")
      this.getUsers()
      window.scrollTo(0,0)
    })
  }

}
