class Report {
  constructor({ id, title, status, userId, templateId, createdAt, updatedAt }) {
    this.id = id
    this.title = title
    this.status = status || 'draft'
    this.userId = userId
    this.templateId = templateId
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  isDraft() {
    return this.status === 'draft'
  }

  isGenerated() {
    return this.status === 'generated'
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      status: this.status,
      userId: this.userId,
      templateId: this.templateId,
      createdAt: this.createdAt
    }
  }
}

module.exports = Report