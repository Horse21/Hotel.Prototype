import {Component, ViewChild} from '@angular/core';
import {MatIconRegistry, MatSidenav} from '@angular/material';
import {
	H21HotelSearchResultComponent,
	INotifyItem,
	ISearchHotelOptions,
	ISidebarNavTab
} from 'h21-be-ui-kit';
import { PermissionService } from 'h21-be-ui-kit';
import { AuthData } from '../../dto/auth-data';
import { IMarker } from "../../dto/map/i-marker";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  viewProviders: [MatIconRegistry],
})
export class AppComponent {

	title = 'prototype';
	username: string;
	private permissionService: PermissionService;

	markers: IMarker[] = [
		{position: {lat:55.6, lng: 37.3}, title: '1'},
		{position: {lat:55.5, lng: 37.4}, title: '2'},
		{position: {lat:55.4, lng: 37.5}, title: '3'}];

	constructor(permissionService: PermissionService) {
		this.permissionService = permissionService;
		if(this.permissionService.isAuth()) {
			this.username = this.permissionService.getUsername();
		}
	}

	prototypeAuth(data: any): void {
		var authData: AuthData = <AuthData> {
			name: data.name,
			roles: data.roles,
			claims: data.claims
		};
		localStorage.setItem("authData", JSON.stringify(authData));
		location.reload();
	}

	logout(): void {
		localStorage.setItem("authData", null);
		location.reload();
	}

	getNotifyList(): INotifyItem[] {
		return [
			<INotifyItem>{text: 'First notification'},
			<INotifyItem>{text: 'Second notification'}
		];
	}


	@ViewChild('leftSidenav') private leftSidenav: MatSidenav;
	@ViewChild('searchResult') private searchResult: H21HotelSearchResultComponent;

	activeLeftSidenavPanel: string = 'search';
	sidenavOpened: boolean = true;
	searchResultVisibility: boolean = false;
	searchResultViewMode: string = 'list';
	sidebarNavDisabled: boolean = false;

	leftSidenavToggle() {
		this.leftSidenav.toggle();
		if (this.leftSidenav.opened) {
			this.sidebarNavDisabled = false;
			this.searchResultViewMode = 'list';
			this.sidenavOpened = true;
		} else {
			this.sidebarNavDisabled = true;
			this.sidenavOpened = false;
		}
	}

	showSidebarPanel(tab: ISidebarNavTab): void {
		if (!this.leftSidenav.opened) {
			this.leftSidenavToggle();
		}
		this.activeLeftSidenavPanel = tab.name;
	}

	search(options: ISearchHotelOptions): void {
		this.searchResultVisibility = true;
		setTimeout(() => {
			this.searchResult.search(options);
		}, 0);
	}

	clearSearch(): void {
		this.searchResultVisibility = false;
		this.searchResult.clear();
	}

	changeResultViewMode(mode: string): void {
		this.searchResultViewMode = mode;

		if (mode == 'map') {
			this.leftSidenavToggle();
		}
	}


}
