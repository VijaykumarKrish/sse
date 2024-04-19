import { Logger } from "@nestjs/common";
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket,Server } from 'socket.io';

@WebSocketGateway({  cors: {
    origin: '*',
  }, })
export class EventService implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{

    private logger: Logger = new Logger('EventGateway');

    @WebSocketServer() wss: Server;

    afterInit(server: Server) {
      this.logger.log('Initialized');
    }
    handleDisconnect(client: Socket) {
        this.logger.log(`Client Disconnected: ${client.id}`);
      }
      handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Client Connected: ${client.id}`);
      }
    
      @SubscribeMessage('eventData')
   identity(client: Socket, data: string) {
        client.emit('startLocationData', 'location emit event')
  }

  @SubscribeMessage('locationTrack')
  locationDta(client: Socket, data: string) {

    client.emit("locationChange",data);
   
   console.log("data is ",data);

 }
  
}