import { Component, OnInit } from '@angular/core';
import { NoteService } from '../Note.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  id: String;
  note: any = {};
  updateForm: FormGroup;

  constructor(private noteService: NoteService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar, private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.updateForm = this.fb.group({
      title: ['', Validators.required],
      text: ''
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id
      this.noteService.getNoteById(this.id).subscribe(res => {
        this.note = res;
        this.updateForm.get('title').setValue(this.note.title);
        this.updateForm.get('text').setValue(this.note.text);
      })
    })
  }

  updateNote(title, text) {
    this.noteService.updateNote(this.id, title, text).subscribe(() => {
      this.snackBar.open('Note updated succesfully', 'OK', {
        duration: 3000
      });
    });
  }
}
