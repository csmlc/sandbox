$(function(){

	// using jQuery
	function getCookie(name) {
	    var cookieValue = null;
	    if (document.cookie && document.cookie !== '') {
	        var cookies = document.cookie.split(';');
	        for (var i = 0; i < cookies.length; i++) {
	            var cookie = jQuery.trim(cookies[i]);
	            // Does this cookie string begin with the name we want?
	            if (cookie.substring(0, name.length + 1) === (name + '=')) {
	                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
	                break;
	            }
	        }
	    }
	    return cookieValue;
	}
	var csrftoken = getCookie('csrftoken');

	console.log(csrftoken);

	var $resources = $('#resources');
	var $name = $('#name');
	var $test = $('#test');

	$('#getResources').on('click', function(){
		
		$.ajax({
			type: 'GET',
			url: '/api/resources',
			success: function(resources) {
				$.each(resources, function(i,resource){
					$resources.append('<li>'+ resource.name +'</li>');
				});
				console.log('success', resources);
			}
		});

	});

	$('#addResources').on('click', function(){
		var resource = {
			name: $name.val(),
			test: $test.val(),
		};

		console.log(resource.name, resource.test);

		$.ajax({
			type: 'POST',
			url: '/api/resources',
			data:{
				name: $name.val(),
				test: $test.val(),
				csrfmiddlewaretoken: csrftoken
			},
			success: function(newResource) {
				$resources.append('<li>'+ newResource.name + " " +newResource.test +'</li>');

				console.log(resource);
			}
		});

	});

});

