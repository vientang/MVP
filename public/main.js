var update = document.getElementById('update');

update.addEventListener('click', function() {
	fetch('mealideas', {
		method: 'PUT',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			'name': 'American',
			'idea': 'Hamburgers'
		})
	})
	.then(function(res) {
		if (res.ok) return res.json();
	})
	.then(function(data) {
		console.log(data);
		window.location.reload(true);
	})
})