import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { PcSelectService } from '../pc-select/pc-select.service'
import { PcViewService } from './pc-view.service';

import { Pc } from '../models/pc';

@Component({
    moduleId: module.id,
    templateUrl: 'pc-view.component.html',
    styleUrls: ['pc-view.component.css']
})

export class PcViewComponent implements OnInit
{
    pcViewStage = "overview";  //What stage is the view on?
    pcNavClass = "nav-hidden";  //Stage of the nav bar
    selectedPc: Pc;

    constructor(private pcSelectService: PcSelectService,
                private pcViewService: PcViewService,
                private router: Router)
    {

    }

    ngOnInit()
    {
        //Save the PC that was selected to work with
        this.selectedPc = this.pcSelectService.selectedPc;
        console.log(this.selectedPc);
        //If selectedPc == null, return to pc-select
        if(this.selectedPc == null) this.router.navigateByUrl("/player");
        
        this.setDice(this.selectedPc.skills.length);
        this.setWeaponDice();
    }

    togglePcNavMenu()
    {
        //Toggle the nav menu
        if(this.pcNavClass == "nav-hidden") this.pcNavClass = "nav-show";
        else this.pcNavClass = "nav-hidden";
    }

    setPcViewStage(view: string)
    {
        //Set the current view stage
        this.pcViewStage = view;
    }

    setWeaponDice()
    {
        //Loop through each weapon
        this.selectedPc.weapons.forEach(weapon => 
        {
            //Loop through each selectedPc skill
            this.selectedPc.skills.forEach(skill => 
            {
                //if the weapon skill name == the current skill, push the dice to weapon
                if(weapon.skill == skill.name)
                {
                    weapon.dice = skill.dice;
                }
            });
        });
    }

    setDice(len)
	{
        //Set each die for each skill / skill check based of off rank and attribute
        for (var i = 0; i < len; i++)
        {
            
            this.selectedPc.skills[i].dice = new Array;
            
            //Attribute is greater than rank
            var attrib = this.selectedPc.skills[i].attrib;
            
            switch(attrib)
            {
                case "Agility":
                    if (this.selectedPc.agility >= this.selectedPc.skills[i].rank)
                    {
                        for(var j=0; j<this.selectedPc.skills[i].rank; j++)
                        {
                            this.selectedPc.skills[i].dice.push("Proficient.png");
                        }
                        
                        for(var h=0; h<this.selectedPc.agility - this.selectedPc.skills[i].rank; h++)
                        {
                            this.selectedPc.skills[i].dice.push("Standard.png");
                        }
                    }
                    else
                    {
                        for(var j=0; j<this.selectedPc.agility; j++)
                        {
                            this.selectedPc.skills[i].dice.push("Proficient.png");
                        }
                        
                        for(var h=0; h<this.selectedPc.skills[i].rank - this.selectedPc.agility; h++)
                        {
                            this.selectedPc.skills[i].dice.push("Standard.png");
                        }
                    }
                    break;
                    
                case "Brawn":
                    if (this.selectedPc.brawn >= this.selectedPc.skills[i].rank)
                    {
                        for(var j=0; j<this.selectedPc.skills[i].rank; j++)
                        {
                            this.selectedPc.skills[i].dice.push("Proficient.png");
                        }
                        
                        for(var h=0; h<this.selectedPc.brawn - this.selectedPc.skills[i].rank; h++)
                        {
                            this.selectedPc.skills[i].dice.push("Standard.png");
                        }
                    }
                    else
                    {
                        for(var j=0; j<this.selectedPc.brawn; j++)
                        {
                            this.selectedPc.skills[i].dice.push("Proficient.png");
                        }
                        
                        for(var h=0; h<this.selectedPc.skills[i].rank - this.selectedPc.brawn; h++)
                        {
                            this.selectedPc.skills[i].dice.push("Standard.png");
                        }
                    }
                    break;
                    
                case "Cunning":
                    if (this.selectedPc.cunning >= this.selectedPc.skills[i].rank)
                    {
                        for(var j=0; j<this.selectedPc.skills[i].rank; j++)
                        {
                            this.selectedPc.skills[i].dice.push("Proficient.png");
                        }
                        
                        for(var h=0; h<this.selectedPc.cunning - this.selectedPc.skills[i].rank; h++)
                        {
                            this.selectedPc.skills[i].dice.push("Standard.png");
                        }
                    }
                    else
                    {
                        for(var j=0; j<this.selectedPc.cunning; j++)
                        {
                            this.selectedPc.skills[i].dice.push("Proficient.png");
                        }
                        
                        for(var h=0; h<this.selectedPc.skills[i].rank - this.selectedPc.cunning; h++)
                        {
                            this.selectedPc.skills[i].dice.push("Standard.png");
                        }
                    }
                    break;
                    
                case "Intellect":
                    if (this.selectedPc.intellect >= this.selectedPc.skills[i].rank)
                    {
                        for(var j=0; j<this.selectedPc.skills[i].rank; j++)
                        {
                            this.selectedPc.skills[i].dice.push("Proficient.png");
                        }
                        
                        for(var h=0; h<this.selectedPc.intellect - this.selectedPc.skills[i].rank; h++)
                        {
                            this.selectedPc.skills[i].dice.push("Standard.png");
                        }
                    }
                    else
                    {
                        for(var j=0; j<this.selectedPc.intellect; j++)
                        {
                            this.selectedPc.skills[i].dice.push("Proficient.png");
                        }
                        
                        for(var h=0; h<this.selectedPc.skills[i].rank - this.selectedPc.intellect; h++)
                        {
                            this.selectedPc.skills[i].dice.push("Standard.png");
                        }
                    }
                    break;
                    
                case "Presence":
                    if (this.selectedPc.presence >= this.selectedPc.skills[i].rank)
                    {
                        for(var j=0; j<this.selectedPc.skills[i].rank; j++)
                        {
                            this.selectedPc.skills[i].dice.push("Proficient.png");
                        }
                        
                        for(var h=0; h<this.selectedPc.presence - this.selectedPc.skills[i].rank; h++)
                        {
                            this.selectedPc.skills[i].dice.push("Standard.png");
                        }
                    }
                    else
                    {
                        for(var j=0; j<this.selectedPc.presence; j++)
                        {
                            this.selectedPc.skills[i].dice.push("Proficient.png");
                        }
                        
                        for(var h=0; h<this.selectedPc.skills[i].rank - this.selectedPc.presence; h++)
                        {
                            this.selectedPc.skills[i].dice.push("Standard.png");
                        }
                    }
                    break;
                    
                case "Willpower":
                    if (this.selectedPc.willpower >= this.selectedPc.skills[i].rank)
                    {
                        for(var j=0; j<this.selectedPc.skills[i].rank; j++)
                        {
                            this.selectedPc.skills[i].dice.push("Proficient.png");
                        }
                        
                        for(var h=0; h<this.selectedPc.willpower - this.selectedPc.skills[i].rank; h++)
                        {
                            this.selectedPc.skills[i].dice.push("Standard.png");
                        }
                    }
                    else
                    {
                        for(var j=0; j<this.selectedPc.willpower; j++)
                        {
                            this.selectedPc.skills[i].dice.push("Proficient.png");
                        }
                        
                        for(var h=0; h<this.selectedPc.skills[i].rank - this.selectedPc.willpower; h++)
                        {
                            this.selectedPc.skills[i].dice.push("Standard.png");
                        }
                    }
                    break;
            }
        }
        return 1;
	};
}