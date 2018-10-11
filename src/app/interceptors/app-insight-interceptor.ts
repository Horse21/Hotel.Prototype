import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AppInsightsService } from '@markpieszak/ng-application-insights';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AppInsightInterceptor implements HttpInterceptor {
	
	constructor(private appInsightsService: AppInsightsService) {
	}
	
	public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		this.appInsightsService.trackEvent(req.url, req.body);
		
		return next.handle(req);
	}
}