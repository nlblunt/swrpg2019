"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var pc_select_service_1 = require('../pc-select/pc-select.service');
var pc_view_service_1 = require('./pc-view.service');
var PcViewComponent = (function () {
    function PcViewComponent(pcSelectService, pcViewService, router) {
        this.pcSelectService = pcSelectService;
        this.pcViewService = pcViewService;
        this.router = router;
        this.pcViewStage = "overview"; //What stage is the view on?
        this.pcNavClass = "nav-hidden"; //Stage of the nav bar
    }
    PcViewComponent.prototype.ngOnInit = function () {
        //Save the PC that was selected to work with
        this.selectedPc = this.pcSelectService.selectedPc;
        //If selectedPc == null, return to pc-select
        if (this.selectedPc == null)
            this.router.navigateByUrl("/player");
        this.setDice(this.selectedPc.skills.length);
        this.setWeaponDice();
        console.log(this.selectedPc);
    };
    PcViewComponent.prototype.togglePcNavMenu = function () {
        //Toggle the nav menu
        if (this.pcNavClass == "nav-hidden")
            this.pcNavClass = "nav-show";
        else
            this.pcNavClass = "nav-hidden";
    };
    PcViewComponent.prototype.setPcViewStage = function (view) {
        //Set the current view stage
        this.pcViewStage = view;
    };
    PcViewComponent.prototype.setWeaponDice = function () {
        var _this = this;
        //Loop through each weapon
        this.selectedPc.weapons.forEach(function (weapon) {
            //Loop through each selectedPc skill
            _this.selectedPc.skills.forEach(function (skill) {
                //if the weapon skill name == the current skill, push the dice to weapon
                if (weapon.skill == skill.name) {
                    weapon.dice = skill.dice;
                }
            });
        });
    };
    PcViewComponent.prototype.setDice = function (len) {
        //Set each die for each skill / skill check based of off rank and attribute
        for (var i = 0; i < len; i++) {
            this.selectedPc.skills[i].dice = new Array;
            //Attribute is greater than rank
            var attrib = this.selectedPc.skills[i].attrib;
            switch (attrib) {
                case "Agility":
                    if (this.selectedPc.agility >= this.selectedPc.skills[i].rank) {
                        for (var j = 0; j < this.selectedPc.skills[i].rank; j++) {
                            this.selectedPc.skills[i].dice.push("Proficient.png");
                        }
                        for (var h = 0; h < this.selectedPc.agility - this.selectedPc.skills[i].rank; h++) {
                            this.selectedPc.skills[i].dice.push("Standard.png");
                        }
                    }
                    else {
                        for (var j = 0; j < this.selectedPc.agility; j++) {
                            this.selectedPc.skills[i].dice.push("Proficient.png");
                        }
                        for (var h = 0; h < this.selectedPc.skills[i].rank - this.selectedPc.agility; h++) {
                            this.selectedPc.skills[i].dice.push("Standard.png");
                        }
                    }
                    break;
                case "Brawn":
                    if (this.selectedPc.brawn >= this.selectedPc.skills[i].rank) {
                        for (var j = 0; j < this.selectedPc.skills[i].rank; j++) {
                            this.selectedPc.skills[i].dice.push("Proficient.png");
                        }
                        for (var h = 0; h < this.selectedPc.brawn - this.selectedPc.skills[i].rank; h++) {
                            this.selectedPc.skills[i].dice.push("Standard.png");
                        }
                    }
                    else {
                        for (var j = 0; j < this.selectedPc.brawn; j++) {
                            this.selectedPc.skills[i].dice.push("Proficient.png");
                        }
                        for (var h = 0; h < this.selectedPc.skills[i].rank - this.selectedPc.brawn; h++) {
                            this.selectedPc.skills[i].dice.push("Standard.png");
                        }
                    }
                    break;
                case "Cunning":
                    if (this.selectedPc.cunning >= this.selectedPc.skills[i].rank) {
                        for (var j = 0; j < this.selectedPc.skills[i].rank; j++) {
                            this.selectedPc.skills[i].dice.push("Proficient.png");
                        }
                        for (var h = 0; h < this.selectedPc.cunning - this.selectedPc.skills[i].rank; h++) {
                            this.selectedPc.skills[i].dice.push("Standard.png");
                        }
                    }
                    else {
                        for (var j = 0; j < this.selectedPc.cunning; j++) {
                            this.selectedPc.skills[i].dice.push("Proficient.png");
                        }
                        for (var h = 0; h < this.selectedPc.skills[i].rank - this.selectedPc.cunning; h++) {
                            this.selectedPc.skills[i].dice.push("Standard.png");
                        }
                    }
                    break;
                case "Intellect":
                    if (this.selectedPc.intellect >= this.selectedPc.skills[i].rank) {
                        for (var j = 0; j < this.selectedPc.skills[i].rank; j++) {
                            this.selectedPc.skills[i].dice.push("Proficient.png");
                        }
                        for (var h = 0; h < this.selectedPc.intellect - this.selectedPc.skills[i].rank; h++) {
                            this.selectedPc.skills[i].dice.push("Standard.png");
                        }
                    }
                    else {
                        for (var j = 0; j < this.selectedPc.intellect; j++) {
                            this.selectedPc.skills[i].dice.push("Proficient.png");
                        }
                        for (var h = 0; h < this.selectedPc.skills[i].rank - this.selectedPc.intellect; h++) {
                            this.selectedPc.skills[i].dice.push("Standard.png");
                        }
                    }
                    break;
                case "Presence":
                    if (this.selectedPc.presence >= this.selectedPc.skills[i].rank) {
                        for (var j = 0; j < this.selectedPc.skills[i].rank; j++) {
                            this.selectedPc.skills[i].dice.push("Proficient.png");
                        }
                        for (var h = 0; h < this.selectedPc.presence - this.selectedPc.skills[i].rank; h++) {
                            this.selectedPc.skills[i].dice.push("Standard.png");
                        }
                    }
                    else {
                        for (var j = 0; j < this.selectedPc.presence; j++) {
                            this.selectedPc.skills[i].dice.push("Proficient.png");
                        }
                        for (var h = 0; h < this.selectedPc.skills[i].rank - this.selectedPc.presence; h++) {
                            this.selectedPc.skills[i].dice.push("Standard.png");
                        }
                    }
                    break;
                case "Willpower":
                    if (this.selectedPc.willpower >= this.selectedPc.skills[i].rank) {
                        for (var j = 0; j < this.selectedPc.skills[i].rank; j++) {
                            this.selectedPc.skills[i].dice.push("Proficient.png");
                        }
                        for (var h = 0; h < this.selectedPc.willpower - this.selectedPc.skills[i].rank; h++) {
                            this.selectedPc.skills[i].dice.push("Standard.png");
                        }
                    }
                    else {
                        for (var j = 0; j < this.selectedPc.willpower; j++) {
                            this.selectedPc.skills[i].dice.push("Proficient.png");
                        }
                        for (var h = 0; h < this.selectedPc.skills[i].rank - this.selectedPc.willpower; h++) {
                            this.selectedPc.skills[i].dice.push("Standard.png");
                        }
                    }
                    break;
            }
        }
        return 1;
    };
    ;
    PcViewComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'pc-view.component.html',
            styleUrls: ['pc-view.component.css']
        }), 
        __metadata('design:paramtypes', [pc_select_service_1.PcSelectService, pc_view_service_1.PcViewService, router_1.Router])
    ], PcViewComponent);
    return PcViewComponent;
}());
exports.PcViewComponent = PcViewComponent;
//# sourceMappingURL=pc-view.component.js.map