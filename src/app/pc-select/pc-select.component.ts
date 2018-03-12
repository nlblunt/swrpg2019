import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Pc } from '../models/pc';
import { PcSelectService } from './pc-select.service';


@Component({
    moduleId: module.id,
    selector: 'pc-select',
    templateUrl: 'pc-select.component.html',
    styleUrls: ['pc-select.component.css']
})

export class PcSelectComponent implements OnInit
{
    allPcs: Pc[];
    pcSelected: boolean = false;
    error = '';

    constructor(private pcSelectService: PcSelectService, private router: Router)
    {
        this.allPcs = [];
    }

    ngOnInit()
    {
        this.pcSelectService.getAllPcs()
        .then(() => 
        {
            //Only load to show 'active' PCs from the all PC list
            this.pcSelectService.allPcs.forEach(pc =>
            {
                if(pc.status == 'active') this.allPcs.push(pc);
            })
        })
        .catch((res) => 
        {
            this.error = res;
            if(res.status == 401) console.log("Res Status 401");
        });
        
    }

    selectPc(pc: Pc)
    {
        this.pcSelectService.selectedPc = pc;
        this.pcSelected = true;
        this.router.navigateByUrl('/player/pc-view');
    }
}