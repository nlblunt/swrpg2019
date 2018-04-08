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

  constructor(private gmService: GmService) { }

  ngOnInit() 
  {
     this.allWeapons = this.gmService.allWeapons;
  }

}
