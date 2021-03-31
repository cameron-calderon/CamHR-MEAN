import { Post } from './posts.model';
import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http
      .get<{ message: string; posts: any }>('http://localhost:3000/api/posts')
      .pipe(
        map((postData) => {
          return postData.posts.map(
            (post: {
              name: any;
              grossPay: any;
              stateIncome: any;
              fedMarginalRate: any;
              deferallRate: any;
              _id: any;
            }) => {
              return {
                name: post.name,
                grossPay: post.grossPay,
                stateIncome: post.stateIncome,
                fedMarginalRate: post.fedMarginalRate,
                deferallRate: post.deferallRate,
                id: post._id,
              };
            }
          );
        })
      )
      .subscribe((transformedData) => {
        this.posts = transformedData;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(
    name: string,
    grossPay: Int16Array,
    stateIncome: Int16Array,
    fedMarginalRate: Int16Array,
    deferallRate: Int16Array
  ) {
    const post: Post = {
      id: null,
      name: name,
      grossPay: grossPay,
      stateIncome: stateIncome,
      fedMarginalRate: fedMarginalRate,
      deferallRate: deferallRate,
    };
    this.http
      .post<{ message: string; postId: string }>(
        'http://localhost:3000/api/posts',
        post
      )
      .subscribe((responseData) => {
        const id = responseData.postId;
        post.id = id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }

  deletePost(postId: string) {
    this.http
      .delete('http://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter((post) => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
}
