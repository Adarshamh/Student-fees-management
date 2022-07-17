import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { StudentDashModel } from '../studentdash/studentdash.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postStudent(data:any){
    return this.http.post<any>('http://localhost:3000/posts', data).pipe((res:any)=>{
      return res;
    })
  }

  getStudent(){
    return this.http.get<any>('http://localhost:3000/posts').pipe((res:any)=>{
      return res;
    })
  }

  updateStudent(data:any, id:number){
    return this.http.put<any>('http://localhost:3000/posts/'+id,data).pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteStudent(id:number){
    return this.http.delete<any>('http://localhost:3000/posts/'+id).pipe((res:any)=>{
      return res;
    })
  }
}
