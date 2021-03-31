import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent {
  enteredContent = ' ';
  EnteredTitle = ' ';

  constructor(public postsService: PostsService) {}

  netPay = 0;

  calculatePost(form: NgForm) {
    this.netPay =
      form.value.grossPay -
      form.value.grossPay * (form.value.stateIncome * 0.01) -
      form.value.grossPay * (form.value.fedMarginalRate * 0.01) -
      form.value.grossPay * (form.value.deferallRate * 0.01);

    return this.netPay;
  }

  resetNetPay(form: NgForm) {
    this.netPay = 0;
  }

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.postsService.addPost(
      form.value.name,
      form.value.grossPay,
      form.value.stateIncome,
      form.value.fedMarginalRate,
      form.value.deferallRate
    );
    form.resetForm();
  }
}
