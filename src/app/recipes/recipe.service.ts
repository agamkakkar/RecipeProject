import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";

export class RecipeService{
    //recipeSelected = new EventEmitter<Recipe>();
    recipesUpdated = new Subject<Recipe[]>();
    // private recipes: Recipe[] = [
    //     new Recipe('A Test Recipe',
    //     'This is test Recipe',
    //     'https://img.buzzfeed.com/video-api-prod/assets/b8aa343d3bda43d883ed81757d38013d/BFV9267_PizzaBombs_FBthumb.jpg?output-format=auto&output-quality=auto',
    //     [
    //       new Ingredient('Apples' ,12),
    //       new Ingredient('Eggs', 20)
    //     ]),
    //     new Recipe('A Test Recipe 2','This is test Recipe 2',
    //     'https://img.buzzfeed.com/video-api-prod/assets/b8aa343d3bda43d883ed81757d38013d/BFV9267_PizzaBombs_FBthumb.jpg?output-format=auto&output-quality=auto',
    //     [
    //       new Ingredient('Bananas' ,22),
    //       new Ingredient('Meat', 20)
    //     ])
    //   ]

    private recipes : Recipe[] = [];
      getRecipes(){
        return [...this.recipes];
      }

      getRecipeById(id:number){
        return this.recipes[id];
      }

      addRecipe(newRecipe: Recipe){
        this.recipes.push(newRecipe);
        this.recipesUpdated.next([...this.recipes]);
      }

      updateRecipe(index: number,recipe: Recipe){
        this.recipes[index] = recipe;
        this.recipesUpdated.next([...this.recipes]);
      }

      deleteRecipe(index: number){
        this.recipes.splice(index,1);
        this.recipesUpdated.next([...this.recipes]);
      }

      setRecipes(recipes: Recipe []){
        this.recipes= recipes;
        this.recipesUpdated.next([...recipes]);
      }
}
