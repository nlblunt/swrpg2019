import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Pc } from '../models/pc';
import { Race } from '../models/race';
import { Career } from '../models/career';
import { Skill } from '../models/skill';
import { Specialization } from '../models/specialization';

import { PcCreateService } from './pc-create.service';

//Import MATERIAL
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    moduleId: module.id,
    selector: 'pc-create',
    templateUrl: 'pc-create.component.html',
    styleUrls: ['pc-create.component.css']
})

export class PcCreateComponent implements OnInit
{
    allRaces: Race[];  //Array of all races
    raceDetails: Race;  //Holds details for selected race
    allCareers: Career[];  //Array of all careers
    careerSpecializations: Specialization[];  //Array for career specializations
    character: Pc;  //Player Character that is being created
    newPc: Pc;  //Newly created PC from server
    newPcCareerSkills: Skill[];  //Array for the PcSkills
    newPcCareerSpecializationSkills: Skill[];
    careerSkillChoices: number;  //Number of Career Skill choices left: Base=4
    specSkillChoices: number;  //Number of Specialization Skill choices left: Base=2
    pcCreateStage: string;  //What stage of PC creation are we on?

    constructor(private pcCreateService: PcCreateService, private router: Router)
    {}

    ngOnInit()
    {
        //New PC
        this.character = new Pc();
        
        //Set initial pcCreateStage to pcStage1
        this.pcCreateStage = 'pcStage1';

        //Set skill choice counts
        this.careerSkillChoices = 4;
        this.specSkillChoices = 2;

        //Get the list of races
        this.pcCreateService.getRaces()
        .then(res => 
        {
            //Save the response to allRaces
            this.allRaces = res;
        })
        .catch(res => console.log("Error getting races"));

        this.pcCreateService.getCareers()
        .then(res =>
        {
            //Save the response to allCareers
            this.allCareers = res;
        })
        .catch(res => console.log("Error getting careers"));
    }

    //Called when race select box changes
    //Updates race details
    raceChange(race_id)
    {
        this.allRaces.forEach(element => 
        {
            if(element.id === +race_id)
            {
                //If the element.id (from allRaces) = race_id (from selection) save as details for view
                this.raceDetails = new Race();
                this.raceDetails = element;
            } 
        });
    }

    //Called when career select box changes
    //Updates specializations
    careerChange(career_id)
    {
        this.allCareers.forEach(element =>
        {
            if(element.id === +career_id)
            {
                //If the element.id (from allCareers) = career_id
                this.pcCreateService.getCareerSpecializations(career_id)
                .then(res => 
                {
                    this.careerSpecializations = res;
                })
                .catch(() => console.log("Error getting specializations"))
            }
        })
    }

    increaseCareerSkillRank(index, skillId, useXp)
    {
        this.pcCreateService.increaseSkillRank(this.newPc.id, skillId, false)
        .then(() =>
        {
            //Increase the skill rank
            this.newPc.skills.forEach(skill => 
            {
                if(skill.id == +skillId)
                {
                    skill.rank = skill.rank + 1;
                }
            });
            //Decrease availble count and remove from list
            this.careerSkillChoices = this.careerSkillChoices - 1;
            this.newPcCareerSkills.splice(index, 1);
        })
        .catch(() => console.log("Error increasing skill rank"));
    }

    increaseSpecializationSkillRank(index, skillId, useXp)
    {
        this.pcCreateService.increaseSkillRank(this.newPc.id, skillId, false)
        .then(() =>
        {
            //Decrease availble count and remove from list
            this.specSkillChoices = this.specSkillChoices - 1;
            this.newPcCareerSpecializationSkills.splice(index, 1);
        })
        .catch(() => console.log("Error increasing skill rank"));
    }

    increaseSkillRank(skillId, useXp)
    {
        this.pcCreateService.increaseSkillRank(this.newPc.id, skillId, useXp)
            .then(() =>
            {
                //Increase the skill rank
                this.newPc.skills.forEach(skill => 
                {
                    if(skill.id == +skillId)
                    {
                        skill.rank = skill.rank + 1;
                    }
                });

                //Get updated xp
                this.pcCreateService.getPcXp(this.newPc.id)
                .then(res => this.newPc.xp = res.xp)
                .catch(() => console.log("Error getting updated XP")); 
            })        

    }

    increaseAttribute(attribute)
    {
        this.pcCreateService.increaseAttribute(this.newPc.id, attribute)
        .then(() =>
        {
            switch (attribute) 
            {
                case 'agility':
                    this.newPc.agility++;
                    break;
                case 'brawn':
                    this.newPc.brawn++;
                    break;
                case 'cunning':
                    this.newPc.cunning++;
                    break;
                case 'intellect':
                    this.newPc.intellect++;
                    break;
                case 'presence':
                    this.newPc.presence++;
                    break;
                case 'willpower':
                    this.newPc.willpower++;
                    break;
                default:
                    break;
            }
            
            //get updated xp
            this.pcCreateService.getPcXp(this.newPc.id)
            .then(res => this.newPc.xp = res.xp)
            .catch(() => console.log("Error getting updated XP"));
        })
        .catch(() => console.log("Error increasing attribute"));
    }

    //Move to stage 2 of Pc creation
    pcStage2()
    {
        //Create a new Pc and save the base Pc to work with
        this.pcCreateService.createNewPc(this.character.name, this.character.race_id, this.character.career_id)
        .then(res => 
        {
            //Pc created on server.  Save the PC for further updating
            this.newPc = res;
            console.log(res);
            
            this.newPcCareerSkills = [];
            this.newPcCareerSpecializationSkills = [];

            //Save Career Skills for skill setup
            this.newPc.skills.forEach(skill => 
            {
                if(skill.career) this.newPcCareerSkills.push(skill);
            });

            //Assign initial specialization.  Use no XP (false)
            this.pcCreateService.addNewPcSpecialization(this.newPc.id, this.character.spec_id, false)
            .then(() =>
            {
                //Get the specializaion skills available and save for view
                this.pcCreateService.getCareerSpecializationSkills(this.character.spec_id)
                .then(res => this.newPcCareerSpecializationSkills = res)
                .catch(res => console.log(res));

                this.pcCreateStage = 'pcStage2';
            })
        })
        .catch(res => console.log(res))
    }

    pcStage3()
    {
        //Time to use initial XP
        this.pcCreateStage = 'pcStage3';
    }

    pcFinalize()
    {
        //Finalize the PC.  Set status to 'active'
        this.pcCreateService.finalizeNewPc(this.newPc.id)
        .then(() =>
        {
            //Navigate back to PC select
            this.router.navigateByUrl('/player');
        })
    }
}