import {Component, OnInit} from '@angular/core';
import {NotesService} from "../../services/notes.service";
import {MatDialog} from "@angular/material/dialog";
import {AcceptModalComponent} from "../content-components/modals/accept-modal/accept-modal.component";
import {NoteEditorComponent} from "../content-components/modals/note-editor/note-editor.component";
import NewNote = AppTypes.NewNote
import {MatchPipe} from "../../_helpers/pipes/match.pipe";

@Component({
  selector: 'app-notes',
  template: `
		<div fxLayout.gt-sm='row' fxLayout.xs="column" class="notes">
			<div fxFlex.gt-sm="20"  class="notes_group">
        <div class="notes_group__item notes_panel__bgap" fxLayout="row" fxLayoutGap="10px" [style.zIndex]="10000">
					<button mat-flat-button color="action-green" class="w100" (click)="addGroup('New Group')">
						<mat-icon aria-hidden="false" aria-label="add" text="text-inverted"> add </mat-icon>
					</button>
					<mat-slide-toggle matTooltip="Edit groups" [(ngModel)]="editGroupMarker"></mat-slide-toggle>
        </div>
				<button class="notes_group__item w100" mat-flat-button color="accent" (click)="editGroup('', {title: 'all'})">all notes</button>
        <div class="notes_group__item" fxLayout='row' *ngFor="let group of noteGroup; index as g">
						<button class="edit-group" *ngIf="editGroupMarker" mat-stroked-button (click)="editGroup(g, {title: group})">
							<mat-icon class="note_block__icon" aria-hidden="false" aria-label="edit">edit</mat-icon>
						</button>
					<button [ngClass]="{'w100 group-element': true, 'active' : group === groupFilter }" mat-stroked-button (click)="editGroup(g, {title: group})"> {{group}} </button>
					<button class="del-group" *ngIf="editGroupMarker" mat-stroked-button (click)="openDeleteDialog(g, {title: group}, 'group')">
						<mat-icon class="note_block__icon" aria-hidden="false" aria-label="delete" color="warn">delete</mat-icon>
					</button>
        </div>
			</div>
      <!-- ##  -->
			<div fxFlex.gt-sm="80"  class="notes_items">
        <div class="notes_panel__bgap" fxLayoutGap="10px" [style.zIndex]="1000">
          <button [ngClass]="{'active-type': noteLayout === 'column wrap' }" (click)="changeNoteLayout('column wrap')" mat-raised-button> 
            <mat-icon> view_list </mat-icon> 
          </button>
					<button [ngClass]="{'active-type': noteLayout === 'row wrap' }" (click)="changeNoteLayout('row wrap')" mat-raised-button>
            <mat-icon> view_module</mat-icon> 
          </button>
					<mat-slide-toggle matTooltip="Edit Notes" [(ngModel)]="editNotesMarker"></mat-slide-toggle>
				</div>
        <div [fxLayout]="noteLayout"  fxLayoutAlign="start stretch">
          <div *ngFor="let note of allNotes; index as i" class="note_card">
						<mat-card *ngIf="note.group === groupFilter || groupFilter === 'all'">
							<div class="note_block">
								<div class="note_block__edit">
									<mat-icon (click)="quickEditor(i)" class="note_block__icon" aria-hidden="false" aria-label="edit">
										edit
									</mat-icon>
								</div>
								<div class="note_content" (click)="editNote(i, note)">
									<form name="notes">
										<mat-form-field class="w100">
											<input matInput [disabled]="!note.edit" 
														 (change)="noteChange(i, $event, 'title')" [value]="note.title" [name]="'noteTitle' + i">
										</mat-form-field>
										<mat-form-field class="w100" *ngIf="note.edit">
									<textarea rows="3" matInput
														(change)="noteChange(i, $event, 'text')" [value]="note.text" [name]="'noteText' + i"></textarea>
										</mat-form-field>
									</form>
								</div>
								<div>
                  <div *ngIf="editNotesMarker">
										<mat-form-field>
                      <mat-label>{{note.group}}</mat-label>
											<mat-select  (valueChange)="groupWasChanged(i, $event)">
												<mat-option *ngFor="let group of noteGroup; index as j" [value]="group" > {{ group }} </mat-option>
											</mat-select>
										</mat-form-field>

										<mat-icon class="note_block__icon" (click)="openDeleteDialog(i, note, 'note')"
															aria-hidden="false"
															aria-label="delete" color="warn">
											delete
										</mat-icon>
                  </div>
                  
								</div>
							</div>
						</mat-card>
          </div>
        </div>

				<div class="notes_items__actions w100">
					<button mat-fab color="action-green" (click)="addNote()">
						<mat-icon aria-hidden="false" aria-label="add" text="text-inverted"> add </mat-icon>
					</button>
				</div>
			</div>
		</div>
  `,
  styleUrls: ['./notes.component.scss'],
  providers: [MatchPipe]
})
export class NotesComponent implements OnInit {

  public newNote: NewNote = {
    title: '',
    text: '',
    group: 'all',
    edit: false,
    timeID: 0
  }

  public noteGroup: string[] = ['all'];

  public allNotes: NewNote[] = [];

  public editGroupMarker: boolean = false;
  public editNotesMarker: boolean = false;

  public noteLayout: string = 'column wrap';
  public groupFilter: string = 'all';



  constructor(private notesService: NotesService,
              private matchPipe: MatchPipe,
              public dialog: MatDialog) {}

  /*
  * Groups notes methods
  */

    addGroup (group) {
      let groupTo = group;
      if( this.noteGroup.includes(group)) {
        groupTo = `${group}_${Date.now()}`
      }
        this.noteGroup.push(groupTo);
        this.updateGroups( this.noteGroup );
    }
    delGroup (index) {
      this.noteGroup =  this.noteGroup.filter( (j, i) => {
      return  i !== index;
      });
      this.updateGroups( this.noteGroup );
    }
    editGroup (index, title) {
      if(this.editGroupMarker) {
        const dialogRef =  this.dialog.open(NoteEditorComponent, {
          width: '50vw',
          height: '50vh',
          data: title
        });
        dialogRef.afterClosed().subscribe(result => {
          if( result ) this.noteGroup[index] = result.title;
          this.updateGroups( this.noteGroup );
        });
      } else {
        this.groupFilter = title.title;
      }

    }

    updateGroups( groups ) {
      this.notesService.updateGroups( groups );
    }

  /*
  * End Groups notes methods
  */


  /*
  * Notes methods
  */

  addNote(): void {
    this.newNote.group = this.groupFilter;
    this.newNote.timeID = Date.now();
    this.allNotes.push(this.newNote) ;
    this.notesService.updateNotes( this.allNotes );
    this.getAllNotes();
  }

  editNote(index, note): void {
    if(!note.edit) {
      const dialogRef = this.dialog.open(NoteEditorComponent, {
        width: '50vw',
        height: '50vh',
        data: note
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
    // this.allNotes.forEach( el => {
    //   if(el.timeID === index.timeID) {
    //     console.log(el);
    //    // type === 'text' ? el.text = text.target.value : el.title = text.target.value;
    //   }
    //
    // });
    this.notesService.updateNotes( this.allNotes );
  }

  delNote(i): void {
    this.allNotes =  this.allNotes.filter((e, j) => i !== j);
    this.notesService.updateNotes(  this.allNotes );
  }

  openDeleteDialog(i, inst, type): void {
      const dialogRef = this.dialog.open(AcceptModalComponent, {
        width: 'auto',
        data: {item: inst, type: type}
      });
      dialogRef.afterClosed().subscribe(result =>  {
        if(result && type ===  'note') this.delNote(i)
        else if (result && type ===  'group') this.delGroup(i)
      });
  }

  groupWasChanged(index, ev) {
   this.allNotes[index].group = ev
   this.notesService.updateNotes( this.allNotes );
  }

  changeNoteLayout(type) {
    this.noteLayout = type;
  }


  /*
  * End notes methods
  */

  getAllNotes() {
    this.notesService.getNotes().subscribe({
      next: (data) => data ? this.allNotes = JSON.parse(data) : [],
      error: (error) => console.log('error user', error)
    });
  }
  getAllGroups() {
    this.notesService.getGroups().subscribe( {
      next: (data) => data ? this.noteGroup = JSON.parse(data) : [],
      error: (error) => console.log('error user', error)
    });
  }

  ngOnInit() {
    this.getAllNotes();
    this.getAllGroups()
  }

}//
