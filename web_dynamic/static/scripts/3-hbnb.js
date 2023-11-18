function trimComma (str) {
  const string = str.trim();

  return string.replace(/^,*|,*$/g, '');
}

$(document).ready(function () {
  const checkboxes = $('ul li input[type="checkbox"]');

  const selectedAmenities = {};

  checkboxes.on('change', function () {
    const cb = $(this);

    if (cb.is(':checked')) {
      selectedAmenities[cb.attr('data-id')] = true;

      $('.amenities h4').text((index, oldText) => {
        if (Object.keys(selectedAmenities).length === 1) {
          return oldText + cb.attr('data-name');

        } else {
          return oldText + ', ' + cb.attr('data-name');
        }
      });

    } else {
      delete selectedAmenities[cb.attr('data-id')];
      $('.amenities h4').text((index, oldText) => {
        let newText = oldText.replace(', ' + cb.attr('data-name'), '');

        newText = newText.replace(cb.attr('data-name'), '');

        return trimComma(newText);
      });
    }

  });
});

$.ajax({
  type: 'GET',
  url: 'http://0.0.0.0:5001/api/v1/status/',

  success: (data) => {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');

    } else {
      $('DIV#api_status').removeClass('available');
    }
  }

});

function loadPlaces (places) {
  for (let i = 0; i < Object.keys(places).length; i++) {
    const article = $('<article>');

    const titleBox = $('<div>').addClass('title_box');

    const placeName = $('<h2>');
    placeName.text(places[i].name);

    const price = $('<div>').addClass('price_by_night');
    price.html('$' + places[i].price_by_night);

    titleBox.append(placeName, price);

    const info = $('<div>').addClass('information');

    const guest = $('<div>').addClass('max_guest');
    let text = places[i].max_guest + ' Guest';

    if (places[i].max_guest > 1) text = text + 's';
    guest.text(text);

    const rooms = $('<div>').addClass('number_rooms');
    text = places[i].number_rooms + ' Room';

    if (places[i].number_rooms > 1) text = text + 's';
    rooms.text(text);

    const bath = $('<div>').addClass('number_bathrooms');
    text = places[i].number_bathrooms + ' Bathroom';

    if (places[i].number_bathrooms > 1) text = text + 's';
    bath.text(text);

    info.append(guest, rooms, bath);

    const desc = $('<div>').addClass('description');
    desc.html(places[i].description);

    article.append(titleBox, info, desc);

    $('section.places').append(article);
  }
}

$(document).ready(() => {
  $.ajax({
    type: 'POST',

    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    dataType: 'json',
    contentType: 'application/json',

    data: JSON.stringify({}),

    success: (data) => {
      loadPlaces(data);
    }
  });

});
