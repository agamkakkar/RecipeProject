import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeEditForm : FormGroup ;
  ingredients = new FormArray([]);
  constructor(private route: ActivatedRoute,private recipeService: RecipeService
    ,private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        console.log(this.editMode);
        this.initForm();
      }
    );
  }

 private initForm(){
    let recipeName ='';
    let recipeImagePath ='';
    let recipeDescription ='';
    if(this.editMode){
      const recipe = this.recipeService.getRecipeById(this.id);
      recipeName=recipe.name;
      recipeImagePath=recipe.imagePath;
      recipeDescription = recipe.description;
      if(recipe.ingredients != null){
        for(let ingredient of recipe.ingredients){
          this.ingredients.push(new FormGroup({
            'name': new FormControl(ingredient.name,Validators.required),
            'amount': new FormControl(ingredient.amount,[Validators.required,Validators.min(1)])
          }));
        }
      }

    }
    this.recipeEditForm = new FormGroup({
      'recipeName' : new FormControl(recipeName,Validators.required),
      'recipeImagePath' : new FormControl(recipeImagePath,Validators.required),
      'recipeDescription': new FormControl(recipeDescription,Validators.required),
      'recipeIngredients': this.ingredients
    });

  }
  onFormSubmit(){
    const newRecipe = new Recipe(
      this.recipeEditForm.value['recipeName'],
      this.recipeEditForm.value['recipeDescription'],
      this.recipeEditForm.value['recipeImagePath'],
      this.recipeEditForm.value['recipeIngredients']
    );
    if(this.editMode){
        this.recipeService.updateRecipe(this.id,newRecipe);
    }
    else{
      this.recipeService.addRecipe(newRecipe);
    }
    this.onCancel();
  }

  get controls(){
    return ((<FormArray>this.recipeEditForm.get('recipeIngredients')).controls);
  }

  onAddIngredients(){
    (<FormArray>this.recipeEditForm.get('recipeIngredients')).push(
      new FormGroup({
        'name': new FormControl(null,Validators.required),
        'amount': new FormControl(null,[Validators.required,Validators.min(1)])
      })
    );
  }

  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route});
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeEditForm.get('recipeIngredients')).removeAt(index);
  }
}
