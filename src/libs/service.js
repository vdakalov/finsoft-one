
class Service {
  static getApiConstructor() {
    return null;
  }

  constructor() {
    const Api = this.constructor.getApiConstructor();

    if (Api) {
      this.api = new Api();
    }
  }

  getId() {
    return this.constructor.name;
  }
}

module.exports = Service;