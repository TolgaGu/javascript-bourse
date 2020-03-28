import Component from '@glimmer/component';
import { action } from '@ember/object';
//import EmberObject from '@ember/object';

/*
const Person = EmberObject.extend({
  init() {
    alert(`Name is ${this.get('name')}`);
  }
});

let steve = Person.create({
  name: 'Steve'
});
*/
export default class PeopleListComponent extends Component {
  @action
  showPerson(person) {
    alert(`The person's name is ${person}!`);
  }


}
