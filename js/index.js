// Define an array of file names
var fileNames = [
	"South_African_Infantry",
	"South_Irish_Horse",
	"South_Lancashire_Regiment",
	"South_Wales_Borderers_Regiment",
	"Sussex_Yeomanry",
	"Territorial_Force_Nursing_Service",
	"The_Royal_Fusiliers_City_of_London_Regiment",
	"Training_Reserve",
	"Voluntary_Aid_Detachment",
	"Welsh_Regiment",
	"West_Riding_Regiment",
	"West_Yorkshire_Regiment",
	"Wiltshire_Regiment",
	"Worcestershire_Regiment",
	"York___Lancashire_Regiment",
	"Yorkshire_Regiment",
	"4th_Dragoon_Guards",
	"4th_Hussars",
	"5th_Royal_Irish_Lancers",
	"8th_Kings_Royal_Irish_Hussars",
	"86th_Carnatic_Infantry",
	"American_Expeditionary_Force",
	"American_Forces_Ambulance",
	"Argyll___Sutherland_Highlanders",
	"Army_Cyclist_Corps",
	"Army_Ordnance_Corps",
	"Army_Pay_Corps",
	"Australian_Flying_Corps",
	"Australian_Imperial_Force",
	"Border_Regiment",
	"Cameron_Highlanders",
	"Canadian_Expeditionary_Force",
	"Canadian_Field_Artillery",
	"Cape_Police",
	"Cheshire_Regiment",
	"Connaught_Rangers",
	"Devonshire_Regiment",
	"Duke_of_Cornwall_s_Light_Infantry",
	"Durham_Light_Infantry",
	"East_Kent_Regiment",
	"East_Lancashire_Regiment",
	"East_Yorkshire_Regiment",
	"Essex_Regiment",
	"General_Service",
	"Gloucestershire_Yeomanry",
	"Gordon_Highlanders",
	"Hampshire_Regiment",
	"Highland_Light_Infantry",
	"Indian_Army_Reserve_Officer",
	"Irish_Guards",
	"Kings_Own_Scottish_Borderers",
	"Kings_Own_Yorkshire_Light_Infantry",
	"Kings_Regiment",
	"Kings_Royal_Rifle_Corps",
	"Kings_Shropsire_Light_Infantry",
	"Kings_Yorkshire_Regiment",
	"Labour_Corps",
	"Lancashire_Fusiliers",
	"Leicestershire_Regiment",
	"Leinster_Regiment",
	"Lincolnshire_Regiment",
	"London_Regiment",
	"Loyal_North_Lancashire_Regiment",
	"Machine_Gun_Corps",
	"Manchester_Regiment",
	"Merchant_Navy",
	"Middlesex_Regiment",
	"New_Zealand_Expeditionary_Force",
	"Norfolk_Regiment",
	"North_Irish_Horse",
	"North_Staffordshire_Regiment",
	"Northamptonshire_Regiment",
	"Northumberland_Fusiliers",
	"Nottinghamshire___Derbyshire_Regiment",
	"Oxfordshire___Buckinghamshire_Light_Infantry",
	"Princess_Patricia_s_Canadian_Light_Infantry",
	"Queen_Alexandra_s_Military_Nursing_Service",
	"Rifle_Brigade",
	"Royal_Air_Force",
	"Royal_Army_Chaplains_Department",
	"Royal_Army_Medical_Corps",
	"Royal_Army_Service_Corps",
	"Royal_Army_Veterinary_Corps",
	"Royal_Artillery",
	"Royal_Australian_Navy",
	"Royal_Berkshire_Regiment",
	"Royal_Canadian_Regiment",
	"Royal_Corps_of_Signals",
	"Royal_Defence_Corps",
	"Royal_Dublin_Fusiliers",
	"Royal_Engineers",
	"Royal_Highlanders_Black_Watch",
	"Royal_Inniskilling_Fusiliers",
	"Royal_Irish_Fusiliers",
	"Royal_Irish_Regiment",
	"Royal_Irish_Rifles",
	"Royal_Marine_Light_Infantry",
	"Royal_Military_Police",
	"Royal_Munster_Fusiliers",
	"Royal_Navy",
	"Royal_Scots",
	"Royal_Scots_Fusiliers",
	"Royal_Tank_Corps",
	"Royal_Welch_Fusiliers",
	"Royal_Welsh_Fusiliers",
	"Royal_West_Kent_Regiment",
	"Scottish_Rifles_Cameronians",
	"Seaforth_Highlanders",
	"Somerset_Light_Infantry",
];
// Define the directory path and file extension
var directoryPath = "../img/Cap Badges/";
var fileExtension = ".png";

// Create an array of image URLs
var images = [];

// Function to shuffle the array
function shuffleArray(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}

for (var i = 1; i < fileNames.length; i++) {
	images.push(directoryPath + fileNames[i] + fileExtension);
}

// Shuffle the images array
images = shuffleArray(images);

var currentIndex = 0;
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function drawImage(imageUrl) {
	var img = new Image();
	img.src = imageUrl;
	img.onload = function () {
		var width = img.width;
		var height = img.height;
		var maxWidth = 400;
		var maxHeight = 400;
		if (width > height) {
			if (width > maxWidth) {
				height *= maxWidth / width;
				width = maxWidth;
			}
		} else {
			if (height > maxHeight) {
				width *= maxHeight / height;
				height = maxHeight;
			}
		}
		canvas.width = width;
		canvas.height = height;
		ctx.drawImage(img, 0, 0, width, height);
	};
}

setInterval(() => {
	currentIndex = (currentIndex + 1) % images.length;
	drawImage(images[currentIndex]);
}, 3000);
