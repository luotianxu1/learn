import React, { useState, useEffect } from 'react'
import NavBarAgain from '../components/NavBarAgain'
import { Form, Input, Toast } from 'antd-mobile'
import ButtonAgain from '../components/ButtonAgain'
import api from '../api/index'
import { connect } from 'react-redux'
import action from '../store/action'

// 自定义校验规则
const validate = {
    phone(_, value) {
        value = value.trim()
        if (value.length === 0)
            return Promise.reject(new Error('手机号不能为空'))
        let reg = /^(?:(?:\+|00)86)?1\d{10}$/
        if (!reg.test(value)) return Promise.reject(new Error('手机号格式有误'))
        return Promise.resolve()
    },
    code(_, value) {
        value = value.trim()
        let reg = /^d{6}$/
        if (value.length === 0)
            return Promise.reject(new Error('验证码不能为空'))
        if (!reg.test(value)) return Promise.reject(new Error('验证码格式有误'))
    },
}

const Login = function Login(props) {
    let { queryuseInfoAsync, navigate, usp } = props

    const [formIns] = Form.useForm()
    const [disabled, setDisabled] = useState(false)
    const [sendText, setSendText] = useState('发送验证码')

    const submit = async (values) => {
        try {
            await formIns.validateFields()
            let { phone, code } = formIns.getFieldValue()
            let { code: codeHttp, token } = await api.login(phone, code)
            console.log(codeHttp, token)
            if (+codeHttp !== 0) {
                Toast.show({
                    icon: 'fail',
                    content: '登陆失败',
                })
                formIns.resetFields(['code'])
                return
            }
            localStorage.setItem('token', token)
            // 派发任务
            queryuseInfoAsync()
            Toast.show({
                icon: 'success',
                content: '登陆成功',
            })
            let to = usp.get('to')
            to ? navigate(to, { replace: true }) : navigate(-1)
        } catch (_) {}
    }

    // 发送验证码
    let timer = null
    let num = 31
    const countDown = () => {
        num--
        if (num === 0) {
            clearInterval(timer)
            timer = null
            setSendText('发送验证码')
            setDisabled(false)
            return
        }
        setSendText(`${num}秒后重发`)
    }
    const send = async () => {
        try {
            await formIns.validateFields(['phone'])
            let phone = formIns.getFieldValue('phone')
            console.log()
            let { code } = api.phoneCode(phone)
            if (+code) {
                Toast.show({
                    icon: 'fail',
                    content: '发送失败',
                })
                return
            }
            setDisabled(true)
            countDown()
            if (!timer) {
                timer = setInterval(countDown, 1000)
            }
        } catch (_) {}
    }
    useEffect(() => {
        return () => {
            if (timer) {
                clearInterval(timer)
                timer = null
            }
        }
    }, [])

    return (
        <div className='login-box'>
            <NavBarAgain title='登录/注册'></NavBarAgain>
            <Form
                layout='horizontal'
                style={{ '--border-top': 'none' }}
                footer={
                    <ButtonAgain type='submit' color='primary' onClick={submit}>
                        提交
                    </ButtonAgain>
                }
                onFinish={submit}
                form={formIns}
                initialValues={{ phone: '', code: '' }}
                requiredMarkStyle={false}
            >
                <Form.Item
                    name='phone'
                    label='手机号'
                    rules={[{ validator: validate.phone }]}
                >
                    <Input placeholder='请输入手机号'></Input>
                </Form.Item>
                <Form.Item
                    name='code'
                    label='验证码'
                    // rules={[{ validator: validate.code }]}
                    rules={[
                        { required: true, message: '请输入验证码' },
                        { pattern: /^\d{6}$/, message: '请输入6位数字验证码' },
                    ]}
                    extra={
                        <ButtonAgain
                            size='small'
                            color='primary'
                            disabled={disabled}
                            onClick={send}
                        >
                            {sendText}
                        </ButtonAgain>
                    }
                >
                    <Input></Input>
                </Form.Item>
            </Form>
        </div>
    )
}

export default connect(null, action.base)(Login)
