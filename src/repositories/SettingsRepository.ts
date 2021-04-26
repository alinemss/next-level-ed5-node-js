//Mission Complete
import {EntityRepository, Repository} from "typeorm";
import { Setting } from "../entities/Settings";


@EntityRepository(Setting)
//o extends pega os métodos que estão dentro do Repository e extende para nossa class SettingRepository
class SettingsRepository extends Repository<Setting> {

}


export {SettingsRepository};