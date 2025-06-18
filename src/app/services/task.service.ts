import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    this._storage = await this.storage.create();
    const storedTasks = await this._storage.get('tasks');
    this.tasks = storedTasks || [];
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  async addTask(title: string): Promise<void> {
    const newTask: Task = {
      id: new Date().toISOString(),
      title,
      completed: false
    };
    this.tasks.push(newTask);
    await this.save();
  }

  async toggleTaskComplete(id: string): Promise<void> {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      await this.save();
    }
  }
  async deleteTask(id: string): Promise<void> {
    this.tasks = this.tasks.filter(task => task.id !== id);
    await this.save();
  }

  private async save(): Promise<void> {
    await this._storage?.set('tasks', this.tasks);
  }
}
