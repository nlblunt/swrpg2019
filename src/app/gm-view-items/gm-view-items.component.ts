import { Component, OnInit } from '@angular/core';
import { Item } from '../models/item';
import { GmService } from '../gm.service';
@Component({
  selector: 'app-gm-view-items',
  templateUrl: './gm-view-items.component.html',
  styleUrls: ['./gm-view-items.component.css']
})
export class GmViewItemsComponent implements OnInit {

  loading: Boolean = false;  //Do we display the loading progress bar?
  allItems: Item[];
  item: Item;
  new: boolean = false;  //Are we creating a new weapon
  edit: boolean = true;  //Start in edit mode

  constructor(private gmService: GmService) { }

  ngOnInit() {
    //Assign all weapons from gmService to local variable.  If there is at least 1 weapon, set first element to weapon.
    this.item = new Item;
    this.allItems = this.gmService.allItems;
    if (this.allItems.length > 0) this.item = this.allItems[0];
    console.log(this.item);
  }

  createNewItem() {
    //Setup a new weapon to create
    this.edit = false;
    this.new = true;
    this.item = new Item;
  }

  saveNewItem() {
    //Save the new weapon
    this.loading = true;

    this.gmService.addNewItem(this.item).subscribe(
      res => { //If successful, get a new list of weapons from the server
        this.gmService.getAllItems()
          .then(
            res => {
              //Save the list of weapons from the server to local
              this.allItems = this.gmService.allItems;

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

  deleteItem() {
    this.loading = true;
    this.gmService.deleteItem(this.item).subscribe(
      res => { //If successful, get a new list of weapons from the server
        this.gmService.getAllItems()
          .then(
            res => {
              //Empty out the weapon we are deleting
              this.item = null;
              //Save the list of weapons from the server to local
              this.allItems = this.gmService.allItems;

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

  updateItem() {
    this.loading = true;

    this.gmService.editItem(this.item).subscribe(
      res => {
        this.gmService.getAllItems()
          .then(
            res => {
              this.allItems = this.gmService.allItems;

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

  setItem(Item) {
    //Set the weapon to edit
    this.new = false;
    this.edit = true;

    this.item = Item;
  }
}