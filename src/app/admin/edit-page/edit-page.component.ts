import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PostsServices } from '../../shared/posts.services';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Post } from '../../shared/interfaces';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit, OnDestroy {

  form!: FormGroup
  post!: Post
  submiter = false

  uSub!: Subscription

  constructor(
      private route: ActivatedRoute,
      private postsServices: PostsServices,
      private alert: AlertService
  ) {}

  ngOnInit(): void {
      this.route.params.pipe(
          switchMap( (params: Params) => {
              return this.postsServices.getById(params['id'])
          })
      ).subscribe( (post: Post) => {
          this.post = post
          this.form = new FormGroup({
              title: new FormControl(post.title, Validators.required),
              text: new FormControl(post.text, Validators.required)
          })
      })
  }

  ngOnDestroy() {
      if(this.uSub) {
          this.uSub.unsubscribe()
      }
  }

  submit() {
      if(this.form.invalid) {
          return
      }

      this.submiter = true

      this.uSub = this.postsServices.update({
          ...this.post,
          text: this.form.value.text,
          title: this.form.value.title
      }).subscribe( () => {
          this.submiter = false
          this.alert.success('Пост был обновлен.')
      })
  }

}
