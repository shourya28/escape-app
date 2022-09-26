import { Component, OnInit } from '@angular/core';
import { CityService } from '../shared/cities.service';
import { City } from '../shared/cities.model';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-city-search-mat',
  templateUrl: './city-search-mat.component.html',
  styleUrls: ['./city-search-mat.component.css']
})
export class CitySearchMatComponent implements OnInit {
  cities: City[] = []
  constructor(private CityService: CityService) { }
  searchParam = '';
  selectedCity = '';
  serverString = [];

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

  getSelectedCity(event: MatAutocompleteSelectedEvent) {
    const searchParam = event.option.value
    this.CityService.getPath(searchParam)
      .subscribe(result => {
        this.serverString = Object.entries(result).map(([k,v])=>{return v;})
        console.log(this.serverString)
      })
  }

  prettyContinentName(name) {
    var names = {
      'asia': "Asia",
      'north-america': "North America",
      "south-america": "South America",
      "oceania": "Oceania",
      "africa": "Africa",
      "europe": "Europe"
    }
    return names[name]
  }
}
