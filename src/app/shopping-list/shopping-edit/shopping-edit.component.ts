import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
 //@ViewChild('nameInput',{static:false}) name :ElementRef;
 //@ViewChild('amountInput',{static:false}) amount :ElementRef;

 //@Output() onAddEventEmit = new EventEmitter<Ingredient>();
 editMode = false;
 editedItemIndex: number;
 subscription : Subscription;
 selectedIngredient : Ingredient;
 @ViewChild('f',{static:true}) form : NgForm;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription  = this.shoppingListService.onShoppingListItemClicked.subscribe((
     id: number
   ) => {
      this.editMode = true;
      this.editedItemIndex= id;
      this.selectedIngredient = this.shoppingListService.getIngredientByIndex(id);
      this.form.setValue({
        name: this.selectedIngredient.name,
        amount: this.selectedIngredient.amount
      });
    });
  }
  onAddItem(form: NgForm){
    //this.shoppingListService.addIngredient(new Ingredient(this.name.nativeElement.value,this.amount.nativeElement.value,));
    const newIngrd =new Ingredient(form.value.name,form.value.amount);
    if(!this.editMode){
      this.shoppingListService.addIngredient(newIngrd);
    }
    else{
      this.shoppingListService.updateIngredient(this.editedItemIndex,newIngrd);
    }
    this.editMode = false;
    form.reset();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onClearForm(){
    this.editMode = false;
    this.form.reset();
  }

  onDeleteIngredient(){
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.form.reset();
    this.editMode=false;
  }
}
