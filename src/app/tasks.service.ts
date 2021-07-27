import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import * as moment from "moment";


export interface TaskModel {
  id?:any
  title:string
  date?:any
}

interface CreateResponse {
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class TasksService {
static url = 'https://angular-practice-calenda-62472-default-rtdb.firebaseio.com/';
  constructor(public http : HttpClient ) { }


load (date: moment.Moment): Observable<TaskModel[]> {
    return this.http
      .get<TaskModel[]>(`${TasksService.url}/${date.format('DD-MM-YYYY')}.json`)
      .pipe(map(tasks => {
        if (!tasks) {
          return []
        }

        return Object.keys(tasks).map( (key:any) => ({...tasks[key], id: key}))
      }))
  }


  create(task:TaskModel): Observable<TaskModel> {
  return  this.http
  .post<CreateResponse>(`${TasksService.url}/${task.date}.json`, task)
  .pipe(map(res => {
    return {...task, id:res.name}
  }))
  }

remove (task: TaskModel): Observable<void> {
return this.http
  .delete<void>(`${TasksService.url}/${task.date}/${task.id}.json`)
}
}
