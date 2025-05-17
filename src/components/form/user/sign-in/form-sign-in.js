import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { LoginUser } from '../../../../store/slices/userSlice'
import classes from '../form.module.scss'

const FormSignIn = () => {
  const serverErrors = useSelector((state) => state.user.error)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  })

  const onSubmit = async (data) => {
    const resultAction = await dispatch(LoginUser(data))
    if (LoginUser.fulfilled.match(resultAction)) {
      navigate('/')
    }
  }
  return (
    <main className={classes.main}>
      <form className={`${classes['form_in']} ${classes['form']}`} onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.form_position}>
          <fieldset className={classes.form_fieldset}>
            <legend>Sign In</legend>
            <div className={classes.form_field}>
              <label className={classes.form_label}>Email address</label>
              <input
                className={`${classes.form_input} ${errors.email ? classes.error : ''}`}
                type="email"
                {...register('email', {
                  required: 'This field is required',
                  pattern: {
                    value: /^(?!.*\s)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'Invalid email address',
                  },
                })}
                placeholder="Email address"
              />
              {errors.email && <p className={classes.error_message}>{errors.email.message}</p>}
              {serverErrors && <p className={classes.error_message}>Email or password is invalid</p>}
            </div>
            <div className={classes.form_field}>
              <label className={classes.form_label}>Password</label>
              <input
                className={`${classes.form_input} ${errors.password ? classes.error : ''}`}
                type="password"
                {...register('password', {
                  required: 'This field is required',
                  minLength: {
                    value: 6,
                    message: 'Your password needs to be at least 6 characters',
                  },
                  maxLength: {
                    value: 40,
                    message: 'Your password needs to be at most 40 characters',
                  },
                  pattern: {
                    value: /^\S*$/,
                    message: 'Password should not contain spaces',
                  },
                })}
                placeholder="Password"
              />
              {errors.password && <p className={classes.error_message}>{errors.password.message}</p>}
              {serverErrors && <p className={classes.error_message}>Email or password is invalid</p>}
            </div>
          </fieldset>
          <button type="submit" className={classes.form_button}>
            Login
          </button>
          <p className={classes.form_signin}>
            Don’t have an account? <a href="/sign-up">Sign Up.</a>
          </p>
        </div>
      </form>
    </main>
  )
}

export default FormSignIn
