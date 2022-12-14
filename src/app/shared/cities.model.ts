// "BBA": {
//   "id": "BBA",
//   "name": "Balmaceda",
//   "location": { "lat": -45.909431, "lon": -71.69762 },
//   "countryName": "Chile",
//   "iata": "BBA",
//   "rank": 93,
//   "countryId": "CL",
//   "dest": null,
//   "airports": ["BBA"],
//   "images": ["4.jpg", "5.jpg"],
//   "popularity": 5.00001,
//   "regId": "southern-america",
//   "contId": "south-america",
//   "subId": null,
//   "terId": null,
//   "con": 5

export interface City {
  id: String
  name: String,
  location: { lat: String, lon: String },
  countryName: String,
  iata: String,
  rank: Number,
  countryId: String,
  dest: String,
  airports: [String],
  images: [String],
  popularity: Number,
  regId: String,
  contId: String,
  subId: String,
  terId: String,
  con: Number,
}
