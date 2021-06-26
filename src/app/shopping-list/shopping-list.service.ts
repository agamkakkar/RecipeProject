import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService{
    private ingredients: Ingredient[] =[
        new Ingredient('Apples',5),
        new Ingredient('Tomatoes',3)
      ];
      ingredientsChanged = new Subject<Ingredient[]>();
      onShoppingListItemClicked = new Subject<number>();
      getIngredients(){
          return [...this.ingredients];
      }

    addIngredient(ingred: Ingredient){
        this.ingredients.push(ingred);
        this.ingredientsChanged.next([...this.ingredients]);
    }

    addIngredients(ingred: Ingredient[]){
        this.ingredients.push(...ingred);
        this.ingredientsChanged.next([...this.ingredients]);
    }

    getIngredientByIndex(index: number){
      return this.ingredients[index];
    }

    updateIngredient(index: number,ingredient: Ingredient){
      this.ingredients[index] = ingredient;
      this.ingredientsChanged.next([...this.ingredients]);
    }

    deleteIngredient(index: number){
      this.ingredients.splice(index,1);
      this.ingredientsChanged.next([...this.ingredients]);
    }
}
