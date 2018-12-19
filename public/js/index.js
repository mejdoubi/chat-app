var socket = io();

socket.emit('sendRoomList');

socket.on('roomList', function(rooms) {
  var select = jQuery('<select name="activeRoom"></select>');

  rooms.forEach(function(room) {
    select.append(jQuery('<option></option>').text(room).val(room));
  });

  jQuery('#rooms').html(select);
});
