import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../services/school.service';
import { Student } from '../models/student';

@Component({
  selector: 'student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
})
export class StudentFormComponent implements OnInit {
  studentForm: Student = {
    id: 0,
    name: '',
    grade: 0,
    age: 0,
    level: '',
  };

  errorMessage: string = '';

  constructor(private schoolService: SchoolService) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log('Form Values: ', this.studentForm);
    this.schoolService.postStudents(this.studentForm).subscribe(
      (response) => {
        console.log('Response: ', response);
      },
      (error) => {
        this.errorMessage =
          'Error adding student, please contact support at help@undegrads.ca';
        console.log('Error: ', error);
      }
    );
  }
}
