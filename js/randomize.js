$(document).ready(function(){
	//Retrieve Randomization Data (from window.crypto)
		//window.crypto serves as source of cryptographically strong (CS) integers which serve as indices to a memorable wordlist commonly found on unix systems, /usr/share/dict/american-english. The pseudo random number generator (PRNG) is seeded with sufficient entropy to provide numbers suitable for cryptographic use
	var dreidel_hebrew  ={'00':'נ' /*nun (nit, nothing)*/,'01':'ש' /*shin (shin shin put one in)*/,'10':'ה' /*hei (halb, round half up to nearest whole)*/,'11':'ג'/*gimmel (gimmel gimmel gimmel)*/};
	var dreidel_degrees = {'00':270, '01':360, '10':90 ,'11':180};
	//passphrase generation and data display
	$("#generate-passphrase").click(function(){
		//generate CS random integers on click
		var n_spins = $("#slider")[0].value;
		var integers = new Uint16Array(n_spins);
		window.crypto.getRandomValues(integers);
		var words = [];
		var binary = [];
		var hebrew = [];
		var degrees = [];
		//populate binary, hebrew, degree, and word arrays from CS integer data
		for (var n=0; n < n_spins; n++){
			var integer = integers[n];
			var word = wordlist[integer];
			var bin_val = integer.toString(2); var bvl = bin_val.length;
			//front pad binary strings to len 16 
			for (var i=0; i<16-bvl; i++){
				bin_val = '0'+bin_val;
			};
			//generate octet_letter and octet_degree from padded binary
			var octet_letter = '';
			var octet_degree = [];
			for (var j=0; j<bin_val.length-1; j+=2){
				var letter = dreidel_hebrew[bin_val.slice(j,j+2)];
				var degree = dreidel_degrees[bin_val.slice(j,j+2)];
				octet_letter += letter;
				octet_degree.push(degree);
			};
			words.push(word);
			binary.push(bin_val);
			hebrew.push(octet_letter);
			degrees.push(octet_degree.reverse());
		};
		// display data below
		$("#passphrase")[0].innerHTML = words.join(', ');
		$("#hebrew")[0].innerHTML = hebrew.join(', ');
		$("#binary")[0].innerHTML = binary.join(', ');
		$("#integer")[0].innerHTML = integers.join(', ');

		//rotate dreidels
		var d8c = $("#dreidel-octet-container")[0];
		for (var j=0; j<d8c.children.length; j++) {
			for (var i=0; i<8; i++){
				d8c.children[j].children[i].children[0].setAttribute("style", 'transform: rotateX(75deg) rotate('+degrees[j][i]+'deg) scale(1)');
			};
		};
	});
});
