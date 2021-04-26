//Mission Complete
import {getCustomRepository, Repository} from "typeorm";
import { Message } from "../entities/Messages";
import {MessageRepository} from "../repositories/MessagesRepository";


// a ? atribui ao admin_in que ele seja opcional
interface IMessageCreate{
  admin_id?: string;
  text: string;
  user_id: string;
}


class MessagesService{
//colocar o método dentro da classe para n precisar chamar mais de uma vez
//private funciona apenas dentro da class
private messagesRepository : Repository<Message>;

constructor (){
this.messagesRepository = getCustomRepository(MessageRepository);
}
  async create({admin_id, text, user_id}:IMessageCreate){
   
    const message = this.messagesRepository.create({
      admin_id,
      text,
      user_id,
    });
    
    await this.messagesRepository.save(message);

    console.log(message)
    return message;
     
  }

  async listByUser(user_id: string) {
    const list = await this.messagesRepository.find({
      
      where: {user_id},
    
      relations: ["user"]
    
    });

    return list
  }

}

export{MessagesService};


