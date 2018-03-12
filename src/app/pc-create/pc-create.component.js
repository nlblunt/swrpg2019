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
var pc_1 = require('../../models/pc');
var race_1 = require('../../models/race');
var pc_create_service_1 = require('./pc-create.service');
var PcCreateComponent = (function () {
    function PcCreateComponent(pcCreateService, router) {
        this.pcCreateService = pcCreateService;
        this.router = router;
    }
    PcCreateComponent.prototype.ngOnInit = function () {
        var _this = this;
        //New PC
        this.character = new pc_1.Pc();
        //Set initial pcCreateStage to pcStage1
        this.pcCreateStage = 'pcStage1';
        //Set skill choice counts
        this.careerSkillChoices = 4;
        this.specSkillChoices = 2;
        //Get the list of races
        this.pcCreateService.getRaces()
            .then(function (res) {
            //Save the response to allRaces
            _this.allRaces = res;
        })
            .catch(function (res) { return console.log("Error getting races"); });
        this.pcCreateService.getCareers()
            .then(function (res) {
            //Save the response to allCareers
            _this.allCareers = res;
        })
            .catch(function (res) { return console.log("Error getting careers"); });
    };
    //Called when race select box changes
    //Updates race details
    PcCreateComponent.prototype.raceChange = function (race_id) {
        var _this = this;
        this.allRaces.forEach(function (element) {
            if (element.id === +race_id) {
                //If the element.id (from allRaces) = race_id (from selection) save as details for view
                _this.raceDetails = new race_1.Race();
                _this.raceDetails = element;
            }
        });
    };
    //Called when career select box changes
    //Updates specializations
    PcCreateComponent.prototype.careerChange = function (career_id) {
        var _this = this;
        this.allCareers.forEach(function (element) {
            if (element.id === +career_id) {
                //If the element.id (from allCareers) = career_id
                _this.pcCreateService.getCareerSpecializations(career_id)
                    .then(function (res) {
                    _this.careerSpecializations = res;
                })
                    .catch(function () { return console.log("Error getting specializations"); });
            }
        });
    };
    PcCreateComponent.prototype.increaseCareerSkillRank = function (index, skillId, useXp) {
        var _this = this;
        this.pcCreateService.increaseSkillRank(this.newPc.id, skillId, false)
            .then(function () {
            //Increase the skill rank
            _this.newPc.skills.forEach(function (skill) {
                if (skill.id == +skillId) {
                    skill.rank = skill.rank + 1;
                }
            });
            //Decrease availble count and remove from list
            _this.careerSkillChoices = _this.careerSkillChoices - 1;
            _this.newPcCareerSkills.splice(index, 1);
        })
            .catch(function () { return console.log("Error increasing skill rank"); });
    };
    PcCreateComponent.prototype.increaseSpecializationSkillRank = function (index, skillId, useXp) {
        var _this = this;
        this.pcCreateService.increaseSkillRank(this.newPc.id, skillId, false)
            .then(function () {
            //Decrease availble count and remove from list
            _this.specSkillChoices = _this.specSkillChoices - 1;
            _this.newPcCareerSpecializationSkills.splice(index, 1);
        })
            .catch(function () { return console.log("Error increasing skill rank"); });
    };
    PcCreateComponent.prototype.increaseSkillRank = function (skillId, useXp) {
        var _this = this;
        this.pcCreateService.increaseSkillRank(this.newPc.id, skillId, useXp)
            .then(function () {
            //Increase the skill rank
            _this.newPc.skills.forEach(function (skill) {
                if (skill.id == +skillId) {
                    skill.rank = skill.rank + 1;
                }
            });
            //Get updated xp
            _this.pcCreateService.getPcXp(_this.newPc.id)
                .then(function (res) { return _this.newPc.xp = res.xp; })
                .catch(function () { return console.log("Error getting updated XP"); });
        });
    };
    PcCreateComponent.prototype.increaseAttribute = function (attribute) {
        var _this = this;
        this.pcCreateService.increaseAttribute(this.newPc.id, attribute)
            .then(function () {
            switch (attribute) {
                case 'agility':
                    _this.newPc.agility++;
                    break;
                case 'brawn':
                    _this.newPc.brawn++;
                    break;
                case 'cunning':
                    _this.newPc.cunning++;
                    break;
                case 'intellect':
                    _this.newPc.intellect++;
                    break;
                case 'presence':
                    _this.newPc.presence++;
                    break;
                case 'willpower':
                    _this.newPc.willpower++;
                    break;
                default:
                    break;
            }
            //get updated xp
            _this.pcCreateService.getPcXp(_this.newPc.id)
                .then(function (res) { return _this.newPc.xp = res.xp; })
                .catch(function () { return console.log("Error getting updated XP"); });
        })
            .catch(function () { return console.log("Error increasing attribute"); });
    };
    //Move to stage 2 of Pc creation
    PcCreateComponent.prototype.pcStage2 = function () {
        var _this = this;
        //Create a new Pc and save the base Pc to work with
        this.pcCreateService.createNewPc(this.character.name, this.character.race_id, this.character.career_id)
            .then(function (res) {
            //Pc created on server.  Save the PC for further updating
            _this.newPc = res;
            console.log(res);
            _this.newPcCareerSkills = [];
            _this.newPcCareerSpecializationSkills = [];
            //Save Career Skills for skill setup
            _this.newPc.skills.forEach(function (skill) {
                if (skill.career)
                    _this.newPcCareerSkills.push(skill);
            });
            //Assign initial specialization.  Use no XP (false)
            _this.pcCreateService.addNewPcSpecialization(_this.newPc.id, _this.character.spec_id, false)
                .then(function () {
                //Get the specializaion skills available and save for view
                _this.pcCreateService.getCareerSpecializationSkills(_this.character.spec_id)
                    .then(function (res) { return _this.newPcCareerSpecializationSkills = res; })
                    .catch(function (res) { return console.log(res); });
                _this.pcCreateStage = 'pcStage2';
            });
        })
            .catch(function (res) { return console.log(res); });
    };
    PcCreateComponent.prototype.pcStage3 = function () {
        //Time to use initial XP
        this.pcCreateStage = 'pcStage3';
    };
    PcCreateComponent.prototype.pcFinalize = function () {
        var _this = this;
        //Finalize the PC.  Set status to 'active'
        this.pcCreateService.finalizeNewPc(this.newPc.id)
            .then(function () {
            //Navigate back to PC select
            _this.router.navigateByUrl('/player');
        });
    };
    PcCreateComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'pc-create',
            templateUrl: 'pc-create.component.html',
            styleUrls: ['pc-create.component.css']
        }), 
        __metadata('design:paramtypes', [pc_create_service_1.PcCreateService, router_1.Router])
    ], PcCreateComponent);
    return PcCreateComponent;
}());
exports.PcCreateComponent = PcCreateComponent;
//# sourceMappingURL=pc-create.component.js.map