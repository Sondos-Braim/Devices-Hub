'use strict';
var devices = [];
//creating the contructor
var Device = function (name, category, quantity) {
    this.name = name;
    this.category = category;
    this.quantity = quantity;
    this.price = getRandomIntInclusive(350, 750);
    devices.push(this);
}
var sectionEl = document.getElementById('tableSection');
var tableEl=document.createElement('table');
sectionEl.appendChild(tableEl);
tableEl.id='table';
var headerInfo = ['Device Name', 'Quantity', 'Unit Price', 'Category'];
//create the header
function tableHeader() {
    var trEl = document.createElement('tr');
    tableEl.appendChild(trEl);
    for (var i = 0; i < headerInfo.length; i++) {
        var thEl = document.createElement('th');
        trEl.appendChild(thEl);
        thEl.textContent = headerInfo[i];
    }
}
//function to fill the table
Device.prototype.render = function () {
    var trEl = document.createElement('tr');
    tableEl.appendChild(trEl);
    var tdEl=document.createElement('td');
    trEl.appendChild(tdEl);
    tdEl.textContent=this.name;
    var tdEl=document.createElement('td');
    trEl.appendChild(tdEl);
    tdEl.textContent=this.quantity;
    var tdEl=document.createElement('td');
    trEl.appendChild(tdEl);
    tdEl.textContent=this.price;
    var tdEl=document.createElement('td');
    trEl.appendChild(tdEl);
    tdEl.textContent=this.category;
}

function renderTableContent(){
    for(var i=0;i<devices.length;i++){
        devices[i].render();
    }
}
//eventListener
var formEl=document.getElementById('form');
formEl.addEventListener('submit',addDevice);
function addDevice(event){
    event.preventDefault();
    var name=event.target.name.value;
    var category=event.target.category.value;
    var quantity=event.target.quantity.value;
    var addedDevice=new Device(name,category,quantity);
    addedDevice.render();
    total();
    formEl.reset();
    localStorage.setItem('devices',JSON.stringify(devices));
}
if(localStorage.getItem('devices')){
    var localStorageData=JSON.parse(localStorage.getItem('devices'));
    for(var i=0;i<localStorageData.length;i++){
        new Device(localStorageData[i].name,localStorageData[i].category,localStorageData[i].quantity);
    }
}
//create the total function
function total(){
var totalPrice=0;
var pEl=document.getElementById('total');
sectionEl.appendChild(pEl);
for(var i=0;i<devices.length;i++){
totalPrice+=devices[i].price*devices[i].quantity;
pEl.textContent=`Total: ${totalPrice}`;
}
}

tableHeader();
renderTableContent();
total();
//helper function
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive 
}