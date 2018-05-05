import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';



import { Pc } from '../models/pc';
import { Race } from '../models/race';
import { Career } from '../models/career';
import { Skill } from '../models/skill';
import { Specialization } from '../models/specialization'

//import { ServerUrlService } from '../services/server-url.service';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class PcCreateService
{
    allRaces: Race[];
    allCareers: Career[];
    newPc: Pc;

    currentUser: any;
    authHeader: Headers;

    constructor(private _tokenService: Angular2TokenService)
    { 
        //this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        //this.authHeader = new Headers();
        //this.authHeader.append('Authorization', " " + this.currentUser.token);
        //Get the races on 
        this.getRaces();
    };

    getRaces(): Promise<Race[]>
    {
        return this._tokenService.get("race/index.json").toPromise()
        .then(res => res.json() as Race[])
        .catch(res => Promise.reject(res.message))
    }

    getCareers(): Promise<Career[]>
    {
        return this._tokenService.get('career/index.json')
        .toPromise()
        .then(res => res.json() as Career[])
        .catch(res => Promise.reject(res.message))
    }

    //Gets a list of all the specializations for the careerr
    getCareerSpecializations(id): Promise<Specialization[]>
    {
        return this._tokenService.get('career/get-career-specializations/'+id+".json")
        .toPromise()
        .then(res => res.json() as Specialization[])
        .catch(res => Promise.reject(res.message))
    }

    //Gets a list of all the skills for the specialization
    getCareerSpecializationSkills(id): Promise<Skill[]>
    {
        return this._tokenService.get('career/get-career-specialization-skills/'+id+".json")
        .toPromise()
        .then(res => res.json() as Skill[])
        .catch(res => Promise.reject(res.message))
    }

    //Gets a list of all the skills
    getSkills(id): Promise<Skill[]>
    {
        return this._tokenService.post('player/get-pc-skills.json', {id: id})
        .toPromise()
        .then(res => res.json() as Skill[])
        .catch(res => Promise.reject(res.message))
    }

    //Gets the pc xp
    getPcXp(id): Promise<any>
    {
        return this._tokenService.get('player/get-pc-xp/'+id+".json")
        .toPromise()
        .then(res => res.json())
        .catch(res => Promise.reject(res.message))
    }
    
    createNewPc(name, race_id, career_id): Promise<Pc>
    {
        return this._tokenService.post('player/pc-create.json', {pc:{player_id: this._tokenService.currentUserData.id, name: name, race_id: race_id, career_id: career_id}})
        .toPromise()
        .then(res => 
            {
                console.log(res);
                return res.json() as Pc
            })
        .catch(res => {
            console.log(res);
            return Promise.reject(res.message)})
    }

    addNewPcSpecialization(pc_id, spec_id, use_xp): Promise<any>
    {
        return this._tokenService.post('player/set-specialization.json', {id: pc_id,spec_id: spec_id, use_xp: use_xp})
        .toPromise()
        .then(res => res.json())
        .catch(res => Promise.reject(res.message))
    }

    increaseSkillRank(pcId, skillId, useXp): Promise<any>
    {
        return this._tokenService.post('player/increase-skill-rank.json', {id: pcId, skill_id: skillId, use_xp: useXp})
        .toPromise()
        .then(res => res.json())
        .catch(res => Promise.reject(res.message))
    }

    increaseAttribute(pcId, attribute): Promise<any>
    {
        return this._tokenService.post('player/increase-attribute.json', {id: pcId, attribute: attribute})
        .toPromise()
        .then(res => res.json())
        .catch(res => Promise.reject(res.message))
    }

    finalizeNewPc(pcId): Promise<any>
    {
        return this._tokenService.post('player/finalize-pc.json', {id: pcId})
        .toPromise()
        .then()
        .catch(res => Promise.reject(res.message))
    }
    
    private handleError(error: any): Promise<any> {
        //console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}