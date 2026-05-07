import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AssignmentService } from '../../services/assignment.service';
import { Assignment } from '../../interfaces/assignment';
import { CourseService } from '../../services/course.service';
import { Course } from '../../interfaces/courses';


@Component({
  selector: 'app-assignment-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assignment-list.component.html',
  styleUrl: './assignment-list.component.css'
})
export class AssignmentListComponent implements OnInit {

  assignments: Assignment[] = [];

  courses: Course[] = [];
  
  currentWeekOffset = 0;

  weekDays: any[] = [];

  activeMenuId: string | null = null;

  editingAssignmentId: string | null = null;
  editedDueDate = '';

  isToday(dayString: string): boolean {
  const today = new Date().toISOString().split('T')[0];

  return dayString === today;
}
  

  newAssignment: Assignment = {
    course: '',
    title: '',
    dueDate: '',
    dueTime: '',
    week: '',
    status: 'Incomplete',
  };

  constructor(
    private assignmentService: AssignmentService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.buildWeek();
    this.loadAssignments();
    this.loadCourses();
  }

  buildWeek(): void {

    const today = new Date();

    today.setDate(
      today.getDate() + (this.currentWeekOffset * 7)
    );

    const dayOfWeek = today.getDay();

    const sunday = new Date(today);

    sunday.setDate(today.getDate() - dayOfWeek);

    this.weekDays = [];

    for (let i = 0; i < 7; i++) {

      const date = new Date(sunday);

      date.setDate(sunday.getDate() + i);

      this.weekDays.push({
        name: date.toLocaleDateString('en-US', {
          weekday: 'long'
        }),

        date: date,

        dateString: date.toISOString().split('T')[0]
      });
    }
  }

  previousWeek(): void {
  this.currentWeekOffset--;
  this.buildWeek();
  }

  nextWeek(): void {
    this.currentWeekOffset++;
    this.buildWeek();
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

  getCourseColor(courseName: string): string {
  const course = this.courses.find(c => c.name === courseName);
  return course ? course.color : '#2563eb';
  }

  formatTime(time: string): string {

  const [hours, minutes] = time.split(':');

  let hour = parseInt(hours);

  const ampm = hour >= 12 ? 'PM' : 'AM';

  hour = hour % 12;

  if (hour === 0) {
    hour = 12;
  }

  return `${hour}:${minutes} ${ampm}`;
}

getAssignmentsForDay(dayString: string): Assignment[] {
  return this.assignments
    .filter((assignment) => {
      const assignmentDate = new Date(assignment.dueDate)
        .toISOString()
        .split('T')[0];

      return assignmentDate === dayString;
    })
    .sort((a, b) => {
      return a.dueTime.localeCompare(b.dueTime);
    });
}

  addAssignment(): void {
    const selectedDate = new Date(this.newAssignment.dueDate);

    this.newAssignment.week = selectedDate.toLocaleDateString('en-US', {
      weekday: 'long'
    });

    this.assignmentService.createAssignment(this.newAssignment).subscribe({
      next: () => {
        this.loadAssignments();

        this.newAssignment = {
          course: '',
          title: '',
          dueDate: '',
          dueTime: '',
          week: '',
          status: 'Incomplete',
        };
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  toggleMenu(id: string): void {

  if (this.activeMenuId === id) {
    this.activeMenuId = null;
  } else {
    this.activeMenuId = id;
  }
}

  toggleComplete(assignment: Assignment): void {
  const updatedStatus =
    assignment.status === 'Complete' ? 'Incomplete' : 'Complete';

  this.assignmentService.updateAssignment(assignment._id!, {
    status: updatedStatus
  }).subscribe({
    next: () => {
      this.loadAssignments();
      this.activeMenuId = null;
    },
    error: (err: any) => {
      console.log(err);
    }
  });
}

isOverdue(assignment: Assignment): boolean {
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

  const now = new Date();

  return dueDateTime < now;
}

  deleteAssignment(id: string): void {
    this.assignmentService.deleteAssignment(id).subscribe({
      next: () => {
        this.loadAssignments();
        this.activeMenuId = null;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  startEditingDate(assignment: Assignment): void {
  this.editingAssignmentId = assignment._id!;

  this.editedDueDate = new Date(assignment.dueDate)
    .toISOString()
    .split('T')[0];
}

cancelEditingDate(): void {
  this.editingAssignmentId = null;
  this.editedDueDate = '';
}

saveEditedDate(assignment: Assignment): void {
  this.assignmentService.updateAssignment(assignment._id!, {
    dueDate: this.editedDueDate
  }).subscribe({
    next: () => {
      this.loadAssignments();
      this.cancelEditingDate();
    },
    error: (err: any) => {
      console.log(err);
    }
  });
}
}