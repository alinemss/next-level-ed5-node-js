//Mission Complete
import { io } from "../http";
import {ConnectionsService} from "../services/ConnectionsService";
import {UsersService} from "../services/UsersServices";
import { MessagesService } from '../services/MessagesService';

interface IParams{
  text: string;
  email: string;
}

io.on("connect", (socket)=> {

  const connectionsService = new ConnectionsService();
  const usersService = new UsersService();
  const messagesService = new MessagesService();



  socket.on("client_first_access", async params => {
    const socket_id = socket.id;
    const {text, email} = params as IParams;
    let user_id = null

      console.log(params);


     const usersExists = await usersService.findByEmail(email);
      
     
      if(!usersExists){
       const user = await usersService.create(email);

       await connectionsService.create({
        socket_id,
        user_id : user.id,
        });
       //VERIFICAR AQUI 
       user_id = user.id;
      } else {
       user_id = usersExists.id;
        const connection = await connectionsService.findByUserId(usersExists.id);

      if(!connection){
        await connectionsService.create({
          socket_id,
          user_id: usersExists.id,
        });

      }else{

        connection.socket_id = socket_id;

        await connectionsService.create(connection);
      };
      }
      await messagesService.create({
        text,
        user_id,
      });
      
      const allMessages = await messagesService.listByUser(user_id);
      
      socket.emit("client_list_all_messages",allMessages);

      const allUsers = await connectionsService.findAllWhithoutAdmin();
      io.emit("admin_list_all_users", allUsers)
  });
//não ta funcionando corretamente
  socket.on("client_send_to_admin", async params => {
    const {text,socket_admin_id} = params;
  
    const socket_id = socket.id

    const {user_id} = await connectionsService.findBySocketId(socket_id);

    const message = await messagesService.create({
      text,
      user_id
    });

    io.to(socket_admin_id).emit("admin_receive_message", {
      message,
      socket_id,
    });
  
  });


  

});
