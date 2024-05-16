import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SchoolService } from '../services/school.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  students: any[] = [];
  constructor(
    private navCtrl: NavController,
    private schoolService: SchoolService
  ) {}

  ngOnInit() {
    this.getStudentsData();
  }

  //this method below is called everytime the tab 1 page is entered
  ionViewWillEnter() {
    this.getStudentsData();
  }

  getStudentsData() {
    this.schoolService.getStudents().subscribe((response) => {
      this.students = response;
    });
  }
  openForm() {
    this.navCtrl.navigateForward('/tabs/form');
  }

  // navigate to student form
  editStudent(id: number) {
    this.navCtrl.navigateForward(`/tabs/form/${id}`);
  }

  // delete student
  deleteStudent(studentID: number) {
    // Remove student from students array
    // findIndex will return the index of the student matching the studentName OR -1 if not found
    let index = this.students.findIndex((student) => student.id === studentID);

    // if student with studentName is not found, return/exit the function here
    if (index === -1) {
      return;
    }

    // delete student from the API
    this.schoolService.deleteStudent(studentID).subscribe(
      (student) => {
        // remove student from students array
        this.students.splice(index, 1);
      },
      (error) => console.log('Error: ', error)
    );
  }
}
