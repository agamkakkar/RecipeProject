import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: []
})
export class HeaderComponent implements OnInit,OnDestroy{
  authObsSubs: Subscription;
  isLoggedIn = false;
  constructor(private dataStoreService: DataStorageService,private authService: AuthService){}

  ngOnInit(): void {
    this.authObsSubs = this.authService.user.subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }

  onSaveData(){
    this.dataStoreService.storeRecipes();
  }

  onFetchData(){
    this.dataStoreService.fetchRecipes().subscribe();
  }

  ngOnDestroy(){
    this.authObsSubs.unsubscribe();
  }
  onLogout(){
   this.authService.logout();
  }
}
