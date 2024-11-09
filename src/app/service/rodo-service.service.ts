import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apiresponse, Task, task } from '../model/task.model';
import { env } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class RodoServiceService {

  constructor(private http:HttpClient) {  }
  getAllTaskList():Observable<Apiresponse>{
    return this.http.get<Apiresponse>(`${env.base_url}/GetAllTaskList`)
  }

  onSubmitNewTask(taskobj:Task):Observable<Apiresponse>{
    return this.http.post<Apiresponse>(`${env.base_url}/CreateNewTask`,taskobj)
  }

  updateTask(taskobj:Task):Observable<Apiresponse>{
    return this.http.put<Apiresponse>(`${env.base_url}/UpdateTask`,taskobj)
  }

  deleteTask(id:number):Observable<Apiresponse>{
    let params=new HttpParams().set('itemsId',id)
    return this.http.delete<Apiresponse>(`${env.base_url}/DeleteTask`,{params:params})
  }

  filterTask(id:number):Observable<Apiresponse>{
    let params=new HttpParams().set('itemsId',id)
    return this.http.delete<Apiresponse>(`${env.base_url}/DeleteTask`,{params:params})
  }
}
