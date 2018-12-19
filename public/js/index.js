var socket = io();

socket.emit('sendRoomList');

socket.on('roomList', function(rooms) {
  var select = jQuery('<select name="activeRoom"></select>');

  rooms.forEach(function(room) {
    select.append(jQuery('<option></option>').text(room).val(room));
  });

  jQuery('#rooms').html(select);
});

var roomTextBox = jQuery('[name=room]');
roomTextBox.on('input', function(e) {
  var rooms = jQuery('[name=activeRoom]');
  console.log('roomTextBox', roomTextBox.val());
  if (roomTextBox.val()) {
    rooms.attr('disabled', 'disabled');
  } else {
    rooms.removeAttr('disabled');
  }
});
