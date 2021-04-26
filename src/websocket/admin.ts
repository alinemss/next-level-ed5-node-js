//Mission Complete
import { io } from "../http";
import {ConnectionsService} from "../services/ConnectionsService";
import {MessagesService} from "../services/MessagesService";

io.on("connect", async (socket)=>{

  const connectionsService = new ConnectionsService();
  const messagesService = new MessagesService();

  const allConnectionsWhithoutAdmin = await connectionsService.findAllWhithoutAdmin();

  io.emit("admin_list_all_users", allConnectionsWhithoutAdmin),

  socket.on("admin_list_messages_by_user", async (params, callback) => {
  //decomposição
    const { user_id } = params;
  
    const allMessages = await messagesService.listByUser(user_id);

    callback(allMessages)
  });

  socket.on("admin_send_message", async (params)=>{
    const {user_id, text} = params;
    await messagesService.create({
      text,
      user_id,
      admin_id: socket.id
    });
    //pegar o socket_id do user_id
    const {socket_id} = await connectionsService.findByUserId(user_id);

    io.to(socket_id).emit("admin_send_to_client", {
      text,
      socket_id: socket.id 
    });
  });
  socket.on("admin_user_in_support", async params =>{
    const {user_id} = params;
    await connectionsService.updatedAdminID(user_id,socket.id);
  
  //att list de usuarios sem admin
  const allConnectionsWhithoutAdmin = await connectionsService.findAllWhithoutAdmin();

  io.emit("admin_list_all_users", allConnectionsWhithoutAdmin);

  
  });

});