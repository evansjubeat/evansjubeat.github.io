var context = new (window.AudioContext || window.webkitAudioContext)();

var buffers = new Array(400); // For every 400 pronounciations
var vocal_gain = context.createGain();
var samplingFilename; //
var vol = document.getElementById('VocalVol').value;
vocal_gain.gain.value = db2gain(vol);
document.getElementById(VocalVol_Label).innerHTML = 'Volume:  ' + vol + 'dB'; 
/*
for (i = 1; i < 3; i++)
{
	var hreq = new XMLHttpRequest();
	samplingFilename = "vocal/"+i +".wav";
//	samplingFilename = "1.wav";
	hreq.open("Get", samplingFilename, true);
	hreq.responseType = "arraybuffer";
	hreq.onload = function()
	{
		context.decodeAudioData(this.response, function(buffer){buffers[i] = buffer;});
	}
	hreq.send();
}*/

function playvocal(i) {

	var source = context.createBufferSource();
	source.buffer = buffers[i];
	source.connect(vocal_gain);
	vocal_gain.connect(context.destination);
	source.start(0);
}

function changegain(changedvalue){
	vocal_gain.gain.value = db2gain(changedvalue);
	document.getElementById("VocalVol_Label").innerHTML = 'Volume:  ' + changedvalue + 'dB'; 
}

function db2gain(db_gain) {
	var gain = Math.pow(10,(db_gain/20));
	return gain;
}

