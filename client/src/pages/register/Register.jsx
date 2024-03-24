import { Link, redirect, useNavigate } from "react-router-dom"
import { useState, useContext } from "react"
import "./register.scss"
import { useForm } from "react-hook-form"
import axios from "axios"
import { useMutation } from "@tanstack/react-query"
import authRoute from "../../axios/userApi"

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const navigate = useNavigate()

  const [err, setErr] = useState(null)

  const mutationLogin = useMutation({
    mutationFn: (inputs) => {
      return authRoute.loginUser(inputs)
    },
    onSuccess: async (data) => {
      console.log("result", data)
      if (data) {
        navigate("/")
        // window.location.reload()
      }
    },
  })

  const mutation = useMutation({
    mutationFn: (formData) => {
      return authRoute.registerUser(formData)
    },
    onSuccess: async (data) => {
      console.log("data", data)
      // await mutationLogin.mutate(data)
      // setCurrentUser(data.user)
      // navigate("/")
      // navigate("/")
    },
    onError: async (err) => {
      console.log("err", err)
    },
  })

  const handleClick = async (data) => {
    await mutation.mutate(data)
  }

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Lama Social.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form onSubmit={handleSubmit(handleClick)}>
            <div className="form-block">
              <input
                {...register("username", {
                  required: "username is required!",
                  minLength: {
                    value: 4,
                    message: "user name must have minimum 4 symbols",
                  },
                })}
                type="text"
                placeholder="Username"
                name="username"
              />
              {errors.username && (
                <p className="form-warning">{errors.username.message}</p>
              )}
            </div>
            <div className="form-block">
              <input
                {...register("email", { required: "email is required!" })}
                type="email"
                placeholder="Email"
                name="email"
              />
              {errors.email && (
                <p className="form-warning">{errors.email.message}</p>
              )}
            </div>
            <div className="form-block">
              <input
                {...register("password", { required: "password is required!" })}
                type="password"
                placeholder="Password"
                name="password"
              />
              {errors.password && (
                <p className="form-warning">{errors.password.message}</p>
              )}
            </div>
            <div className="form-block">
              <input
                {...register("name", {
                  required: "name is required!",
                  minLength: {
                    value: 4,
                    message: "user name must have minimum 4 symbols",
                  },
                })}
                type="text"
                placeholder="Name"
                name="name"
              />
              {errors.name && (
                <p className="form-warning">{errors.name.message}</p>
              )}
            </div>
            <p className="form-warning">{err}</p>
            <button className="form-button" type="sumbit">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
