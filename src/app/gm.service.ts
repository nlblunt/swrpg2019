/*This Service will be responsible for all API calls to the server
  for the GM.  All GM components will have access to use this service.
*/
import { Injectable } from "@angular/core";
import { Angular2TokenService } from "angular2-token";
import { Router } from "@angular/router";

// IMPORT NEEDED MODELS
import { Pc } from "./models/pc";
import { Weapon } from "./models/weapon";
import { Armor } from "./models/armor";
import { Item } from "./models/item";

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
    private _tokenService: Angular2TokenService,
    private router: Router
  ) {
    this.pcsInSession = [];
  }

  //This gets a list of all the PCS on the server and stores them in allPcs for later use
  getAllPcs(): Promise<Pc[]> {
    //Clear out allPcs
    this.allPcs = [];
    return this._tokenService
      .get("gm/get_all_pcs.json") //, {headers: this.authHeader})//JSON.stringify({id: this.currentUser.id, auth_token: this.currentUser.token}), {headers: this.authHeader})
      .toPromise()
      .then(res => (this.allPcs = res.json() as Pc[]));
  }

  //Delete this PC from the server
  deletePc(id) {
    return this._tokenService.post("player/delete_pc", { id: id });
  }

  //GM: Modify the PC.  Requires a PC and SKILLS list
  updatePc(pc, skills) {
    return this._tokenService.post("gm/modify_pc", { pc: pc, skills: skills });
  }

  //Get all the weapons
  getAllWeapons(): Promise<Weapon[]> {
    this.allWeapons = [];
    return this._tokenService
      .get("weapon")
      .toPromise()
      .then(res => (this.allWeapons = res.json()), error => console.log(error));
  }

  //Add a new weapon
  addNewWeapon(weapon) {
    return this._tokenService.post("weapon", weapon);
  }

  //Delete a weapon
  deleteWeapon(weapon) {
    return this._tokenService.delete("weapon/" + weapon.id);
  }

  //Edit a weapon
  editWeapon(weapon) {
    return this._tokenService.put("weapon/" + weapon.id, weapon);
  }

  //Add the weapon to the PC
  addWeaponToPc(weapon, pcId) {
    return this._tokenService.post("gm/addWeaponToPc", {
      id: pcId,
      w_id: weapon.id
    });
  }

  //Delete the weapon from the PC.  Does not remove weapon from DB
  removeWeaponFromPc(weapon) {
    return this._tokenService.post("gm/removeWeaponFromPc", {
      w_id: weapon.id
    });
  }

  //Get all the armor
  getAllArmor(): Promise<Armor[]> {
    this.allArmor = [];
    return this._tokenService
      .get("armor")
      .toPromise()
      .then(res => (this.allArmor = res.json()), error => console.log(error));
  }

  //Add a new armor
  addNewArmor(armor) {
    return this._tokenService.post("armor", armor);
  }

  //Delete an armor
  deleteArmor(armor) {
    return this._tokenService.delete("armor/" + armor.id);
  }

  //Edit an armor
  editArmor(armor) {
    return this._tokenService.put("armor/" + armor.id, armor);
  }

  //Add the armor to the pc.  Could be a new armor or transfer from existing armor.
  addArmorToPc(armor, pcId) {
    return this._tokenService.post("gm/addArmorToPc", {
      id: pcId,
      a_id: armor.id
    });
  }

  removeArmorFromPc(armor) {
    return this._tokenService.post("gm/removeArmorFromPc", { a_id: armor.id });
  }

  //Get all the items
  getAllItems(): Promise<Item[]> {
    this.allItems = [];
    return this._tokenService
      .get("item")
      .toPromise()
      .then(res => (this.allItems = res.json()), error => console.log(error));
  }

  //Add a new item
  addNewItem(item) {
    return this._tokenService.post("item", item);
  }

  //Delete an item
  deleteItem(item) {
    return this._tokenService.delete("item/" + item.id);
  }

  //Edit an armor
  editItem(item) {
    return this._tokenService.put("item/" + item.id, item);
  }

  //Add the itme to the PC
  addItemToPc(item, pcId) {
    return this._tokenService.post("gm/addItemToPc", {
      id: pcId,
      i_id: item.id
    });
  }

  removeItemFromPc(item) {
    return this._tokenService.post("gm/removeItemFromPc", { i_id: item.id });
  }
}
