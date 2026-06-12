const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class LoginUser {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async execute({ email, password }) {
    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      throw new Error('Email ou mot de passe incorrect')
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      throw new Error('Email ou mot de passe incorrect')
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    return { user: user.toJSON(), token }
  }
}

module.exports = LoginUser