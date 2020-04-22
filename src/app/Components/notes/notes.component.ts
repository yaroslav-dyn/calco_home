import {Component, OnInit} from '@angular/core';
import {NotesService} from "../../services/notes.service";
import {MatDialog} from "@angular/material/dialog";
import {AcceptModalComponent} from "../content-components/modals/accept-modal/accept-modal.component";
import {NoteEditorComponent} from "../content-components/modals/note-editor/note-editor.component";
import NewNote = AppTypes.NewNote

@Component({
  selector: 'app-notes',
  template: `
		<div fxLayout.gt-sm='row' fxLayout.xs="column" class="notes">
			<div fxFlex.gt-sm="20"  class="notes_group">
				<button mat-flat-button color="action-green" class="w100" (click)="addGroup('New Group')">
					<mat-icon aria-hidden="false" aria-label="add" text="text-inverted"> add </mat-icon>
				</button>
				<button mat-flat-button color="accent" class="w100">all notes</button>
        <div fxLayout='row' *ngFor="let group of noteGroup; index as g">
					<button class="w100" mat-stroked-button > {{group}} </button>
          <button *ngIf="editGroupMarker" mat-stroked-button (click)="editGroup(g, {title: group})">
             <mat-icon class="note_block__icon" aria-hidden="false" aria-label="delete">edit</mat-icon>
          </button>
					<button *ngIf="editGroupMarker" mat-stroked-button (click)="delGroup(g)">
						<mat-icon class="note_block__icon" aria-hidden="false" aria-label="delete" color="warn">delete</mat-icon>
					</button>
        </div>
				<mat-slide-toggle [(ngModel)]="editGroupMarker">Edit</mat-slide-toggle>
			</div>
			<div fxFlex.gt-sm="80"  class="notes_items" >
				<mat-card *ngFor="let note of allNotes; index as i" class="note_card">
					<div class="note_block">
						<div class="note_block__edit">
							<mat-icon (click)="quickEditor(i)" class="note_block__icon" aria-hidden="false" aria-label="edit">
								edit
							</mat-icon>
						</div>
						<div class="note_content" (click)="editNote(i, note)">
              <form name="notes">
								<mat-form-field class="w100">
									<mat-label ></mat-label>
									<input matInput [disabled]="!note.edit" name="noteTitle" 
                         (change)="noteChange(i, $event, 'title')" [(ngModel)]="note.title">
								</mat-form-field>
                
								<mat-form-field class="w100" *ngIf="note.edit">
									<textarea rows="3" matInput
                            name="noteText"
														(change)="noteChange(i, $event, 'text')" [(ngModel)]="note.text"></textarea>
								</mat-form-field>
							</form>
						</div>
						<div>
							<mat-icon class="note_block__icon" (click)="openDeleteDialog(i, note)"
                  aria-hidden="false" 
                  aria-label="delete" color="warn">
                delete
							</mat-icon>
						</div>
					</div>
				</mat-card>
				<div class="notes_items__actions">
					<button mat-fab color="action-green" (click)="addNote()">
						<mat-icon aria-hidden="false" aria-label="add" text="text-inverted"> add </mat-icon>
					</button>
				</div>
			</div>
		</div>
  `,
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  public newNote: NewNote = {
    title: 'New note',
    text: ' ',
    group: 'all',
    edit: false
  }

  public noteGroup: string[] = ['work', 'self', 'todo'];

  public allNotes: NewNote[] = [];

  public editGroupMarker: boolean = false;

  constructor(private notesService: NotesService,
              public dialog: MatDialog) {}

  /*
  * Groups notes methods
  */

    addGroup (group) {
      this.noteGroup.push(group);
      this.notesService.updateGroups( this.noteGroup );
    }
    delGroup (index) {
      this.noteGroup =  this.noteGroup.filter( (j, i) => {
      console.log(j, i, index);
      return  i !== index;
      });
    }
    editGroup (index, title) {
      const dialogRef =   this.dialog.open(NoteEditorComponent, {
        width: '50vw',
        height: '50vh',
        data: title
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result) this.noteGroup[index] = result.title;
        this.notesService.updateGroups( this.noteGroup );
      });
    }

  /*
  * End Groups notes methods
  */


  /*
  * Notes methods
  */

  addNote(): void {
    this.allNotes.push(this.newNote);
    this.notesService.updateNotes( this.allNotes );
  }

  editNote(index, note): void {
    if(!note.edit) {
      const dialogRef = this.dialog.open(NoteEditorComponent, {
        width: 'auto', data: note
      });
      dialogRef.afterClosed().subscribe(result => {
         this.noteUpgrade(index, result);
      });
    }
  }
  quickEditor(index): void {
    this.allNotes[index].edit = !this.allNotes[index].edit;
  };

  noteUpgrade(index, data) {
     this.notesService.updateNotes( this.allNotes );
  }

  noteChange(index, text, type): void {
    type === 'text' ? this.allNotes[index].text = text.target.value : this.allNotes[index].title = text.target.value;
    this.notesService.updateNotes( this.allNotes );
  }

  delNote(i): void {
    this.allNotes =  this.allNotes.filter((e, j) => i !== j);
    this.notesService.updateNotes(  this.allNotes );
  }

  openDeleteDialog(i, note): void {
      const dialogRef = this.dialog.open(AcceptModalComponent, {
        width: 'auto', data: note
      });
      dialogRef.afterClosed().subscribe(result => result && this.delNote(i) );
  }
  /*
  * End notes methods
  */

  ngOnInit() {
    this.notesService.getNotes().subscribe({
      next: (data) => data ? this.allNotes = JSON.parse(data) : [],
      error: (error) => console.log('error user', error)
    });

    this.notesService.getGroups().subscribe( {
      next: (data) => data ? this.noteGroup = JSON.parse(data) : [],
      error: (error) => console.log('error user', error)
    });


  }


}//
