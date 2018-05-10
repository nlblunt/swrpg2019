import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

import { Item } from "../models/item";

import { GmService } from "../gm.service";

@Component({
  selector: "app-dlg-add-item",
  templateUrl: "./dlg-add-item.component.html",
  styleUrls: ["./dlg-add-item.component.css"]
})
export class DlgAddItemComponent implements OnInit {
  allItems: Item[]; //All Items
  createdItems: Item[]; //Non template, created Items
  templateItems: Item[]; //Template Items
  shownItems: Item[]; //What are we showing?  Chosen by user

  constructor(
    private gmService: GmService,
    public dialogRef: MatDialogRef<DlgAddItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    //Save all itmes to local
    this.allItems = this.gmService.allItems;
    this.templateItems = [];
    this.createdItems = [];

    //Sort items
    this.allItems.forEach(item => {
      if (item.template == true) {
        this.templateItems.push(item);
      } else {
        this.createdItems.push(item);
      }
    });

    //Show all items by default
    this.shownItems = this.templateItems;
  }

  changeItemView(view) {
    switch (view) {
      case "all":
        this.shownItems = this.allItems;
        break;

      case "template":
        this.shownItems = this.templateItems;
        break;

      case "created":
        this.shownItems = this.createdItems;
        break;
      default:
        break;
    }
  }

  //Adds the item to the PC
  addItem(item) {
    this.gmService.addItemToPc(item, this.data.id).subscribe(
      res => {
        //Update the master list of items
        this.gmService.getAllItems();

        //Add the returned item to the pc
        this.data.items.push(res.json());

        //Close the dialog
        this.dialogRef.close();
      },
      error => console.log("Error")
    );
  }

  //Close the dialog
  onNoClick() {
    this.dialogRef.close();
  }
}
