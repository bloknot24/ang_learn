import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostsServices } from '../../shared/posts.services';
import { Post } from '../../shared/interfaces';
import { Subscription } from 'rxjs';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = []
  pSub!: Subscription
  dSub!: Subscription
  searchStr = ''

  constructor(
      private postsServices: PostsServices,
      private alert: AlertService
  ) { }

  ngOnInit(): void {
      this.pSub = this.postsServices.getAll().subscribe(posts => {
          this.posts = posts
      })
  }

  remove(id: any) {
      this.dSub = this.postsServices.remove(id).subscribe( () => {
          this.posts = this.posts.filter(post => post.id !== id)
          this.alert.warning('Пост был удален.')
      })
  }

  ngOnDestroy(): void {
      if(this.pSub) {
          this.pSub.unsubscribe()
      }

      if(this.dSub) {
          this.dSub.unsubscribe()
      }
  }

}
