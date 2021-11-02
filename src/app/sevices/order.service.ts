import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreDocument } from '@angular/fire/firestore/public_api';
import * as firebase from 'firebase';
import { BehaviorSubject, Observable } from 'rxjs';
import { EmailService } from './email.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public msg = new BehaviorSubject<string>(null);

  _startMsgWith(msg: any) {
    this.msg.next(msg);
  }
  setMsgStatus(msg: any) {
    this.msg.next(msg);
  }
  clearMsgStatus() {
    this.msg.next(null);
  }
  getMsgStatus(): Observable<any> {
    return this.msg.asObservable();
  }


  constructor(public afs: AngularFirestore, private emailService: EmailService) { }


  SendOrder(order: any) {
    const orderRef: AngularFirestoreDocument<any> = this.afs.doc(`orders/${order.id}`);
    const orderData = {
      viewed: false,
      processed: false,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
    }
    orderRef.set(Object.assign(order, orderData), {
      merge: true
    }).then(data => {
      // console.log(order)
      this.setMsgStatus('a okay');
      const email = {
        name: 'Order',
        email: 'getbalemuya@gmail.com',
        photos: order.images,
        location: { latitude: order.location.lat, longitude: order.location.lng },
        messages: '<b>Order</b>\n\n'
          + 'Order ID <u>' + order.id + '</u>\n\n'
          + 'Order <b>' + order.order.join(', ') + '</b>\n\n'
          + 'Name: <b>' + order.contact.fullName + '</b>\n'
          + 'Email: <b>' + order.contact.email + '</b>\n'
          + 'Phone Number: <b>' + order.contact.phone + '</b>\n\n'
          + '#order'
      };
      const telegram = '1286244993:AAFRuzJQ1QjyH94JMjrcBBOhry93sHRBnXw';
      this.emailService.send(email, telegram)
    }).catch((error) => {
      this.setMsgStatus(error.message);
    })
  }

  getOrder(orderId) {
    
  }

  removeImage(id: string) {

    const storageRef = firebase.storage().ref()
    storageRef.child(id).delete()


    // var desertRef = storageRef.child('orders/' + this.id + '.dagi');

    // // Delete the file
    // desertRef.delete().then(function () {
    //   // File deleted successfully
    // }).catch(function (error) {
    //   // Uh-oh, an error occurred!
    // });
  }
}
