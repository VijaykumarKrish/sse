import { Injectable } from '@nestjs/common';
import { Subject, first, take, takeUntil, tap } from 'rxjs';

@Injectable()
export class AppService {
  private chatSubject = new Subject();

  get chatData(){
    return this.chatSubject.asObservable();
  }

  getHello(): string {
  
    // this.chatSubject = new Subject();
  //   this.chatSubject.pipe(take(1)).subscribe(message => {
  //     console.log(message);
  // });
  // this.chatSubject.pipe(take(2),tap(message => {
  //       console.log(message)
  // })).subscribe();
  // let data = this.chatSubject.asObservable();
  this.chatData.forEach(data => console.log("data "+data));
  this.chatSubject.next('Hello from Component 1!');
  this.chatSubject.next('Hi from Component 3!');
 

    return 'Hello World!';
  }
  getData():string{
    // let mydata = this.chatSubject.asObservable();
    this.chatData.forEach(data => console.log("recieved... "+data));
    return 'Data';
  }
}
