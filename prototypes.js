// Create a constructor function for a Vehicle: every object created from this constructor should have a make, model, and year property.
// Each object should also have a property called isRunning, which should be set to false.

// Every object created from the Vehicle constructor should have a function called turnOn, which changes the isRunning property to true.

// Every object created from the Vehicle constructor should also have a function called turnOff... 

// Every object created from the Vehicle constructor should have a method called honk which returns the sttring "beep" ONLY if the property is true.

// without prototype
function Vehicle(make, model, year){
	this.make = make;
	this.model = model;
	this.year = year;
	this.isRunning = false;
	this.turnOn = function(){
		this.isRunning = true;
	}
	this.turnOff = function(){
		this.isRunning = false;
	}
	this.honk = function(){
		if(this.isRunning){
			return "beep!";
		}
	}
}

// NOTE: To Share properties and methods for objects created by a constructor function, place them in the prototype --- this is the most efficient implementation
// with prototype
function Vehicle(make, model, year){
	this.make = make;
	this.model = model;
	this.year = year;
	this.isRunning = false;
}

Vehicle.prototype.turnOn = function(){
	this.isRunning = true;
}
Vehicle.prototype.turnOff = function(){
	this.isRunning = false;
}
Vehicle.prototype.honk = function(){
	if(this.isRunning){
		return "beep";
	}
}