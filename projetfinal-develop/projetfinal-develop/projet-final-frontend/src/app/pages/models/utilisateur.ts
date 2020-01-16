import { Role } from './role';
import { TaskModel } from './task-model';
import { Mission } from './mission';

export class Utilisateur {
    id: number;
    nom: string;
    prenom: string;
    pseudo: string ;
    motDePasse: string;
    adresse: string;
    cin: string;
    ville: string;
    mission: Mission[];
    TaskModel: TaskModel;
    role: Role;
    mail: string;
}
