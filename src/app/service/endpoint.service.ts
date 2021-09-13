import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, catchError, filter } from 'rxjs/operators';
import { BehaviorSubject, of, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class EndpointService {

  private baseUrl = "https://nodejs-fb-app.herokuapp.com/"
  private httpOptions;
  isregistersuccess$ = new BehaviorSubject(false)
  
  userid: String;
  isAdmin$ = new BehaviorSubject(false);
  username: String;
  age: Number;
  fisrtName: any;
  lastName: any;
  gender: any;
  city: any;
  country: any;
  state: any;
  pincode: any;
  pone: any;
  photoId: any;
  friend_d = [];
  constructor(private http: HttpClient,
    private router: Router) { }

  invalidToken(e) {
    if(e.error.message == 'Invalid Token') {
      alert("Session expire")
      this.router.navigateByUrl('/login')
    }
  }

  // Register  
  registerUser(payLoad: any) {
    this.http.post(this.baseUrl + 'users/register', payLoad)
    .pipe(
      map((res) => {
        return res;
      })).subscribe( res => {
        if(res) {
          this.isregistersuccess$.next(true);
          this.router.navigateByUrl("/login")
        }
      })
   }

   // log in
   getlogin(payLoad: any) : Observable<any> {
     return this.http.post(this.baseUrl + 'users/authenticate', payLoad)
    .pipe(
      map((res) => {
        return res;
      }),
      catchError((e: any) => {
        this.invalidToken(e)
        return of(e)
      }));
      
   }

   // Get User by Id
   getUserId(): Observable<any> {
     let param = this.userid
    return this.http.get(this.baseUrl +  `users/${param}`)
    .pipe(
      map((res) => {
        return res;
      }),
      catchError((e: any) => {
        this.invalidToken(e)
        return of(e)
      }));
  }

   // Get User by Id
   getUserbyId(param): Observable<any> {
   return this.http.get(this.baseUrl +  `users/${param}`)
   .pipe(
     map((res) => {
       return res;
     }),
     catchError((e: any) => {
       this.invalidToken(e)
       return of(e)
     }));
 }

  // Get all Users (Admin)
  getAllUsers(): Observable<any> {
    return this.http.get(this.baseUrl + 'users/')
    .pipe(
      map((res) => {
        return res;
      }),
      catchError((e: any) => {
        this.invalidToken(e)
        return of(e)
      }));
    }

  // Get all Users (Admin)
  deleteUserbyId(param): Observable<any> {
    return this.http.delete(this.baseUrl + `users/${param}`)
    .pipe(
      map((res) => {
        return res;
      }),
      catchError((e: any) => {
        this.invalidToken(e)
        return of(e)
      }));
    }



   // Update Profiles

   updateProfile(payload,param): Observable<any> {
    return this.http.put(this.baseUrl + `users/${param}`,payload)
    .pipe(
      map((res) => {
        return res;
      }),
      catchError((e: any) => {
        this.invalidToken(e)
        return of(e)
      }));
    }

    // Update Password

    updatePassword(payload,param): Observable<any> {
      return this.http.put(this.baseUrl + `users/${param}`,payload)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((e: any) => {
          this.invalidToken(e)
          return of(e)
        }));
      } 

   // Get Post by Id
   getPostbyId(): Observable<any> {
     console.log("id",this.userid)
    return this.http.post(this.baseUrl + 'posts/findpostbyuserid',{id:this.userid})
    .pipe(
      map((res) => {
        return res;
      }),
      catchError((e: any) => {
        this.invalidToken(e)
        return of(e)
      }));
   }

    // Get all Post
    getAllPost(): Observable<any> {
     return this.http.get(this.baseUrl + 'posts/')
     .pipe(
       map((res) => {
         return res;
       }),
       catchError((e: any) => {
         this.invalidToken(e)
         return of(e)
       }));
    }

   

   // Create post

   createPost(payload): Observable<any> {
   return this.http.post(this.baseUrl + 'posts/createpost',payload)
   .pipe(
     map((res) => {
       return res;
     }),
     catchError((e: any) => {
       this.invalidToken(e)
       return of(e)
     }));
  }

  // Update post by post ID

  updatePostbyId(payload,param): Observable<any> {
  return this.http.put(this.baseUrl + `posts/${param}`,payload)
  .pipe(
    map((res) => {
      return res;
    }),
    catchError((e: any) => {
      this.invalidToken(e)
      return of(e)
    }));
  }

  // Delete post by post ID

  deletePostbyId(id): Observable<any> {
    return this.http.delete(this.baseUrl + `posts/${id}`)
    .pipe(
      map((res) => {
        return res;
      }),
      catchError((e: any) => {
        this.invalidToken(e)
        return of(e)
      }));
  }

  // create Friend request

   createFriendRequest(payload): Observable<any> {
   return this.http.post(this.baseUrl + 'friends/createrequest',payload)
   .pipe(
     map((res) => {
       return res;
     }),
     catchError((e: any) => {
       this.invalidToken(e)
       return of(e)
     }));
  }

    // Get all Friends
    getAllFriends(): Observable<any> {
      return this.http.get(this.baseUrl + 'friends/')
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((e: any) => {
          this.invalidToken(e)
          return of(e)
        }));
    }    
    
    // Get all Friends
    getFile(): Observable<any> {
      let id = this.photoId
      return this.http.get(this.baseUrl + `files/${id}`, {responseType: "blob"})
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((e: any) => {
          this.invalidToken(e)
          return of(e)
        }));
    }

    // Update friend request status
    updateFriendstatus(payload,param): Observable<any> {
      return this.http.put(this.baseUrl + `friends/${param}`,payload)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((e: any) => {
          this.invalidToken(e)
          return of(e)
        }));
      }

  // Upload File
  fileUpload(payload): Observable<any> {
    return this.http.post(this.baseUrl + 'files/uploadfile',payload)
    .pipe(
      map((res) => {
        return res;
      }),
      catchError((e: any) => {
        this.invalidToken(e)
        return of(e)
      }));
   }




  
   
  
  






}
