import { Component } from '@angular/core';
import { task } from './model/task.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'to_do_app';
  tagsList=['hyhy','sdfdf']
  public task:task[]=[
    {
      itemId: 1,
      taskName: 'sryetydff',
      taskDescription: '',
      dueDate: new Date,
      isCompleted: false,
      tags: ['asdas']
    },
    {
      itemId: 2,
      taskName: 'cbdhdhb',
      taskDescription: '',
      dueDate: new Date,
      isCompleted: false,
      tags: ['asdas','sdfaf']
    },
    {
      itemId: 3,
      taskName: 'dhgjcxgnfhx',
      taskDescription: '',
      dueDate: new Date,
      isCompleted: true,
      tags: ['asdas']
    }
  ]
  
  }

