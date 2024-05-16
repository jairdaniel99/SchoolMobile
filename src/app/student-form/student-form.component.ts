import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../services/school.service';
import { Student } from '../models/student';
import { NavController, ToastController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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
  id: any;
  studentForm: any;
  errorMessage: string = '';

  constructor(
    private schoolService: SchoolService,
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private toastCtrl: ToastController
  ) {}

  ngOnInit(): void {
    this.studentForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      grade: ['', [Validators.required]],
      age: ['', [Validators.required]],
      level: ['', [Validators.required]],
    });

    this.route.paramMap.subscribe((params) => {
      const idString = params.get('id'); // '4' or null
      // +id is a shorthand for converting string to number in JavaScript, long form is Number(id)
      this.id = idString ? +idString : null; // truthy or falsy ? 4 : null
    });

    if (this.id) {
      this.schoolService.getStudent(this.id).subscribe(
        (student) => {
          // update the student form with the student data
          this.studentForm.patchValue(student);
        },
        (error) => {
          // throw error
          throw new Error('Error: ' + error);
        }
      );
    }
  }

  async successToast() {
    const toast = await this.toastCtrl.create({
      message: 'Student added successfully',
      duration: 2000,
      color: 'success',
    });

    toast.present();
  }

  async failureToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      color: 'danger',
    });

    toast.present();
  }

  onSubmit() {
    if (!this.studentForm.valid) {
      // throw is a keyword that throws an error for a user defined error
      this.errorMessage = 'Please fill up the form.';
    } else {
      // if we have a studentForm, we are updating an existing student
      if (this.id) {
        console.log('Form updated!');
        // update student data using API
        this.schoolService
          .putStudents(this.id, this.studentForm.value)
          .subscribe(
            (response) => {
              console.log('successfully updated student.');

              this.navCtrl.navigateBack('/tabs/tab1');
            },
            (error) => {
              this.errorMessage =
                'Error udating student. Please contact support.';
            }
          );
      } else {
        // submit form data using API
        console.log('Form submitted!');

        this.schoolService.postStudents(this.studentForm.value).subscribe(
          (response) => {
            this.studentForm.reset();

            // display success toast
            this.successToast();

            this.navCtrl.navigateBack('/tabs/tab1');
          },
          (error) =>
            this.failureToast(
              'Error adding students. Please contact the administrator.'
            )
        );
      }
    }
  }
}
