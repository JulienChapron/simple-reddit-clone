import name1 from '../assets/randomSurname/Name1';
import name2 from '../assets/randomSurname/Name2';

const capFirst = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}; 

export const randomUtils = () => {
  var arrayOfUsernames = [];
  for (let i = 0; i < 5; i++) {
    var name =
      capFirst(name1[getRandomInt(0, name1.length)]) +
      capFirst(name2[getRandomInt(0, name2.length)]) +
      Math.floor(Math.random() * Math.floor(999))
    arrayOfUsernames.push(name);
  }
  return arrayOfUsernames;
};
