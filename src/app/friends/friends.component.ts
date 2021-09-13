import { Component, OnInit } from '@angular/core';
import { EndpointService } from '../service/endpoint.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  otherPosts = [];
  userId: String;
  friend_data: { id: any; fullName: any; };
  friend_data_arr = [];
  count: number;


  constructor(private service :EndpointService) { 
    
  }

  ngOnInit() {
    this.getdata()
  }

  getdata() {
    this.userId = this.service.userid;
    this.service.getAllFriends().subscribe(res =>{
      res.forEach(ele => {
        if(ele.userId == this.userId){
          this.service.friend_d.forEach(e => {
            if(ele.friendId == e.id) {
                ele.fullName = e.fullName
            }
          })
          this.otherPosts.push(ele);
          this.count = this.otherPosts.length;
        } 
      });
    });
  }

  updateFriendreq(data) {
    let payload = { "userId": this.userId, "friendId": data.friendId, "status": "You are friends"}
    this.service.updateFriendstatus(payload,data._id).subscribe(res => {
      this.getdata()
    })

  }

}
