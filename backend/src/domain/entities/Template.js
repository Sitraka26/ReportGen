class Template {
  constructor({ id, name, structure, createdAt }) {
    this.id = id
    this.name = name
    this.structure = structure
    this.createdAt = createdAt
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      structure: this.structure,
      createdAt: this.createdAt
    }
  }
}

module.exports = Template