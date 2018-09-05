import {Component, ViewChild} from '@angular/core';
import {MatIconRegistry, MatSidenav} from '@angular/material';
import {
	H21HotelSearchResultComponent,
	IHotelSearchOptions,
	INotifyItem,
	ISidebarNavTab,
} from 'h21-be-ui-kit';
import { PermissionService } from 'h21-be-ui-kit';
import { AuthData } from '../../dto/auth-data';
import { IMarker } from "../../dto/map/i-marker";
import {Router} from "@angular/router";

const SIDEBAR_NAV_TABS: Array<ISidebarNavTab> = [
	{name: 'search', label: 'Search', icon: 'search', type: 'button', url: null, disabled: false},
	{name: 'filter', label: 'Filter', icon: 'filter_list', type: 'button', url: null, disabled: true},
	{name: 'history', label: 'History', icon: 'history', type: 'button', url: null, disabled: false},
	{name: 'hotel_book', label: 'Hotel book', icon: 'domain', type: 'button', url: null, disabled: false},
];

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

	constructor(permissionService: PermissionService,
				private _router: Router) {
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
	sidenavOpened: boolean = false;
	searchResultVisibility: boolean = false;
	searchResultViewMode: string = 'list';
	sidebarNavDisabled: boolean = true;
	sidebarNavTabs: Array<ISidebarNavTab> = SIDEBAR_NAV_TABS;

	leftSidenavToggle(): void {

		if (this._router.url.indexOf('hotel_book') >= 0) {
			return;
		}

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

	sidebarNavAction(tab: ISidebarNavTab): void {
		if (tab.name == 'hotel_book') {
			if (this.searchResult) {
				this.clearSearch();
			}
			this.sidebarNavDisabled = true;
			this.sidenavOpened = false;
			window.open('./hotel_book');
			return;
		}
		if (!this.leftSidenav.opened) {
			this.leftSidenavToggle();
		}
		this.activeLeftSidenavPanel = tab.name;
	}

	search(options: IHotelSearchOptions): void {
		this.searchResultVisibility = true;
		this.sidebarNavTabs.find((item) => { return item.name == 'filter'; }).disabled = false;
		setTimeout(() => {
			this.searchResult.search(options);
		}, 0);
	}

	clearSearch(): void {
		this.searchResultVisibility = false;
		this.sidebarNavTabs.find((item) => { return item.name == 'filter'; }).disabled = true;
		this.searchResult.clear();
	}

	changeResultViewMode(mode: string): void {
		this.searchResultViewMode = mode;
	}
}
