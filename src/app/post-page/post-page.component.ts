import { Component, OnInit } from '@angular/core';
import { PostsServices } from '../shared/posts.services';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from '../shared/interfaces';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit {

  post$!: Observable<Post>

  constructor(
      private route: ActivatedRoute,
      private postsServices: PostsServices
  ) {}

  ngOnInit(): void {
      this.post$ = this.route.params
        .pipe(switchMap( (params: Params) => {
            return this.postsServices.getById(params['id'])
        }))
  }

}
