import { Component, Input } from '@angular/core';
import { Course } from '@software-company-npm-based/utils-common';

@Component({
  selector: 'shared-course-card',
  imports: [],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent {
  @Input({ required: true }) course!: Course;
  @Input() showActions = true;
}
