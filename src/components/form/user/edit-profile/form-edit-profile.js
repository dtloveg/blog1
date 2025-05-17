import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { EditUser } from '../../../../store/slices/userSlice'
import classes from '../form.module.scss'

const FormEditProfile = () => {
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
  const { username, email, image } = useSelector((state) => ({
    username: state.user.username,
    email: state.user.email,
    image: state.user.image,
  }))
  const onSubmit = async (data) => {
    const resultAction = await dispatch(EditUser(data))
    if (EditUser.fulfilled.match(resultAction)) {
      navigate('/')
    }
  }
  return (
    <main className={classes.main}>
      <form className={`${classes['form_edit']} ${classes['form']}`} onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.form_position}>
          <fieldset className={classes.form_fieldset}>
            <legend>Edit Profile</legend>
            <div className={classes.form_field}>
              <label className={classes.form_label}>Username</label>
              <input
                className={classes.form_input}
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
                defaultValue={username}
              />
              {errors.username && <p className={classes.error_message}>{errors.username.message}</p>}
              {serverErrors?.username && <p className={classes.error_message}>Username {serverErrors.username}</p>}
            </div>
            <div className={classes.form_field}>
              <label className={classes.form_label}>Email address</label>
              <input
                className={classes.form_input}
                type="email"
                {...register('email', {
                  required: 'This field is required',
                  pattern: {
                    value: /^(?!.*\s)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'Invalid email address',
                  },
                })}
                placeholder="Email address"
                defaultValue={email}
              />
              {errors.email && <p className={classes.error_message}>{errors.email.message}</p>}
              {serverErrors?.email && <p className={classes.error_message}>Email {serverErrors.email}</p>}
            </div>
            <div className={classes.form_field}>
              <label className={classes.form_label}>New password</label>
              <input
                className={classes.form_input}
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
                placeholder="New Password"
              />
              {errors.password && <p className={classes.error_message}>{errors.password.message}</p>}
              {serverErrors?.password && <p className={classes.error_message}>Email {serverErrors.password}</p>}
            </div>
            <div className={classes.form_field}>
              <label className={classes.form_label}>Avatar image (url)</label>
              <input
                className={classes.form_input}
                type="text"
                {...register('image', {
                  required: true,
                  pattern: {
                    value: /^(https?:\/\/)([a-zA-Z0-9.-]+)(:[0-9]{1,5})?(\/[^\s]*)?$/i,
                    message: 'Invalid URL',
                  },
                })}
                placeholder="Avatar image"
                defaultValue={image}
              />
            </div>
            {errors.image && <p className={classes.error_message}>{errors.image.message}</p>}
          </fieldset>
          <button type="submit" className={classes.form_button}>
            Save
          </button>
        </div>
      </form>
    </main>
  )
}

export default FormEditProfile
