class Users {
  constructor() {
    this.users = [];
  }
  addUser(id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }
  removeUser(id) {
    var user = this.getUser(id);
    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
    }
    return user;
  }
  getUser(id) {
    var users = this.users.filter((user) => user.id === id);
    return users[0];
  }
  getUserByName(name) {
    var users = this.users.filter((user) => user.name === name);
    return users[0];
  }
  getUserList(room) {
    var users = this.users.filter((user) => user.room === room);
    var namesArray = users.map((user) => user.name);
    return namesArray;
  }
  getRooms() {
    var rooms = [];
    this.users.forEach((user) => {
      if (!rooms.includes(user.room)) {
        rooms.push(user.room);
      }
    });
    return rooms;
  }
}

module.exports = {Users};