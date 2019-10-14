'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');
var mapPins = document.querySelector('.map__pins');
var mapPinsFragment = document.createDocumentFragment();
var similarTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var COUNT = 8;

var avatarSrc = 'img/avatars/user0';
var title = 'Заголовок номер ';

var adressOffer = {
  min: 100,
  max: 1000
};

var priceOffer = {
  min: 100,
  max: 10000
};

var typeList = ['palace', 'flat', 'house', 'bungalo'];

var roomOffer = {
  min: 1,
  max: 4
};

var numberOfGuests = {
  min: 1,
  max: 4
};

var checkins = ['12: 00', '13: 00', '14: 00'];
var checkouts = ['12: 00', '13: 00', '14: 00'];
var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosList = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var descriptionOffer = 'Описание ';


var locationYMin = 130;
var locationYMax = 630;


var getRandom = function (min, max) {
  return Math.floor(Math.random() * max) + min;
};

var getRandomIndexArray = function (maxValue) {
  return maxValue[Math.floor(Math.random() * (maxValue.length))];
};

var getGenerateRandomArray = function (arr) {
  var array = [];
  var randomLength = getRandom(1, arr.length);
  array.push(getRandomIndexArray(arr));
  for (var i = 0; i < randomLength; i++) {
    var item = arr[i];
    if (array.indexOf(item) === -1) {
      array.push(item);
    }
  }
  return array;
};

var getAuthor = function () {
  var obj = {};
  obj.avatar = avatarSrc + getRandom(1, COUNT) + '.png';
  return obj;
};

var getOffer = function () {
  var objOffer = {};
  objOffer.title = title + getRandom(1, COUNT);
  objOffer.address = [getRandom(adressOffer.min, adressOffer.max), getRandom(adressOffer.min, adressOffer.max)];
  objOffer.price = getRandom(priceOffer.min, priceOffer.max);
  objOffer.type = getRandomIndexArray(typeList);
  objOffer.rooms = getRandom(roomOffer.min, roomOffer.max);
  objOffer.guests = getRandom(numberOfGuests.min, numberOfGuests.max);
  objOffer.checkin = getRandomIndexArray(checkins);
  objOffer.checkout = getRandomIndexArray(checkouts);
  objOffer.features = getGenerateRandomArray(featuresList);
  objOffer.description = descriptionOffer + getRandom(1, COUNT);
  objOffer.photos = getGenerateRandomArray(photosList);
  return objOffer;
};

var getLocation = function (parentElement, childElement, yMin, yMax) {
  var parentPositionInfo = parentElement.getBoundingClientRect();
  var childPositionInfo = childElement.getBoundingClientRect();
  var positionX = getRandom(0, parentPositionInfo.width) - childPositionInfo.width / 2;
  var positionY = getRandom(yMin, yMax) - childPositionInfo.height;
  var location = {
    x: positionX,
    y: positionY
  };
  return location;
};

var createSimilarAd = function () {
  var similarAds = [];
  for (var i = 0; i < COUNT; i++) {
    var ad = {};
    ad.author = getAuthor(i);
    ad.offer = getOffer(i);
    ad.location = getLocation(map, similarTemplate, locationYMin, locationYMax);
    similarAds.push(ad);
  }
  return similarAds;
};

var renderPin = function (ad) {
  var pinElement = similarTemplate.cloneNode(true);
  var img = pinElement.querySelector('img');
  var author = ad.author;
  var offer = ad.offer;
  pinElement.style = 'left: ' + dataList[i].location.x + 'px; top: ' + dataList[i].location.y + 'px;';
  img.src = author.avatar;
  img.alt = offer.title;
  return pinElement;
};

var dataList = createSimilarAd();

for (var i = 0; i < COUNT; i++) {
  var pin = renderPin(dataList[i]);
  mapPinsFragment.appendChild(pin);
}

mapPins.appendChild(mapPinsFragment);

