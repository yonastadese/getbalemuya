import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }


  send(data: any, telegram: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const message = data.messages.replace(/<b>/g, '').replace(new RegExp("</b>", "gm"), '').replace(/<u>/g, '').replace(new RegExp("</u>", "gm"), '').split('#')[0];
    // console.log(message);
    if(data.photos) {
      for (let index = 0; index < data.photos.length; index++) {
        const photo = data.photos[index];
        data.photos[index] = {
          type: 'photo',
          media: photo
        }
      }
    }
    this.telegramIt(telegram, data)
    this.http.post('https://formspree.io/mzbjagzk',
      {
        name: "ordrgin...",
        replyto: data.email,
        message: data.messages
      },
      { 'headers': headers }).subscribe(
        response => {
          console.log(response);
        }
      );
  }

  telegramIt(to: string, data: any) {
    if (data.photos && data.photos.length > 0) {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post('https://api.telegram.org/bot' + to + '/sendMediaGroup',
        { chat_id: '-1001321888930', media: data.photos },
        { 'headers': headers }).subscribe(
          response => {
            // console.log(response);
            if (response["ok"] == true) this.telegramItMsg(to, data)
          }
        );
    }else {
      this.telegramItMsg(to, data)
    }
  }

  telegramItMsg(to: string, data: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post('https://api.telegram.org/bot' + to + '/sendMessage',
      { chat_id: '-1001321888930', text: data.messages, parse_mode: 'html' },
      { 'headers': headers }).subscribe(
        response => {
          // console.log(response);
          if (response["ok"] == true && data.location) this.telegramItLoc(to, data.location)
        }
      );
  }

  telegramItLoc(to: string, location: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post('https://api.telegram.org/bot' + to + '/sendlocation',
      { chat_id: '-1001321888930', latitude: location.latitude, longitude: location.longitude },
      { 'headers': headers }).subscribe(
        response => {
          console.log(response);
        }
      );
  }
}
