import { TaskModel } from './task-model';
import { Mission } from './mission';

export class Model {
    description : string;
    designation : string;
    type : string;
    taskModels : TaskModel[];
}
