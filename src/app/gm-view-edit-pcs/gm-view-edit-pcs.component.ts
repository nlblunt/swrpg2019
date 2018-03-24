import { Component, OnInit } from '@angular/core';

import { GmService } from '../gm.service';

import { Pc } from '../models/pc';

@Component({
  selector: 'app-gm-view-edit-pcs',
  templateUrl: './gm-view-edit-pcs.component.html',
  styleUrls: ['./gm-view-edit-pcs.component.css']
})
export class GmViewEditPcsComponent implements OnInit {

  allPcs: Pc[];
  character: Pc;
  constructor(private gmService: GmService) { }

  //Initialize this component and get a list of all PCS from the server
  //using the GmService
  ngOnInit() 
  {
    this.getAllPcs();
  }

  setPc(pc)
  {
    this.character = pc;
  }

  delete_pc(id)
  {
    //Delete this PC and get a new list
    this.gmService.deletePc(id).subscribe(
      res => this.getAllPcs(),
      error => console.log(error));
  }

  close_edit_pc_state()
  {
    //Close the edit pc state.  Set character to null.
    this.character = null;
    this.gmService.display = "";
  }

  open_add_weapon_pc_dialog(){}

  delete_weapon_from_pc(index, id){}

  open_add_armor_pc_dialog(){}

  delete_armor_from_pc(index, id){}

  open_add_item_pc_dialog(){}

  delete_item_from_pc(index, id){}

  skill_rank_changed(skill, rank){}

  //Utility functions
  getAllPcs()
  {
    console.log("Getting All PCs");
     this.gmService.getAllPcs()
    .then(() => 
      {
        this.allPcs = this.gmService.allPcs;
        this.character = this.allPcs[0];
        console.log(this.allPcs);
      })
    .catch(res => console.log(res));
  }
}