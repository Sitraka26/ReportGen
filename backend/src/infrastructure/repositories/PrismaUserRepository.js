const UserRepository = require('../../domain/repositories/UserRepository')
const User = require('../../domain/entities/User')
const prisma = require('../database/prisma.client')

class PrismaUserRepository extends UserRepository {
  async findByEmail(email) {
    const user = await prisma.user.findUnique({ where: { email } })
    return user ? new User(user) : null
  }

  async findById(id) {
    const user = await prisma.user.findUnique({ where: { id } })
    return user ? new User(user) : null
  }

  async create(userData) {
    const user = await prisma.user.create({ data: userData })
    return new User(user)
  }

  async update(id, userData) {
    const user = await prisma.user.update({ where: { id }, data: userData })
    return new User(user)
  }

  async delete(id) {
    await prisma.user.delete({ where: { id } })
  }
}

module.exports = PrismaUserRepository