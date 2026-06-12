const RegisterUser = require('../../application/usecases/RegisterUser')
const LoginUser = require('../../application/usecases/LoginUser')
const PrismaUserRepository = require('../../infrastructure/repositories/PrismaUserRepository')

const userRepository = new PrismaUserRepository()

const register = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email et mot de passe requis' })
    }

    const registerUser = new RegisterUser(userRepository)
    const user = await registerUser.execute({ email, password })

    res.status(201).json({ message: 'Compte créé avec succès', user })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email et mot de passe requis' })
    }

    const loginUser = new LoginUser(userRepository)
    const result = await loginUser.execute({ email, password })

    res.status(200).json({ message: 'Connexion réussie', ...result })
  } catch (error) {
    res.status(401).json({ error: error.message })
  }
}

const me = async (req, res) => {
  try {
    const user = await userRepository.findById(req.user.id)
    res.status(200).json({ user: user.toJSON() })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = { register, login, me }