import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { AuthService } from "../auth/auth.service";
import { dataStorageService } from "../shared/data-storage.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
    collapsed = true;
    isAuthenticated = false;
    private userSubscription: Subscription;

    constructor (
        private dataStorageService: dataStorageService,
        private authService: AuthService
    ) {}

    ngOnInit () {
        this.userSubscription = this.authService.user.subscribe(user => {
            this.isAuthenticated = !!user;
        });
    }

    onSaveData() {
        this.dataStorageService.storeRecipes();
    }

    onFecthData() {
        this.dataStorageService.fetchRecipes().subscribe();
    }

    onLogout() {
        this.authService.logout();
    }

    ngOnDestroy () {
        this.userSubscription.unsubscribe();
    }

}