export class TodoEntry {
  constructor (private _elem: WebdriverIO.Element) {
    if (!_elem) {
      throw new Error('To create an instance of a Todo entry you need to provide the Todo element')
    }
  }

  get toggle () {
    return this._elem.$('.toggle')
  }

  get element () {
    return this._elem
  }

  complete () {
    return this.toggle.click()
  }
}
