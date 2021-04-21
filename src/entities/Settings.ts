
import {
  Entity, 
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from "typeorm"

//importa o pacote e usa a versão 4 para criar com números aleatórios e para facilidade coloca as uuid facilitando identificação
import{ v4 as uuid } from "uuid"


@Entity("settings")

class Setting{
  
  @PrimaryColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  chat: boolean

  @UpdateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;



//verificar se o id esta preeenchido caso n criar um uuid para esse id  
  constructor(){
    if (!this.id){
      this.id = uuid();
    } 
  }


}


export {Setting}