import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { EndpointService } from 'src/app/service/endpoint.service';

class ImageSnippet {
  // src: string;
  // file : File
  constructor( public src: string, public file: File) {}
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {
  userName: any;
  posts:any;
  postCount: any;
  publicPostCount : number;
  createPostForm: FormGroup;
  submitted: boolean = false;
  iscreatePost = false;
  isPostCreated: boolean;
  updatePostForm: FormGroup;
  isupdatePost: boolean;
  updatePostId: any;
  age: Number;
  otherPosts: any;
  img_src: any;
  city: any;
  country: any;
  state: any;
  pincode: any;
  phone: any;
  fileToUpload: File;
  selectedFile: ImageSnippet;
  isPostUpdated: boolean;
  isPostDeleted: boolean;

  constructor(private service: EndpointService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,) { 
    window.screenTop;
    this.userName = this.service.username;
    this.age = this.service.age;
    this.city = this.service.city;
    this.country = this.service.country;
    this.state = this.service.state;
    this.pincode = this.service.pincode;
    this.phone = this.service.pone;
    console.log("usernme", this.userName)
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    console.log("fileee", this.fileToUpload)
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);
      console.log("selectedfile,", this.selectedFile)
      var image = new Image();
      image.src = this.selectedFile.src;
      console.log("imageee res",image)
      this.service.fileUpload({"picture":image}).subscribe(res => {
        console.log("file res",res)
      })
    });

    reader.readAsDataURL(file);
  }


  setting() {
    this.router.navigateByUrl('/settings')
  }
  network(){
    this.router.navigateByUrl('/network')

  }
  friends(){
    this.router.navigateByUrl('/friends')

  }

  

  model = {
    left: true,
    middle: false,
    right: false
};

focus;
focus1;
focus2;
focus3;

  ngOnInit() {

    this.service.getFile().subscribe(res => {
      let mySrc;
      const reader = new FileReader();
      reader.readAsDataURL(res); 
      reader.onloadend = function() {
         mySrc = reader.result; 
         document.getElementById('profile-img').setAttribute('src', mySrc);
      }
    });

    this.getpost()
   
    this.createPostForm = this.formBuilder.group(
      {
        post: [null, [Validators.required]],
        profession: [null, [Validators.required]],
        isActive: [null],
        userId: [this.service.userid],
        isAdmin: [true],
        userName: [this.userName]
      }
    );

    this.updatePostForm = this.formBuilder.group(
      {
        post: [null, [Validators.required]],
        profession: [null, [Validators.required]],
        isActive: [false]
      }
    );

    
  }

  get f() { return this.createPostForm.controls; }

  getpost() {
    window.scrollTo(0,0);
    this.service.getPostbyId().subscribe(res =>{
      console.log("post",res)
     
      this.posts = res;
      this.postCount = this.posts.length;
    });

    this.service.getAllPost().subscribe(res =>{
      this.otherPosts = res;
      this.publicPostCount = this.otherPosts.length
      res.forEach(ele => {
        this.service.friend_d.push({"id":ele.userId, "fullName":ele.userName})
      });
     
    });
  
    
  }  

  onSubmit() {
    this.submitted = true;
    if(this.createPostForm.valid) {
      console.log("form create post", this.createPostForm.value)
      this.service.createPost(this.createPostForm.value).subscribe(res =>{
        if(res.message == 'Post created successfully') {
          window.scrollTo(0,0)
          this.iscreatePost = false;
          this.getpost()
          this.isPostCreated = true;
          this.createPostForm.reset();

        }
      })
    }
  }

  deletepost(data) {
    this.service.deletePostbyId(data._id).subscribe(res =>{
      console.log(res)
      this.isPostDeleted = true;
      this.getpost()
    })

  }

  updatepost(data) {
    window.scrollTo(0,500)
    this.isupdatePost = true;
    console.log("data", data)
    this.updatePostId = data._id;
    var form = this.updatePostForm.controls
    form.post.setValue(data.post);
    form.profession.setValue(data.profession)
    this.isupdatePost = true;

  }
  submitUpdatePost() {
    if(this.updatePostForm.valid) {
      this.service.updatePostbyId(this.updatePostForm.value,this.updatePostId).subscribe(res =>{
        console.log("upadtepost",res)
        this.isupdatePost = false;
        this.isPostUpdated = true;
        this.getpost()
      })

    }
  }

  onUpdateCancel() {
    this.isupdatePost = false;
  }

  closee() {
    this.isPostCreated  = false;
  }

  close() {
    this.isPostUpdated  = false;
  }

  viewPost() {
    window.scrollTo(0,500)
  }

  closeee() {
    this.isPostDeleted  = false;
  }
  

  onCancelPost() {
    window.scrollTo(0,500);
    this.iscreatePost = !this.iscreatePost;
  }

}
