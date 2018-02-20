import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';

import { AuthService } from '../auth.service';
import { UserService } from '../../shared/user.service';
import { User } from '../user.model';
import { NotesService } from '../../notes/notes.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user: User = {
    userId: '',
    name: '',
    email: '',
    password: '',
    profileUrl: '',
    status: true
  };

  constructor(private authService: AuthService,
              private userService: UserService,
              private notesService: NotesService) { }

  ngOnInit() {
  }

  onEmailSignup(form: NgForm) {
    this.user.name = form.value.name;
    this.user.email = form.value.email;
    this.user.password = form.value.password;
    this.authService.emailSignup(this.user)
      .then(() => {
        console.log(this.user);
        this.user.userId = firebase.auth().currentUser.uid;
        this.notesService.createNote(true);
        this.userService.createUser(this.user);
      });
  }

  // signInWithGoogle() {
  //   this.authService.signInWithGoogle();
  //   console.log('isLoggedIn', this.authService.isLoggedIn());
  //   console.log('user', this.authService.user);
  //   console.log('userDetails', this.authService.userDetails);
  //   console.log('currentuUser', firebase.auth().currentUser);
  // }

}
