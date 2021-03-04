declare namespace AppTypes {

  // Notes
  export interface NewNote {
    title: string;
    text: string;
    group: string;
    edit: boolean;
    timeID: number;
  }

  // Events
  export interface NewEvent {
    title: string;
    description: string;
    group: string;
  }

  // Profile: Current user
  export interface CurrentUser {
    avatar?: string;
    userName: string;
    fullName?: string;
    age?: string;
  }
// files uploader
  export interface FileObject {
    imageBlob: string;
    imageData: Blob;
    name: string;
    converted?: string;
  }

}//
