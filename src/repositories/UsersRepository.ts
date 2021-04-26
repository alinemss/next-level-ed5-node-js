//Mission Complete
import {EntityRepository, Repository} from "typeorm";
import { Users } from "../entities/Users";


@EntityRepository(Users)
//o extends pega os métodos que estão dentro do Repository e extende para nossa class SettingRepository
class UsersRepository extends Repository<Users> {

}


export {UsersRepository};