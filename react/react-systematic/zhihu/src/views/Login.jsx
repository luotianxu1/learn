import React, { useState } from 'react'
import NavBarAgain from '../components/NavBarAgain'
import { Form, Input, Toast } from 'antd-mobile'
import ButtonAgain from '../components/ButtonAgain'

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

const Login = function Login() {
    const [formIns] = Form.useForm()
    const [disabled, setDisabled] = useState(false)
    const [sendText, setSendText] = useState('发送验证码')

    const submit = (values) => {}

    const delay = (interval = 1000) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, interval)
        })
    }
    const send = async () => {
        try {
            await formIns.validateFields(['phone'])
            await delay(3000)
        } catch (_) {}
    }

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

export default Login
