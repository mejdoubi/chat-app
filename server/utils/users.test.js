const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
  var users;
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'othman',
      room: 'dsvh'
    }, {
      id: '2',
      name: 'wafaa',
      room: 'family'
    }, {
      id: '3',
      name: 'nawal',
      room: 'dsvh'
    }];
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'othman',
      room: 'gnr'
    };
    var resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  it('should remove user', () => {
    var resUser = users.removeUser('3');
    expect(resUser.id).toBe('3');
    expect(users.users.length).toBe(2);
  });

  it('should not remove user', () => {
    var resUser = users.removeUser('5');
    expect(resUser).toBe(undefined);
    expect(users.users.length).toBe(3);
  });

  it('should find user by id', () => {
    var resUser = users.getUser('1');
    expect(resUser.id).toBe('1');
  });

  it('should not find user by id', () => {
    var resUser = users.getUser('7');
    expect(resUser).toBe(undefined);
  });

  it('should find user by name', () => {
    var resUser = users.getUserByName('nawal');
    expect(resUser.name).toBe('nawal');
  });

  it('should not find user by name', () => {
    var resUser = users.getUserByName('jamal');
    expect(resUser).toBe(undefined);
  });

  it('should return names for dsvh room', () => {
    var userList = users.getUserList('dsvh');
    expect(userList).toEqual(['othman', 'nawal']);
  });

  it('should return names for family room', () => {
    var userList = users.getUserList('family');
    expect(userList).toEqual(['wafaa']);
  });

  it('should return all active rooms', () => {
    var rooms = users.getRooms();
    expect(rooms).toEqual(['dsvh', 'family']);
  });
});
