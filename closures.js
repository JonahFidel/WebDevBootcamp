// Closure 
	// a function that makes use of variables defined in outer functions that have previously returned 

function outer(){
    var data = "closures are ";
    return function inner(){
        var innerData = "awesome";
        return data + innerData;
    }
}


function outer(a){
	return function inner(b){
		return a + b;
	}
}

outer(5)(5); // 10

var storeOuter = outer(5)
storeOuter(10) //15
