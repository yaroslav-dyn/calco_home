declare namespace AppTypes {

  //Notes
  export interface NewNote {
    title: string;
    text: string,
    group: string,
    edit: boolean,
    timeID: number
  }
}
