//Mission Complete
import {
  Entity, 
  Column,
  CreateDateColumn,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm"

import{ v4 as uuid } from "uuid"
import { Users } from "./Users";

@Entity("messages")
class Message{

  @PrimaryColumn()
    id: string;
  
    @Column()
    admin_id: string;
  
    @Column()
    user_id: string;
  
    @Column()
    text: string;


//revisar isso aqui parte mais importante    
// essa parte boiei
    @JoinColumn({ name: "user_id"})
    @ManyToOne( () => Users) 
    user: Users;
   
    @CreateDateColumn()
    created_at: Date;
  
  constructor(){
    if (!this.id){
    this.id = uuid();
    };
  };
}


export {Message}