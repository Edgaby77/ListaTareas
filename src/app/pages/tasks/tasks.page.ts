import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task.model';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
  standalone: true,
  imports: [
    IonicModule,  // Para los componentes de Ionic (ion-header, ion-button, etc.)
    CommonModule, // Para *ngFor y otras directivas comunes
    FormsModule   // Para ngModel
  ]
})

export class TasksPage implements OnInit {

  tasks: Task[] = [];
  newTaskTitle: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasks = this.taskService.getTasks();
  }

  async addTask(): Promise<void> {
    if (!this.newTaskTitle.trim()) return;
    await this.taskService.addTask(this.newTaskTitle);
    this.newTaskTitle = '';
    this.loadTasks();
  }

  async toggleTaskComplete(id: string): Promise<void> {
    await this.taskService.toggleTaskComplete(id);
    this.loadTasks();
  }
  
  async deleteTask(id: string): Promise<void> {
    await this.taskService.deleteTask(id);
    this.loadTasks();
  }
}
