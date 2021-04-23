import {getCustomRepository, Repository} from "typeorm";
import { Setting } from "../entities/Settings";
import {SettingsRepository} from "../repositories/SettingsRepository"


//Ainda sem entender bem a funcionalidade da interface

interface ISettingsCreate {
  chat: boolean;
  username: string;
}

class SettingsService{

  private settingsRepository: Repository<Setting>;

  constructor(){
    this.settingsRepository = getCustomRepository(SettingsRepository);
  }

  async create({chat,username}:ISettingsCreate){
     
    const userAlreadyExist = await this.settingsRepository.findOne({username,});
   
    
    // trow passa essa informação para a camada de cima ..controller
    if(userAlreadyExist){
      throw new Error("User already exist");
    }
    
    const settings = this.settingsRepository.create({chat,username});
  
    await this.settingsRepository.save(settings);

    return (settings);
  }
}

export {SettingsService}