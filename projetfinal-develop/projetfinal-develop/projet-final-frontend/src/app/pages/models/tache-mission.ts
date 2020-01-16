import { Utilisateur } from './utilisateur';

export class TacheMission {
    id:number;
    nomTache: String
    description: String
    dateAffectation: Date
    dateEcheance: Date
    status: string
   commentaire: string
   dateValidation: Date
   categorie: string
   dbFile:any;
   utilisateur: Utilisateur;
   priorite : String;
}
