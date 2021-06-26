import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {
  recipes: Recipe[] ;
  recipeChangeSubs: Subscription;
 // @Output() recipeSelected = new EventEmitter<Recipe>();
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.recipeChangeSubs = this.recipeService.recipesUpdated.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );

  }

  ngOnDestroy(){
    this.recipeChangeSubs.unsubscribe;
  }


}
