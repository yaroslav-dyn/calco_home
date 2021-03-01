import {Injectable} from '@angular/core';
import {StorageMap} from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root'
})


export class NotesService {

  notes =  [];

  constructor(private storage: StorageMap) {}


  /*
 * Groups notes methods
 */
  getGroups() {
    return  this.storage.get('groups', {type: 'string'});
  }

  updateGroups(groups) {
    this.storage.set( 'groups', JSON.stringify(groups), {type: 'string'}).subscribe({
      next: () => {}, error: (error) => { console.log('error user', error); }
    });
  }
  /*
 * End Groups notes methods
 */


  /*
 * Notes methods
 */
  getNotes() {
     return  this.storage.get('notes', {type: 'string'});
  }

   updateNotes(notes) {
    this.storage.set( 'notes', JSON.stringify(notes), {type: 'string'}).subscribe({
      next: () => {}, error: (error) => { console.log('error user', error); }
    });
  }

  /*
  * End notes methods
  */

}
