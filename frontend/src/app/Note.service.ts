import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NoteModel } from './Note.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpClient) { }

  baseurl: string = "http://localhost:8000";

  getNotes() {
    return this.http.get(`${this.baseurl}/notes`);
  }

  getNoteById(id) {
    return this.http.get(`${this.baseurl}/notes/${id}`);
  }

  addNote(title, body) {
    const note = {
      title: title,
      body: body
    };
    return this.http.post(`${this.baseurl}/notes/add`, note);
  }

  updateNote(id,title, body) {
    const note = {
      title: title,
      body: body
    };
    return this.http.put(`${this.baseurl}/notes/update/${id}`, note);
  }

  deleteNote(id){
    return this.http.delete(`${this.baseurl}/notes/delete/${id}`);
  }

}