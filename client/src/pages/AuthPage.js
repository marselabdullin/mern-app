import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const { loading, error, request, clearError } = useHttp()

    const [form, setForm] = useState({ email: '', password: '' })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...form })
            message(data.message)
        } catch (error) { }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', { ...form })
            auth.login(data.token, data.userId)
        } catch (error) { }
    }

    return (
        <div className="row">
            <div className="col s-6 offset-s3">
                <h1>Сократи Ссылку</h1>
                <div className="card teal darken-4">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>

                        <div className="row">
                            <div className="input-field col s10 offset-s1">
                                <input
                                    className="white-text"
                                    placeholder="Введите email"
                                    id="email"
                                    type="text"
                                    name="email"
                                    onChange={changeHandler}
                                    value={form.email}
                                />
                                <label htmlFor="email">
                                    Email
                                </label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s10 offset-s1">
                                <input
                                    placeholder="Введите пароль"
                                    id="password"
                                    type="password"
                                    name="password"
                                    onChange={changeHandler}
                                    value={form.password}
                                />
                                <label htmlFor="password">
                                    Пароль
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn red darken-4 mr-2"
                            style={{ marginRight: 20 }}
                            onClick={loginHandler}
                        >
                            Войти
                        </button>
                        <button
                            className="btn blue darken-3"
                            onClick={registerHandler}
                        >
                            Регистрация
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthPage
