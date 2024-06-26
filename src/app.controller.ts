import { Body, Controller, Get, Post, Res, Sse } from '@nestjs/common';
import { AppService } from './app.service';
import { BehaviorSubject, Observable, delay, from, fromEvent, interval, map, of, take, takeUntil, timer } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { WebSocket } from 'ws';

@Controller()
export class AppController {
  
  private dataSubject = new BehaviorSubject<any>([]);
  // private data$ = this.dataSubject.asObservable();

  constructor(private readonly appService: AppService,
    private eventEmitter: EventEmitter2,
    ) {}

    get data$() {
      return this.dataSubject.asObservable();
    }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get("data")
  getData(): string {
    return this.appService.getData();
  }

   list = [
    {
      "name": "Alice",
      "age": 25,
      "email": "alice@example.com"
    },
    {
      "name": "Bob",
      "age": 35,
      "email": "bob@example.com"
    },
    {
      "name": "Charlie",
      "age": 28,
      "email": "charlie@example.com"
    }
  ]
 
  @Sse('sse')
  sse(): Observable<any> {
    // return interval(1000).pipe(map((_) => ({ data: { hello: 'world' } })));
  
    // return from(this.list.map(i => ({data: i})));
      // return from(this.list).pipe(map(item => ({data: JSON.stringify(item)})));
   return from(this.data$).pipe(map(item =>  ({ data: JSON.stringify(item)})));
  
  }
  @Get('update')
  updateData() {
    this.list.map(data => {
      // console.log("data ",data)
      this.dataSubject.next(data);
    })
  }

  @Post('data')
  postData(@Body() body){
    console.log("body "+JSON.stringify(body),"time:",new Date());
  }

  @Get('start')
  start(){
    const wss = new WebSocket.Server({ port: 3001 });

    wss.on('connection', function connection(ws) {  
      console.log('Client connected');

      ws.on('message', function incoming(message) {
      console.log('Received message from client:', Buffer.from(message).toString("utf-8"));
    });
  });
  }

 


}
