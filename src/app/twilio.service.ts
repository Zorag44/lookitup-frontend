import { Injectable } from '@angular/core';
import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class TwilioService {
  private apiUrl = 'https://api.twilio.com/2010-04-01/Accounts//Messages.json';
  private accountSid = '';
  private authToken = '';
  private fromPhoneNumber = '';
  constructor() { }
  sendSMS(toPhoneNumber:String, message:String):Promise<any>{
    const payload={
      Body: message,
      From: this.fromPhoneNumber,
      To: toPhoneNumber
    };
    const authHeader = {
      username: this.accountSid,
      password: this.authToken
    };
    return axios.post(this.apiUrl,payload,{
      headers:{'Content-Type':'application/x-www-form-urlencoded'},
      auth:authHeader
    });
  }
}
