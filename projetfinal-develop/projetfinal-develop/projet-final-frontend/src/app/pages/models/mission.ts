import { TacheMission } from './tache-mission';
import { Utilisateur } from './utilisateur';
import { Model } from './model';

export class Mission {
    id:number;
    dateDebut : Date;
    dateFin : Date;
    description : String;
    tachesMissions:TacheMission[];
    collaborateur:Utilisateur;
    model: Model;
  

}
