import {Injectable} from "@angular/core";
import {StorageMap} from "@ngx-pwa/local-storage";

@Injectable({
  providedIn: "root"
})

export class ReminderService {

  constructor(private storage: StorageMap) {}

  getReminders() {
    return  this.storage.get('reminders', {type: "string"})
  }
  getRemindersGroup() {
    return  this.storage.get('remindersGroups', {type: "string"})
  }

  updateReminders( notes ) {
    this.storage.set( 'reminders', JSON.stringify(notes), {type: 'string'}).subscribe({
      next: () => {}, error: (error) => { console.log('error user', error)}
    });
  }

  updateGroupReminders( groups ) {
    this.storage.set( 'remindersGroups', JSON.stringify(groups), {type: 'string'}).subscribe({
      next: () => {}, error: (error) => { console.log('error user', error)}
    });
  }




}
