/**
 * @author Benjamin Hollis
 * 
 * Copyright 2007 Benjamin Hollis
 * See license.txt for additional license information.
 */

function init() {
	LoadSettings();
	dockedState();
	update();
}

function update() {
	try {
		// Refresh
		var gamercard = document.getElementById("gamercard");
		gamercard.src = "http://gamercard.xbox.com/" + window.gamertag + ".card";
		setTimeout("update()", 30 * 60 * 1000); // 30 mins
	}
	catch (err) {
		throw err;
	}
}

function dockedState() {
	System.Gadget.beginTransition();
	if (System.Gadget.docked) {
	   document.body.style.width="130px";
	   document.body.style.height="90px";
	   document.body.style.zoom="64%";
	}
	else {
	   document.body.style.width = "204px";
	   document.body.style.height = "140px";
	   document.body.style.zoom="100%";
	}
	System.Gadget.endTransition(System.Gadget.TransitionType.morph, 0.2);
}

System.Gadget.onUndock = dockedState;
System.Gadget.onDock = dockedState; 

/* Settings */
System.Gadget.settingsUI = "Settings.html";
System.Gadget.onSettingsClosed = LoadSettings;
function LoadSettings() {
	try {
		var gamercard = document.getElementById("gamercard");
		var gamertag = System.Gadget.Settings.read("gamertag");
		if(!gamertag || gamertag == "")
			gamertag = "Major Nelson";
		
		window.gamertag = gamertag;
		var gamercard = document.getElementById("gamercard");
		gamercard.src = "http://gamercard.xbox.com/" + window.gamertag + ".card";
	}
	catch (err) {
		debug.innerHTML = err.description;
		throw err;
	}
}