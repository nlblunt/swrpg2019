/*This Service will be responsible for all API calls to the server
  for the GM.  All GM components will have access to use this service.
*/
import { Injectable } from "@angular/core";
import { AngularTokenService } from "angular-token";
import { Router } from "@angular/router";

// IMPORT NEEDED MODELS
import { Pc } from "./models/pc";
import { Weapon } from "./models/weapon";
import { Armor } from "./models/armor";
import { Item } from "./models/item";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class GmService {
  //All PCS and SelectedPc
  allPcs: Pc[]; //Holds all the Pcs from the server
  allWeapons: Weapon[]; //Holds all the available weapons
  allArmor: Armor[]; //Holds all the available armor
  allItems: Item[];

  selectedPc: Pc; //What is the selected Pc?
  display: string; //What display to show

  pcsInSession: Pc[];

  constructor(
    //private http: AngularTokenService,
    private  http: HttpClient,
    private router: Router
  ) {
    this.pcsInSession = [];
  }

  //This gets a list of all the PCS on the server and stores them in allPcs for later use
  getAllPcs(): Promise<Pc[]> {
    //Clear out allPcs
    this.allPcs = [];
    return this.http
      .get("gm/get_all_pcs.json") //, {headers: this.authHeader})//JSON.stringify({id: this.currentUser.id, auth_token: this.currentUser.token}), {headers: this.authHeader})
      .toPromise()
      .then(res => (this.allPcs = res as Pc[]));
  }

  //Delete this PC from the server
  deletePc(id: any) {
    return this.http.post("player/delete_pc", { id: id });
  }

  //GM: Modify the PC.  Requires a PC and SKILLS list
  updatePc(pc, skills) {
    return this.http.post("gm/modify_pc", { pc: pc, skills: skills });
  }

  //Get all the weapons
  getAllWeapons()
  {
    return this.http.get("Weapon").subscribe(
      res => 
      {
        this.allWeapons = res as Weapon[];
      },
      error => 
      { 
        console.log(error) 
      }
    )
  }
  /*async agetAllWeapons(): Promise<Weapon[]> {
    this.allWeapons = [];
    const res = await this.http
      .get("weapon")
      .toPromise();
    return (this.allWeapons = res as Weapon[], (error: any) => console.log(error));
  }*/

  //Add a new weapon
  addNewWeapon(weapon) {
    return this.http.post("weapon", weapon);
  }

  //Delete a weapon
  deleteWeapon(weapon) {
    return this.http.delete("weapon/" + weapon.id);
  }

  //Edit a weapon
  editWeapon(weapon) {
    return this.http.put("weapon/" + weapon.id, weapon);
  }

  //Add the weapon to the PC
  addWeaponToPc(weapon, pcId) {
    return this.http.post("gm/addWeaponToPc", {
      id: pcId,
      w_id: weapon.id
    });
  }

  //Delete the weapon from the PC.  Does not remove weapon from DB
  removeWeaponFromPc(weapon) {
    return this.http.post("gm/removeWeaponFromPc", {
      w_id: weapon.id
    });
  }

  //Get all the armor
  getAllArmor()
  {
    return this.http.get("Armor").subscribe(
      res => 
      {
        this.allArmor = res as Armor[];
      },
      error => 
      { 
        console.log(error) 
      }
    )
  }

  //Add a new armor
  addNewArmor(armor) {
    return this.http.post("armor", armor);
  }

  //Delete an armor
  deleteArmor(armor) {
    return this.http.delete("armor/" + armor.id);
  }

  //Edit an armor
  editArmor(armor) {
    return this.http.put("armor/" + armor.id, armor);
  }

  //Add the armor to the pc.  Could be a new armor or transfer from existing armor.
  addArmorToPc(armor, pcId) {
    return this.http.post("gm/addArmorToPc", {
      id: pcId,
      a_id: armor.id
    });
  }

  removeArmorFromPc(armor) {
    return this.http.post("gm/removeArmorFromPc", { a_id: armor.id });
  }

  //Get all the items
  getAllItems()
  {
    return this.http.get("Item").subscribe(
      res => 
      {
        this.allItems = res as Item[];
      },
      error => 
      { 
        console.log(error) 
      }
    )
  }

  //Add a new item
  addNewItem(item) {
    return this.http.post("item", item);
  }

  //Delete an item
  deleteItem(item) {
    return this.http.delete("item/" + item.id);
  }

  //Edit an armor
  editItem(item) {
    return this.http.put("item/" + item.id, item);
  }

  //Add the itme to the PC
  addItemToPc(item, pcId) {
    return this.http.post("gm/addItemToPc", {
      id: pcId,
      i_id: item.id
    });
  }

  removeItemFromPc(item) {
    return this.http.post("gm/removeItemFromPc", { i_id: item.id });
  }
}
