import { Component, OnInit } from '@angular/core';
import { EndpointService } from '../service/endpoint.service';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss']
})
export class NetworkComponent implements OnInit {
  otherPosts: any;
  peopleCount: Number;


  constructor(private service: EndpointService) { }

  ngOnInit() {
    this.service.getAllUsers().subscribe(res =>{
      this.otherPosts = res;
      this.peopleCount = this.otherPosts.length;
    });
  }

  createFriendreq(data) {
    let payload = {
      status: "Request pending",
      userId: this.service.userid,
      friendId: data.userId

     }
    this.service.createFriendRequest(payload).subscribe(res =>{
      alert("Frined request created, please check in Friends Section")
    })
  }



}
