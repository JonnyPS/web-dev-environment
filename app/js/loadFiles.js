var i = 0;
function loadScripts() {
	console.log("loadscripts");

	var scripts = ["https://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"];

	function loadjsfile(filename, filetype){
		if (filetype=="js"){ //if filename is a external JavaScript file
			var script=document.createElement('script')
			script.setAttribute("type","text/javascript")
			script.setAttribute("src", filename)
		}
			if (typeof script!="undefined") {
				document.getElementsByTagName("head")[0].appendChild(script)
				// script.onload = initAd();
				if(script.readyState) {  //IE
					script.onreadystatechange = function() {
				if ( script.readyState === "loaded" || script.readyState === "complete" ) {
					if ( i < scripts.length ) {
							loadjsfile(scripts[i], "js") //dynamically load and add this .js file
							console.log("i = " + i)
							console.log("script loaded = " + scripts[i])	
							i++;
						} else {
							initAd();
						}
					}
				};
			} 
			else {  //Others
				script.onload = function() {
					if ( i < scripts.length ) {
						loadjsfile(scripts[i], "js") //dynamically load and add this .js file
						console.log("i = " + i)
						console.log("script loaded = " + scripts[i])
						i++;

					} else {
						// callback();
						initAd();
					}
				};
			}
		}
	}
 
	loadjsfile(scripts[i], "js") //dynamically load and add this .js file
};

loadScripts();