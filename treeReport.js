class CompileYearReport {
	constructor (parkName, reportName, reportID) {
		this.parkName = parkName;
		this.reportName = reportName;
		this.reportID = Math.floor(Math.random() * 999);
	}

	addMileage(m1, m2, m3, m4){
		let totalMiles, average;
		totalMiles = m1 + m2 + m3 + m4;
		return totalMiles;
	}

	mappings() {		
		let prospectTrees, groverTress, drTrees, prospectPArea, groveArea, drArea, streets;

		const brooklyn = new Map();

		brooklyn.set('Prospect Park',{
			trees:254,
			year:1988,
			parkArea: 100,
		});

		brooklyn.set('GroverClevland Park', {
			trees:700,
			year: 1930,
			parkArea: 1021,
		});

		brooklyn.set('DR Park', {
			trees: 3000, 
			year:1960,
			parkArea: 200,
		});

		streets = {
				flatland: ['Flatland Ave',1545, 10],
				remson: ['Renson Ave', 1455, 60],
				aveU: ['Avenue U', 1744, 5],
				aveZ: ['Avenue Z', 1944, 300]
		};

		prospectTrees = brooklyn.get('Prospect Park').trees;
		groverTress = brooklyn.get('GroverClevland Park').trees;
		drTrees = brooklyn.get('DR Park').trees;
		prospectPArea = brooklyn.get('Prospect Park').parkArea;
		groveArea = brooklyn.get('GroverClevland Park').parkArea;
		drArea = brooklyn.get('DR Park').parkArea;

		return {

			prospectPark: 'Prospect Park',
			groverClev: 'GroverClevland Park',
			drPark: 'DR Park',
			prospectDensity: prospectTrees / prospectPArea,
			groveDensity: groverTress / groveArea,
			drDensity: drTrees / drArea,
			prospectYear: brooklyn.get('Prospect Park').year,
			groveYear: brooklyn.get('GroverClevland Park').year,
			drParkYear: brooklyn.get('DR Park').year,
			numOfParks: brooklyn.size,
			parks: brooklyn.entries(),
			totalLength: () => {

				let miles = this.addMileage.call(this,
					streets.flatland[2],
					streets.remson[2],
					streets.aveU[2],
					streets.aveZ[2]
					);
				return {
					miles:miles,
					streetObjLength: () => Object.values(streets)
					}
			},
			numOfStreets: () => {
				let numberOfStreets = Object.keys(streets).length;
				return numberOfStreets
			}
		}
	}

	calcDensity() {
		console.log(`${this.mappings().prospectPark} has a tree density of ${this.mappings().prospectDensity}`);
		console.log(`${this.mappings().groverClev} has a tree density of ${this.mappings().groveDensity}`);
		console.log(`${this.mappings().drPark} has a tree density of ${this.mappings().drDensity}`);
	}		

	getTreeAge() {
		let currentYear, age1, age2, age3;
		currentYear = new Date();
		return {
			parkAge1: currentYear.getFullYear() - this.mappings().prospectYear,
			parkAge2: currentYear.getFullYear() - this.mappings().groveYear,
			parkAge3: currentYear.getFullYear() - this.mappings().drParkYear
		}
	}

	printAverageAgeOfParks() {
		let averageAge, treeAge;

		averageAge = Math.floor(
			(this.getTreeAge().parkAge1 + 
			 this.getTreeAge().parkAge2 +
			  this.getTreeAge().parkAge2) /
			   this.mappings().numOfParks);
		console.log(`Our ${this.mappings().numOfParks} parks have an average age of ${averageAge} years.`);
	}

	greaterThanOneThousand() {
		for (let park of this.mappings().parks) {
			if (park[1].trees > 1000){
				console.log(`Hey guess what? ${park[0]} has over 1000 trees!`);
			}
		}
	}

	totalStreetLength() {
		let miles, average, streets;

		streets = this.mappings().numOfStreets();
		miles = this.mappings().totalLength().miles;
		average =  miles / streets;
		console.log(`Our ${streets} streets have a length of ${miles} miles and an average of ${average} miles.`);
	}

	streetClassification(sizeDefault='Normal') {
		let streetObject = this.mappings().totalLength().streetObjLength();

		streetObject.forEach((e,i,a) => {

			if (e[2] <= 10) {
				console.log(`${e[0]} is a pretty tiny street.`);
			} else if ( e[2] >= 50 && e[2] < 100 ) {
				console.log(`${e[0]} is a large street.`);
			} else if (e[2] > 100) {
				console.log(`${e[0]} is a huge street!`);
			} else {
				console.log(`${e[0]} is a pretty normal ${sizeDefault}.`);
			}
		});
	}
}

class PrintOutYearReport extends CompileYearReport {
	constructor(parkName, reportName, reportID) {
		super(reportName, reportID);

		console.log(`-----2019 PARKS REPRORT #${this.reportID}------`);
		this.printAverageAgeOfParks();
		this.calcDensity();		
		this.greaterThanOneThousand();
		

		console.log(`-----2019 STREETS REPORT #${this.reportID}------`);
		this.totalStreetLength();
		this.streetClassification();
	}

};

const prospectPark = new PrintOutYearReport('Tree_Re_2019_Report');
