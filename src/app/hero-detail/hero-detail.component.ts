import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";

import { Hero } from "../hero";
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
	) {
		this.router.routeReuseStrategy.shouldReuseRoute = function() {
			return false;
		};
	}

	ngOnInit() {
		this.getHero();
	}

	getHero(): void {
		const id = Number(this.route.snapshot.paramMap.get("id"));
		this.heroService.getHero(id)
		.subscribe(hero => this.hero = hero);
	}

	save(): void {
		this.heroService.updateHero(this.hero)
		.subscribe(() => this.goBack());
	}

	randomHero() {
		var randId = () => {
			let min = 11, max = 21;
			return Math.floor(Math.random() * (max - min) ) + min;
		}
		/* this.heroService.getHero(randId())
		.subscribe((hero) => {
			
		}); */
		this.router.navigate(["/detail", randId()])
		
		//this.router.navigate(["/dashboard"]);
	}

	goBack(): void {
		this.location.back();

	}

}
