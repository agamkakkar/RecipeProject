import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { map ,tap} from 'rxjs/operators';

@Injectable({providedIn:'root'})
export class DataStorageService{
    constructor(private http: HttpClient,private recipeService: RecipeService){}

    storeRecipes(){
      let recipes= this.recipeService.getRecipes();
      this.http.put('https://recipe-book-5fc3f-default-rtdb.firebaseio.com/recipes.json',recipes,{
        observe:'response'
      }).
      subscribe(response => {
        console.log(response.status);
      })
    }

    fetchRecipes(){

       return this.http.get<Recipe[]>('https://recipe-book-5fc3f-default-rtdb.firebaseio.com/recipes.json').pipe(
          map(recipes => {
            return recipes.map(recipe => {
              return {...recipe,ingredients: recipe.ingredients ? recipe.ingredients : []};
            })
          }),tap(recipes => {
            this.recipeService.setRecipes(recipes);
          })
        )

    }
}
