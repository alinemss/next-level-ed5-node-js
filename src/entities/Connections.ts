//Mission Complete

import {
  Entity, 
  Column,
  CreateDateColumn,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
} from "typeorm"

import{ v4 as uuid } from "uuid"
import { Users } from "./Users";


@Entity("connections")
class Connection{

  @PrimaryColumn()
    id: string;
  
    @Column()
    admin_id: string;
  
    @Column()
    user_id: string;
  
    @Column()
    socket_id: string;
   
    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;

//revisar isso aqui parte mais importante    
// essa parte boiei
    @JoinColumn({ name: "user_id"})
    @ManyToOne( () => Users) 
    user: Users;

  
    constructor(){
    if (!this.id){
    this.id = uuid();
    };
  };
}


export {Connection}