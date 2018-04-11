import { Component, OnInit } from '@angular/core';

import { GmService } from '../gm.service';

import { Weapon } from '../models/weapon';

@Component({
  selector: 'app-gm-view-weapons',
  templateUrl: './gm-view-weapons.component.html',
  styleUrls: ['./gm-view-weapons.component.css']
})
export class GmViewWeaponsComponent implements OnInit {
  allWeapons: Weapon[];
  weapon: Weapon;
  new: boolean = false;  //Are we creating a new weapon
  edit: boolean = true;  //Start in edit mode

  constructor(private gmService: GmService) { }

  ngOnInit() 
  {
    //Assign all weapons from gmService to local variable.  If there is at least 1 weapon, set first element to weapon.
     this.allWeapons = this.gmService.allWeapons;
     if(this.allWeapons.length > 0) this.weapon = this.allWeapons[0];
     console.log(this.weapon);
  }

  createNewWeapon()
  {
    //Setup a new weapon to create
    this.edit = false;
    this.new = true;
    this.weapon = new Weapon;
  }

  updateWeapon()
  {
    this.gmService.editWeapon(this.weapon).subscribe(
      res=> {
        this.gmService.getAllWeapons()
        .then(
          res => 
          {
            this.allWeapons = this.gmService.allWeapons;
          })
      },
      error => console.log(error));
  }
  
  setWeapon(weapon)
  {
    //Set the weapon to edit
    this.new = false;
    this.edit = true;

    this.weapon = weapon;
  }
}
