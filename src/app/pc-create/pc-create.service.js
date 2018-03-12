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
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
require('rxjs/add/operator/toPromise');
var server_url_service_1 = require('../../services/server-url.service');
var PcCreateService = (function () {
    function PcCreateService(http, serverUrl) {
        this.http = http;
        this.serverUrl = serverUrl;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.authHeader = new http_1.Headers();
        this.authHeader.append('Authorization', " " + this.currentUser.token);
        //Get the races on 
        this.getRaces();
    }
    ;
    PcCreateService.prototype.getRaces = function () {
        var _this = this;
        return this.http.get(this.serverUrl.baseUrl + '/race/index.json', { headers: this.authHeader })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(function (res) { return _this.handleError; });
    };
    PcCreateService.prototype.getCareers = function () {
        var _this = this;
        return this.http.get(this.serverUrl.baseUrl + '/career/index.json', { headers: this.authHeader })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(function (res) { return _this.handleError; });
    };
    //Gets a list of all the specializations for the careerr
    PcCreateService.prototype.getCareerSpecializations = function (id) {
        var _this = this;
        return this.http.get(this.serverUrl.baseUrl + '/career/get-career-specializations/' + id + ".json", { headers: this.authHeader })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(function (res) { return _this.handleError; });
    };
    //Gets a list of all the skills for the specialization
    PcCreateService.prototype.getCareerSpecializationSkills = function (id) {
        var _this = this;
        return this.http.get(this.serverUrl.baseUrl + '/career/get-career-specialization-skills/' + id + ".json", { headers: this.authHeader })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(function (res) { return _this.handleError; });
    };
    //Gets a list of all the skills
    PcCreateService.prototype.getSkills = function (id) {
        var _this = this;
        return this.http.post(this.serverUrl.baseUrl + '/player/get-pc-skills.json', { id: id, headers: this.authHeader })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(function (res) { return _this.handleError; });
    };
    //Gets the pc xp
    PcCreateService.prototype.getPcXp = function (id) {
        var _this = this;
        return this.http.get(this.serverUrl.baseUrl + '/player/get-pc-xp/' + id + ".json", { headers: this.authHeader })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(function (res) { return _this.handleError; });
    };
    PcCreateService.prototype.createNewPc = function (name, race_id, career_id) {
        var _this = this;
        return this.http.post(this.serverUrl.baseUrl + '/player/pc-create.json', { pc: { user_id: this.currentUser.id, name: name, race_id: race_id, career_id: career_id } }, { headers: this.authHeader })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(function (res) { return _this.handleError; });
    };
    PcCreateService.prototype.addNewPcSpecialization = function (pc_id, spec_id, use_xp) {
        var _this = this;
        return this.http.post(this.serverUrl.baseUrl + '/player/set-specialization.json', { id: pc_id, spec_id: spec_id, use_xp: use_xp }, { headers: this.authHeader })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(function (res) { return _this.handleError; });
    };
    PcCreateService.prototype.increaseSkillRank = function (pcId, skillId, useXp) {
        var _this = this;
        return this.http.post(this.serverUrl.baseUrl + '/player/increase-skill-rank.json', { id: pcId, skill_id: skillId, use_xp: useXp }, { headers: this.authHeader })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(function (res) { return _this.handleError; });
    };
    PcCreateService.prototype.increaseAttribute = function (pcId, attribute) {
        var _this = this;
        return this.http.post(this.serverUrl.baseUrl + '/player/increase-attribute.json', { id: pcId, attribute: attribute }, { headers: this.authHeader })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(function (res) { return _this.handleError; });
    };
    PcCreateService.prototype.finalizeNewPc = function (pcId) {
        var _this = this;
        return this.http.post(this.serverUrl.baseUrl + '/player/finalize-pc.json', { id: pcId }, { headers: this.authHeader })
            .toPromise()
            .then()
            .catch(function (res) { return _this.handleError; });
    };
    PcCreateService.prototype.handleError = function (error) {
        //console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    PcCreateService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, server_url_service_1.ServerUrlService])
    ], PcCreateService);
    return PcCreateService;
}());
exports.PcCreateService = PcCreateService;
//# sourceMappingURL=pc-create.service.js.map