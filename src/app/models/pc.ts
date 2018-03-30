import { Skill } from './skill';
import { Weapon } from './weapon';
import { Armor } from './armor';

export class Pc
{
    id: number;
    name: string;
    xp: number;
    credits: number;
    brawn: number;
    agility: number;
    intellect: number;
    cunning: number;
    willpower: number;
    presence: number;
    wounds_thresh: number;
    wounds_current: number;
    strain_thresh: number;
    strain_current: number;
    critical: number;
    soak: number;
    obligation_type: string;
    obligation_amount: number;
    user_id: number;
    race_id: number;
    career_id: number;
    avatar: string;
    status: string;

    weapons: Weapon[];
    armors: Armor[];
    skills: Skill[];  //PC Skills array
    spec_id: number;  //used for character creation
    selected: boolean = false;  //TRUE = GM selected for current session.  Local variable only: Does not save to server
    active: boolean = false;  //Is this character ACTIVE.  Local variable only: Does not save to server
}