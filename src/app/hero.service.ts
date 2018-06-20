import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

import { Hero } from "./hero";
import { MessageService } from "./message.service";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
	providedIn: 'root'
})
export class HeroService {

	private heroesUrl = "api/heroes";

	constructor(
		private http: HttpClient,
		private messageService: MessageService
	) { }

	getHeroes(): Observable<Hero[]> {
		// return of(HEROES);
		return this.http.get<Hero[]>(this.heroesUrl).pipe(
			tap(() => this.log("fetched heroes")),
			catchError(this.handleError("getHeroes", []))
		);
	}

	getHero(id: number): Observable<Hero> {
		// TODO: send the message _after_ fetching the hero
		const url = `${this.heroesUrl}/${id}`;
		return this.http.get<Hero>(url).pipe(
			tap(() => this.log(`fetched hero id=${id}`)),
			catchError(this.handleError<Hero>(`getHero id=${id}`))
		);
	}

	/** PUT: update the hero on the server */
	updateHero(hero: Hero): Observable<any> {
		return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
			tap(() => this.log(`updated hero id=${hero.id}`)),
			catchError(this.handleError<any>("updateHero"))
		);
	}

	/** Log a HeroService message with the MessageService */
	private log(message: string) {
		this.messageService.add("HeroService: "+message);
	}

	/**
	 * Handle Http operation that failed
	 * Let the app continue
	 * @param operation - name of the operation that failed
	 * @param result - Optional value to return as the observable result
	 */
	private handleError<T>(operation: string = "operation", result?: T) {
		return (error: any): Observable<T> => {
			// TODO: send the error to remote logging infrastructure
			console.error(error); // Log to console instead

			// TODO: better job of transforming error for user consumption
			this.log(`${operation} failed: ${error.message}`);

			// Let the app keep running by returning an empty result
			return of(result as T);
		}
	}

}
