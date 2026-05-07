import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CourseService } from '../../services/course.service';
import { Course } from '../../interfaces/courses';

import { AssignmentService } from '../../services/assignment.service';
import { Assignment } from '../../interfaces/assignment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  courses: Course[] = [];

  assignments: Assignment[] = [];

  availableColors: string[] = [
  '#2563eb', // blue
  '#dc2626', // red
  '#16a34a', // green
  '#9333ea', // purple
  '#ea580c', // orange
  '#0891b2', // cyan
  '#ca8a04', // yellow
  '#db2777', // pink
  '#4b5563', // gray
  '#000000'  // black
  ];

  showColors = false;

  newCourse: Course = {
    code: '',
    name: '',
    color: '#2563eb'
  };

  constructor(
    private courseService: CourseService,
    private assignmentService: AssignmentService
  ) {}

  ngOnInit(): void {
    this.loadCourses();
    this.loadAssignments();
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe({
      next: (data: Course[]) => {
        this.courses = data;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  loadAssignments(): void {
  this.assignmentService.getAssignments().subscribe({
    next: (data: Assignment[]) => {
      this.assignments = data;
    },
    error: (err: any) => {
      console.log(err);
    }
  });
}

getTotalAssignments(): number {
  return this.assignments.length;
}

getCompletedAssignments(): number {
  return this.assignments.filter(a => a.status === 'Complete').length;
}

getOverdueAssignments(): number {
  const now = new Date();

  return this.assignments.filter((assignment) => {
    if (assignment.status === 'Complete') {
      return false;
    }

    if (!assignment.dueDate || !assignment.dueTime) {
      return false;
    }

    const dateOnly = new Date(assignment.dueDate)
      .toISOString()
      .split('T')[0];

    const dueDateTime = new Date(`${dateOnly}T${assignment.dueTime}:00`);

    return dueDateTime < now;
  }).length;
}

getAssignmentsDueThisWeek(): number {
  const today = new Date();
  const dayOfWeek = today.getDay();

  const sunday = new Date(today);
  sunday.setHours(0, 0, 0, 0);
  sunday.setDate(today.getDate() - dayOfWeek);

  const saturday = new Date(sunday);
  saturday.setDate(sunday.getDate() + 6);
  saturday.setHours(23, 59, 59, 999);

  return this.assignments.filter((assignment) => {
    const dueDate = new Date(assignment.dueDate);
    return dueDate >= sunday && dueDate <= saturday;
  }).length;
}

  addCourse(): void {

    this.courseService.createCourse(this.newCourse)
      .subscribe({
        next: () => {

          this.loadCourses();

          this.newCourse = {
            code: '',
            name: '',
            color: '#2563eb'
          };

          this.showColors = false;
        },

        error: (err: any) => {
          console.log(err);
        }
      });
  }

  deleteCourse(id: string): void {

    this.courseService.deleteCourse(id)
      .subscribe({
        next: () => {
          this.loadCourses();
        },

        error: (err: any) => {
          console.log(err);
        }
      });
  }
}