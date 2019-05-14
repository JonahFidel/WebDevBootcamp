// Check off specific todos by clicking
// when an li is clicked inside of this ul, run the code (this makes the dynamically added elements work)
$('ul').on("click", "li", function(){
	$(this).toggleClass('completed');
});

// Click on X to delete Todo
$('ul').on("click", "span", function(event){
	$(this).parent().fadeOut(500, function(){
		// this this now refers to the li, not the span
		$(this).remove();
	});	
	// stops event from bubbling up
	event.stopPropagation();
});

// add event to todolist when user hits enter
$("input[type='text']").keypress(function(event) {
	if(event.which ===13){
		//grabbing new todo text from input
		var todoText = $(this).val();

		//clear the input box
		$(this).val("");

		// create a new li and add to ul
		$('ul').append("<li><span><i class='fa fa-trash'></i></span> " + todoText + "</li>")
	}
});

$("#toggle-form").click(function(){
	$("input[type='text']").fadeToggle();
});