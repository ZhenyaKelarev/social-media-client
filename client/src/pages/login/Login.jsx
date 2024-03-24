import { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/authContext"
import authRoute from "../../axios/userApi"
import { useMutation } from "@tanstack/react-query"
import "./login.scss"

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  })

  const [err] = useState(null)

  const navigate = useNavigate()

  const { setCurrentUser } = useContext(AuthContext)

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const mutation = useMutation({
    mutationFn: () => {
      return authRoute.loginUser(inputs)
    },
    onSuccess: async (data) => {
      await setCurrentUser(data.user)

      navigate("/")
    },
  })

  const handleLogin = async (e) => {
    e.preventDefault()
    await mutation.mutate()
  }

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello Friends!</h1>
          <p>
            You can check social media project and will be a member of this pet
            website.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={handleChange}
              name="password"
            />
            {err && err}
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
