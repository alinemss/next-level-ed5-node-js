//Mission Complete
import {EntityRepository, Repository} from "typeorm";
import { Message } from "../entities/Messages";


@EntityRepository(Message)
//o extends pega os métodos que estão dentro do Repository e extende para nossa class SettingRepository
class MessageRepository extends Repository<Message> {

}


export {MessageRepository};