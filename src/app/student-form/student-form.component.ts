import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../services/school.service';
import { Student } from '../models/student';
import { NavController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
})
export class StudentFormComponent implements OnInit {
  // studentForm: Student = {
  //   id: 0,
  //   name: '',
  //   grade: 0,
  //   age: 0,
  //   level: '',
  // };
  studentForm: any;
  errorMessage: string = '';

  constructor(
    private schoolService: SchoolService,
    private navCtrl: NavController,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.studentForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      grade: ['', [Validators.required]],
      age: ['', [Validators.required]],
      level: ['', [Validators.required]],
    });
  }

  onSubmit() {
    console.log('Form Values: ', this.studentForm.value);
    this.schoolService.postStudents(this.studentForm.value).subscribe(
      (response) => {
        // reset the student form
        this.studentForm.reset();

        // navigate back to the student page (Tab1)
        this.navCtrl.navigateBack('/tabs/tab1');
      },
      (error) => {
        this.errorMessage =
          'Error adding student, please contact support at help@undegrads.ca';
        console.log('Error: ', error);
      }
    );
  }
}
