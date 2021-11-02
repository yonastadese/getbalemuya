import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  msg: string;

  constructor() { }

  setMesg(msg: string){
    this.msg = msg;
  }

  getMsg():string {
    return this.msg;
  }
}
