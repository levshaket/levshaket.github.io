$(document).ready(function(){
	//Function to append dreidel octets to container
	var append_octet = function(n){
		var d = document.createElement("DIV");
		d.setAttribute("id", "dreidel-octet-"+String(n));
		d.setAttribute("name", "dreidel-octet");
		d.setAttribute("class", "flex-container");
		for (var i=0; i<8; i++) {
			d.innerHTML+=`<div class="stage scale">
							<div name="dreidel-"+String(i) class="pyramid3d" style="transform: rotateX(75deg) rotate(45deg) scale(1)">
								<div class="square side1"></div>
								<div class="square side2">נ</div>
								<div class="square side3">ה</div>
								<div class="square side4">ג</div>
								<div class="square side5">ש</div>
								<div class="square small side1"></div>
								<div class="rect side2"></div>
								<div class="rect side3"></div>
								<div class="rect side4"></div>
								<div class="rect side5"></div>
								<div class="triangle side2"></div>
								<div class="triangle side3"></div>
								<div class="triangle side4"></div>
								<div class="triangle side5"></div>
							</div>
						</div>`;
		};
		$("#dreidel-octet-container")[0].appendChild(d);
	};
	//Populate display of dreidels
	var n = Number($("#slider")[0].value);
	for (var j=0; j<n; j++){
		append_octet(j);
	};
	//Slider Listener: modifying number of dreidel-octets displayed
	$("#slider")[0].addEventListener("input",function(){
		var n = Number(this.value);
		var d8c = $("#dreidel-octet-container")[0]
		var k = d8c.children.length;
		if (n > k) {
			for (var j=0; j<n-k; j++) {
				append_octet(k+j);					
			};
		} else {
			for (var j=0; j<k-n; j++) {
				d8c.removeChild(d8c.children[k-j-1]);
			};
			$.rotate3d($('.pyramid3d'), 75, 45, 1);
		};		
	});
});




