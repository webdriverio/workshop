exports.TodoEntry = class TodoEntry {
  constructor (elem) {
    if (!elem) {
      throw new Error('To create an instance of a Todo entry you need to provide the Todo element')
    }

    this.elem = elem
  }

  get toggle () {
    return this.elem.$('.toggle')
  }

  get text () {
    return this.elem.getText().trim()
  }

  complete () {
    return this.toggle.click()
  }
}
