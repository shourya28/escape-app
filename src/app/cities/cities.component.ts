import { Component, OnInit } from '@angular/core';
import cityData from '../cities.json';
import { City } from '../shared/cities.model';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {

  constructor() { }

  citiesData = Object.entries(cityData).map(([key,value])=>{
    return value;
  });

  ngOnInit(): void {
  }

}
