import Component from "@glimmer/component";
import { tracked } from '@glimmer/tracking';

export default class TableComponent extends Component{
  @tracked drafts;

  constructor() {
    super(...arguments);

  }

  /*

  @action
  showPerson() {
    alert(`${this.drafts}`);
  }
const Person = EmberObject.extend({
  // eslint-disable-next-line ember/require-super-in-init
  init() {
    alert(`Name is ${this.get('name')}`);
  }
});

// eslint-disable-next-line no-unused-vars
let steve = Person.create({
  name: 'Steve'
});*/

}
