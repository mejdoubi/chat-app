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

  if('should add new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'othman',
      room: 'gnr'
    };
    var resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  if('should remove user', () => {
    var resUser = users.removeUser('3');
    expect(resUser.id).toBe('3');
    expect(users.users.length).toBe(2);
  });

  if('should not remove user', () => {
    var resUser = users.removeUser('5');
    expect(resUser).toBe(undefined);
    expect(users.users.length).toBe(3);
  });

  if('should find user', () => {
    var resUser = users.getUser('1');
    expect(resUser.id).toBe('1');
  });

  if('should not find user', () => {
    var resUser = users.getUser('7');
    expect(resUser).toBe(undefined);
  });

  if('should return names for dsvh room', () => {
    var userList = users.getUserList('dsvh');
    expect(userList).toEqual(['othman', 'nawal']);
  });

  if('should return names for family room', () => {
    var userList = users.getUserList('family');
    expect(userList).toEqual(['wafaa']);
  });
});
