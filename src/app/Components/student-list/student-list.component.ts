import { Component, inject, OnInit } from '@angular/core';
import { StudentService } from '../../Services/student.service';
import Student from '../../Types/Student';
import { RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';
@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  filteredStudents: Student[] = [];
  student: Student | undefined;
  private modalService = inject(NgbModal);

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.getStudents();
  }

  private getStudents() {
    this.studentService.getStudents().subscribe({
      next: (eventResult) => {
        this.students = eventResult;
        this.filteredStudents = eventResult;
      },
      error: () => { },
    });
  }

  openDeleteModal(student: Student) {
    const modal = this.modalService.open(ModalDeleteComponent);
    modal.closed.subscribe((result) => {
      if (result === 'confirmed') {
        this.deleteStudent(student.studentID);
      }
    });
  }

  deleteStudent(id: number) {
    this.studentService.deleteStudent(id).subscribe({
      next: (eventResult) => {
        this.student = eventResult;
        this.getStudents();

      },
      error: () => { },
    });
  }

  handleSearchChange(event: any) {
    const value = event.target.value;
    if (value === '') {
      this.getStudents();
    } else {
      this.filteredStudents = this.students.filter((student) =>
        student.name.toLowerCase().includes(value.toLowerCase())
        || student.nationalID.toLowerCase().includes(value.toLowerCase())
        || student.grade.toLowerCase().includes(value.toLowerCase())
        || student.academicYear.toLowerCase().includes(value.toLowerCase()))
    }
  }
}
