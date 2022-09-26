import { Component, OnInit } from '@angular/core';
import { CityService } from '../shared/cities.service';
import { City } from '../shared/cities.model';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.css']
})
export class CitySearchComponent implements OnInit {

  cities: City[] = []
  constructor(private CityService: CityService) { }
  searchParam = '';

  ngOnInit(): void {
    this.getListOfCities();
  }

  getListOfCities() {
    this.CityService.getAllCities()
      .subscribe(result=>{
        this.cities = result as City[]
      })
  }

  getSomeCities(event: Event) {
    const searchParam = (<HTMLInputElement>event.target).value.toUpperCase();
    this.CityService.getMatchingCities(searchParam)
    .subscribe(result=>{
        this.cities = result as City[]
      })
  }

  getSelectedCity(event: Event) {
    const selectedCity = event.target
    console.log(selectedCity)
  }
}
