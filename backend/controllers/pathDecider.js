const City = require('../db')

const neighbourContinentsTemplate = {
    'asia': ["europe", "africa", "oceania"],
    'europe': ["north-america", "africa", "asia"],
    'north-america': ["south-america", "europe", "asia"],
    'south-america': ["north-america", "africa", "oceania"],
    'africa': ["north-america", "south-america", "europe", "asia"],
    'oceania': ["north-america", "south-america", "asia"],
}

exports.findShortestPath = async (startCity) => {
    const citiesVisited = [startCity];
    var totalDistance = 0;
    const continentsVisited = [startCity.contId]
    //First 6 cities visited
    while (continentsVisited.length != 6) {
        var cityReturned = await findClosestCitiesInRange(startCity, continentsVisited)
        totalDistance = totalDistance + cityReturned.distance;
        await City.find({ 'id': cityReturned.cityId })
            .then(city => {
                continentsVisited.push(city[0].contId)
                citiesVisited.push(city[0]);
                startCity = city[0];
            })

    }
    //Last city is the city of orgin
    citiesVisited.push(citiesVisited[0])
    totalDistance = totalDistance + getDistanceFromLatLonInKm(citiesVisited[6].location, citiesVisited[5].location)
    return { citiesVisited, totalDistance }
}

async function findClosestCitiesInRange(startCity, continentsVisited) {
    const neighbourContinents = JSON.parse(JSON.stringify(neighbourContinentsTemplate))
    continentsNearby = neighbourContinents[startCity.contId];
    //Remove continent which have already been visited from search
    continentsVisited.forEach(element => {
        let toBeRemovedIndex = continentsNearby.indexOf(element);
        //If found delete that continent from MongoDB search array
        if (toBeRemovedIndex > -1) continentsNearby.splice(toBeRemovedIndex, 1)
    })

    //Creating Array of Distance to be sorted
    distanceToCities = []
    //Finding all cities in continents Nearby
    await City.find({ 'contId': { $in: continentsNearby } })
        .then(result => {
            result.forEach(city => {
                distanceToCities.push({
                    cityId: city.id,
                    distance: getDistanceFromLatLonInKm(city.location, startCity.location)
                })
            })
            distanceToCities.sort((a, b) => {
                if (a.distance > b.distance) return 1;
                else if (a.distance < b.distance) return -1;
                return 0;
            })
        })
    return distanceToCities[0];
}

//Getting Distance from Location objects
function getDistanceFromLatLonInKm(location1, location2) {
    const lat1 = location1.lat;
    const lat2 = location2.lat;
    const lon1 = location1.lon;
    const lon2 = location2.lon;

    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}
