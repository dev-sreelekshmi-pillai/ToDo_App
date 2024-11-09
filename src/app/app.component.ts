import { Component, inject, OnInit } from '@angular/core';
import { Apiresponse, Task, task } from './model/task.model';
import { RodoServiceService } from './service/rodo-service.service';
import { error } from 'console';
import { Form, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private taskService = inject(RodoServiceService);
  newTask = new Task();
  taskList: task[] = [];
  tagsList: string[] = [];
  tagsShow = '';
  taskListDupe: task[] = [];
  tagsSelected = ''
  ngOnInit() {
    this.getAllTaskList();
  }

  getAllTaskList() {
    this.taskService.getAllTaskList().subscribe((res: Apiresponse) => {
      this.taskList = res.data;
      this.getTags();
      this.taskListDupe = this.taskList;
    });

  }

  onSubmitNewTask(form?: any) {
    if (form?.valid) {
      this.taskService.onSubmitNewTask(form.value).subscribe(
        (res) => {
          if (res.result) {
            alert('Task Created successfully');
            this.getAllTaskList();
            this.newTask = new Task();
          }
        },
        (error) => {
          alert('Api error');
        }
      );
    }
    else {
      alert('Please ensure Task name, Due date and atmost one tag is added')
    }
  }

  onEdit(task: Task, form: any) {
    this.newTask = task
    form.setValue({
      'tags': task.tags,
      'task-date': task.dueDate,
      'taskdesc': task.taskDescription,
      'taskname': task.taskName
    });
    setTimeout(() => {
      const modDate = new Date(task.dueDate);
      const day = modDate.getDate();
      const months = modDate.getMonth() + 1;
      const year = modDate.getFullYear();
      const date = `${year}-${months < 10 ? '0' + months : months}-${day < 10 ? '0' + day : day
        }`;
      (<HTMLInputElement>document.getElementById('task-date')).value = date;
    }, 5);
  }

  updateTask(form: any) {
    this.newTask.taskName = form?.value.taskname;
    this.newTask.taskDescription = form?.value.taskdesc;
    this.newTask.tags = form?.value.tags;
    this.newTask.dueDate = new Date(form?.value['task-date']);
    console.log("update", this.newTask)
    this.taskService.updateTask(this.newTask).subscribe(
      (res) => {
        if (res.result) {
          alert('Task Updated successfully');

          this.getAllTaskList();
          this.newTask = new Task();
          form.reset()


        }
      },
      (error) => {
        alert('Api error');
      }
    );
  }

  deleteTask(id: number) {
    const isConfirm = confirm('Are you sure you want to delete the task');
    if (isConfirm) {
      this.taskService.deleteTask(id).subscribe(
        (res) => {
          if (res.result) {
            alert('Task Deleted successfully');
            this.getAllTaskList();
            this.newTask = new Task();
          }
        },
        (error) => {
          alert('Api error');
        }
      );
    }
  }

  toggleCollapse(show: string) {
    this.tagsShow = show;
    switch (this.tagsShow) {
      case 'tags':
        this.tagsSelected = ''
        this.taskList = this.taskListDupe
        break;
      case 'completed':
        this.taskList = this.taskListDupe.filter((task) => task.isCompleted === true);
        break;
      default: this.taskList = this.taskListDupe
        break;
    }
  }

  getTags() {
    let tags = '';
    this.taskList.forEach(task => tags += !tags ? `${task.tags}` : `,${task.tags}`);
    tags.split(',').forEach(t => {
      if (!this.tagsList.includes(t) && t)
        this.tagsList.push(t)
    })


  }

  tagSelected(tag: string) {
    console.log(this.taskListDupe);
    this.tagsSelected = tag
    this.taskList = this.taskListDupe.filter((task) =>
      task.tags.includes(tag)
    );
  }


  clear(form?: any) {
    if (form?.value) {
      form.reset()
      this.newTask = new Task()
    }
  }
}
