import { Component, OnInit } from '@angular/core';
import { Armor } from '../models/armor';
import { GmService } from '../gm.service';

@Component({
  selector: 'app-gm-view-armor',
  templateUrl: './gm-view-armor.component.html',
  styleUrls: ['./gm-view-armor.component.css']
})
export class GmViewArmorComponent implements OnInit {
  loading: Boolean = false;  //Do we display the loading progress bar?
  allArmor: Armor[];
  armor: Armor;
  new: boolean = false;  //Are we creating a new weapon
  edit: boolean = true;  //Start in edit mode

  constructor(private gmService: GmService) { }

  ngOnInit() {
    //Assign all weapons from gmService to local variable.  If there is at least 1 weapon, set first element to weapon.
    this.allArmor = this.gmService.allArmor;
    if (this.allArmor.length > 0) this.armor = this.allArmor[0];
    console.log(this.armor);
  }

  createNewArmor() {
    //Setup a new weapon to create
    this.edit = false;
    this.new = true;
    this.armor = new Armor;
  }

  saveNewArmor() {
    //Save the new weapon
    this.loading = true;

    this.gmService.addNewArmor(this.armor).subscribe(
      res => { //If successful, get a new list of weapons from the server
        this.gmService.getAllArmor()
          .then(
            res => {
              //Save the list of weapons from the server to local
              this.allArmor = this.gmService.allArmor;

              //Disable progress bar
              this.loading = false;
            })
      },
      error => {
        console.log(error)

        //Disable progress bar
        this.loading = false;
      });
  }

  deleteArmor() {
    this.loading = true;
    this.gmService.deleteArmor(this.armor).subscribe(
      res => { //If successful, get a new list of weapons from the server
        this.gmService.getAllArmor()
          .then(
            res => {
              //Empty out the weapon we are deleting
              this.armor = null;
              //Save the list of weapons from the server to local
              this.allArmor = this.gmService.allArmor;

              //Disable progress bar
              this.loading = false;
            })
      },
      error => {
        console.log(error)

        //Disable progress bar
        this.loading = false;
      });
  }

  updateArmor() {
    this.loading = true;

    this.gmService.editArmor(this.armor).subscribe(
      res => {
        this.gmService.getAllArmor()
          .then(
            res => {
              this.allArmor = this.gmService.allArmor;

              //Disable progress bar
              this.loading = false;
            })
      },
      error => {
        console.log(error);

        //Disable progress bar
        this.loading = false;
      });
  }

  setArmor(armor) {
    //Set the weapon to edit
    this.new = false;
    this.edit = true;

    this.armor = armor;
  }
}
