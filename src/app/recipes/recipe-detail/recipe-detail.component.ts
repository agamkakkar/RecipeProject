import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id:number;
  constructor(private shoppingListService: ShoppingListService,
    private route: ActivatedRoute,private recipeServie: RecipeService,
    private router: Router) { }

  ngOnInit(): void {


    this.route.params.subscribe(
      (params: Params) =>{
        this.id = params['id'];
        this.recipe = this.recipeServie.getRecipeById(this.id);
      }
    );
  }
  addToShoppingList(){
    this.shoppingListService.addIngredients(this.recipe.ingredients);

  }

  onDeleteRecipe(){
    this.recipeServie.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
