var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem14611';  // fill in your serial port name here
var inData; 
var prevIndata = 0;
var xPos = 0;
var aiokey = "ccb170b858c5466bacc8c14224bc5d69";//get this from your account
var userName = "quinnrockliff"; //get this from your account
var channelName1 = "button"; //choose a name


 
function setup() {
createCanvas(windowWidth, windowHeight);
background(0x08, 0x16, 0x40);
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', console.log);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
 
  serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port
}
 
// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
console.log(i + " " + portList[i]);
 }
}

function serverConnected() {
  console.log('connected to server.');
}
 
function portOpen() {
  console.log('the serial port opened.')
}
 
function serialEvent() {
 inData = Number(serial.read());
    console.log(inData);
}
 
function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  console.log('The serial port closed.');
}

function graphData(newData) {
  // map the range of the input to the window height:
  var yPos = map(newData, 0, 255, 0, height);
  // draw the line in a pretty color:
  stroke(0xA8, 0xD9, 0xA7);
  line(xPos, height, xPos, height - yPos);
  // at the edge of the screen, go back to the beginning:
  if (xPos >= width) {
    xPos = 0;
    // clear the screen by resetting the background:
    background(0x08, 0x16, 0x40);
  } else {
    // increment the horizontal position for the next reading:
    xPos++;
  }
}

function draw() {
 graphData(inData);
if((inData==1)&&(prevIndata==0))
   
   {
   
   console.log("this is awesome");
   iftttSend1(userName,aiokey,channelName1,1);
   }
prevIndata=inData;    

    
    
//if (inData==1) {iftttSend1(userName,aiokey,channelName1,1);}

}

//console.log(inData);    
//function mousePressed()



function iftttSend1(uName, key, cName, cVal)
{
var sendURL = ("https://io.adafruit.com/api/groups/"+uName+"/send.json?x-aio-key="+key+"&"+cName+"="+cVal);
httpGet(sendURL);
}

function iftttSend2(uName, key, cName1, cVal1, cName2, cVal2)
{
var sendURL = ("https://io.adafruit.com/api/groups/"+uName+"/send.json?x-aio-key="+key+"&"+cName1+"="+cVal1+"&"+cName2+"="+cVal2);
httpGet(sendURL);
}