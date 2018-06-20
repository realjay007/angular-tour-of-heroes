import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";

import { Hero } from "../hero";
import { HEROES } from "../mock-heroes";
import { HeroService } from "../hero.service";

@Component({
	selector: 'app-hero-detail',
	templateUrl: './hero-detail.component.html',
	styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

	@Input() hero: Hero;

	constructor(
		private route: ActivatedRoute,
		private heroService: HeroService,
		private location: Location,
		private router: Router
	) { }

	ngOnInit() {
		this.getHero();
	}

	getHero(): void {
		const id = Number(this.route.snapshot.paramMap.get("id"));
		this.heroService.getHero(id)
		.subscribe(hero => this.hero = hero);
	}

	randomHero() {
		let randHero = HEROES[Math.floor(Math.random()*HEROES.length)];
		this.router.navigate(["/detail", randHero.id]);
		this.hero = randHero;
		//this.router.navigate(["/dashboard"]);
	}

	goBack(): void {
		this.location.back();
	}

}
