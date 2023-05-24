import { Injectable } from '@angular/core';
import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class TwilioService {
  private apiUrl = 'https://api.twilio.com/2010-04-01/Accounts/ACc3c8933cf8b6b1d173d66fc667876d67/Messages.json';
  private accountSid = 'ACc3c8933cf8b6b1d173d66fc667876d67';
  private authToken = '496d5a7a8c94ce7d911700869b5d6d0f';
  private fromPhoneNumber = '+12545405639';
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
