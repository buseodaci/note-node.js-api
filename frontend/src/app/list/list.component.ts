import { Component, OnInit } from '@angular/core';
import { NoteService } from '../Note.service';
import { MatTableDataSource } from '@angular/material';
import { NoteModel } from '../Note.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  notes: NoteModel[];
  displayedColumns: string[] = ['title', 'text', 'actions'];
  constructor(private noteService: NoteService, private router: Router) { }

  ngOnInit() {
    this.fetchNotes();
  }

  fetchNotes() {
    this.noteService.getNotes().subscribe((data: NoteModel[]) => {
      this.notes = data;
      console.log('Data requested..');
      console.log(this.notes);
    })
  }

  editNote(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  deleteNote(id) {
    this.noteService.deleteNote(id).subscribe(() => {
      this.fetchNotes();
    })
  }
}
