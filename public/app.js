$('#foodFinder').submit(function() {
	$.get('http://127.0.0.1:3000', {}, function(data) {
		JSON.parse(data).forEach(function(i) {
			$('.mealideas').append('<span>' + i + '</span>');
			
		})
	})
})