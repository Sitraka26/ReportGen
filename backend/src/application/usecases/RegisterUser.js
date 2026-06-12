const bcrypt = require('bcryptjs')

class RegisterUser {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async execute({ email, password }) {
    const existing = await this.userRepository.findByEmail(email)
    if (existing) {
      throw new Error('Cet email est déjà utilisé')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await this.userRepository.create({
      email,
      password: hashedPassword
    })

    return user.toJSON()
  }
}

module.exports = RegisterUser