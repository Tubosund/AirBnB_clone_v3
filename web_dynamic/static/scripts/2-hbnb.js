
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
