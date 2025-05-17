import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import classes from '../form.module.scss'
import { RegisterUser } from '../../../../store/slices/userSlice'

const FormSignUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const serverErrors = useSelector((state) => state.user.error)
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: 'onChange',
  })
  const password = watch('password')

  const onSubmit = async (data) => {
    const resultAction = await dispatch(RegisterUser(data))
    if (RegisterUser.fulfilled.match(resultAction)) {
      navigate('/sign-in')
    }
  }

  return (
    <main className={classes.main}>
      <form className={`${classes['form_up']} ${classes['form']}`} onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.form_position}>
          <fieldset className={classes.form_fieldset}>
            <legend>Create new account</legend>
            <div className={classes.form_field}>
              <label className={classes.form_label}>Username</label>
              <input
                className={`${classes.form_input} ${errors.username ? classes.error : ''}`}
                type="text"
                {...register('username', {
                  required: 'This field is required',
                  minLength: { value: 3, message: 'Username must be at least 3 characters' },
                  maxLength: { value: 20, message: 'Username must be at most 20 characters' },
                  pattern: {
                    value: /^[a-zA-Z0-9]{3,20}$/,
                    message: 'Only letters and numbers are allowed',
                  },
                })}
                placeholder="Username"
              />
              {errors.username && <p className={classes.error_message}>{errors.username.message}</p>}
              {serverErrors?.username && <p className={classes.error_message}>Username {serverErrors.username}</p>}
            </div>
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
              {serverErrors?.email && <p className={classes.error_message}>Email {serverErrors.email}</p>}
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
            </div>
            <div className={classes.form_field}>
              <label className={classes.form_label}>Repeat Password</label>
              <input
                className={`${classes.form_input} ${errors.repeatPassword ? classes.error : ''}`}
                type="password"
                {...register('repeatPassword', {
                  required: 'This field is required',
                  validate: (value) => value === password || 'Passwords do not match',
                })}
                placeholder="Repeat Password"
              />
              {errors.repeatPassword && <p className={classes.error_message}>{errors.repeatPassword.message}</p>}
            </div>
          </fieldset>
          <div className={classes.form_NDA}>
            <input type="checkbox" required />
            <label>I agree to the processing of my personal information</label>
          </div>
          <button type="submit" className={classes.form_button}>
            Create
          </button>
          <p className={classes.form_signin}>
            Already have an account? <a href="/sign-in">Sign In.</a>
          </p>
        </div>
      </form>
    </main>
  )
}

export default FormSignUp
