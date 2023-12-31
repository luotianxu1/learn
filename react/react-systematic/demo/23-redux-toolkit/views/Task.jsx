import React, { useEffect, useState } from 'react'
import './Task.less'
import {
    Button,
    DatePicker,
    Form,
    Input,
    Modal,
    Popconfirm,
    Table,
    Tag,
    message,
} from 'antd'
import { useSelector, useDispatch, connect } from 'react-redux'
import { getAllTaskListAsync } from '../store/features/taskSlice'

const zero = function zero(text) {
    text = String(text)
    return text.length < 2 ? '0' + text : text
}

const formatTime = function formatTime(time) {
    let arr = time.match(/\d+/g)
    let [, month, day, hours = '00', minutes = '00'] = arr
    return `${zero(month)}-${zero(day)} ${zero(hours)}:${zero(minutes)}`
}

const Task = function Task() {
    // 获取公共状态和派发方法
    let { taskList } = useSelector((state) => state.task)
    let dispatch = useDispatch()

    // 定义表格列的数据
    const columns = [
        {
            title: '编号',
            dataIndex: 'id',
            align: 'center',
            width: '8%',
        },
        {
            title: '任务描述',
            dataIndex: 'task',
            ellipsis: true,
            width: '50%',
        },
        {
            title: '状态',
            dataIndex: 'state',
            align: 'center',
            width: '10%',
            render: (text, record) => {
                // text： 某个单元格的数据
                // record： 这一行的完整数据
                // index: 这一行的索引
                return +text === 1 ? '未完成' : '已完成'
            },
        },
        {
            title: '完成时间',
            dataIndex: 'complete',
            align: 'center',
            width: '15%',
            render: (_, record) => {
                let { state, time, complete } = record
                if (+state === 2) time = complete
                return formatTime(time)
            },
        },
        {
            title: '操作',
            render: (_, record) => {
                let { id, state } = record
                return (
                    <>
                        <Popconfirm
                            title='您确定要删除此任务吗？'
                            onConfirm={handleRemove.bind(null, id)}
                        >
                            <Button type='link'>删除</Button>
                        </Popconfirm>
                        {+state === 2 ? (
                            <Popconfirm
                                title='您确定要把此任务设置为完成吗？'
                                onConfirm={handleUpdate.bind(null, id)}
                            >
                                <Button type='link'>完成</Button>
                            </Popconfirm>
                        ) : null}
                    </>
                )
            },
        },
    ]

    // 定义需要的状态
    let [selectedIndex, setSelectedIndex] = useState(0)
    let [tableData, setTableData] = useState([])
    let [tableLoading, setTableLoading] = useState(false)
    let [modalVisible, setModalVisible] = useState(false)
    let [confirmLoading, setConfirmLoading] = useState(false)
    let [formIns] = Form.useForm()

    // 关于table的数据和处理
    useEffect(() => {
        ;(async () => {
            if (!taskList) {
                setTableLoading(true)
                await dispatch(getAllTaskListAsync())
                setTableLoading(false)
            }
        })()
    }, [])
    useEffect(() => {
        if (!taskList) taskList = []
        if (selectedIndex !== 0) {
            taskList = taskList.filter((item) => +item.state === selectedIndex)
        }
        setTableData(taskList)
    }, [selectedIndex, taskList])

    const closeMoadl = () => {
        setModalVisible(false)
        setConfirmLoading(false)
        formIns.resetFields()
    }

    const submit = async () => {
        try {
            await formIns.validateFields()
            let { task, time } = formIns.getFieldValue()
            time = time.format('YYYY-MM-DD HH:mm:ss')
            message.success('提交成功')
            closeMoadl()
            setTableLoading(true)
            await dispatch(getAllTaskListAsync())
            setTableLoading(false)
        } catch (_) {}
    }

    const changeIndex = (index) => {
        if (selectedIndex === index) return
        setSelectedIndex(index)
        console.log(index)
    }

    const handleRemove = () => {}

    const handleUpdate = () => {}

    return (
        <div className='task-box'>
            {/* 头部 */}
            <div className='header'>
                <h2 className='title'>TASK OA 任务管理系统</h2>
                <Button
                    type='primary'
                    onClick={() => {
                        setModalVisible(true)
                    }}
                >
                    新增任务
                </Button>
            </div>

            {/* 标签 */}
            <div className='tag-box'>
                {['全部', '未完成', '已完成'].map((item, index) => {
                    return (
                        <Tag
                            key={index}
                            color={selectedIndex === index ? '#1677ff' : ''}
                            onClick={changeIndex.bind(null, index)}
                        >
                            {item}
                        </Tag>
                    )
                })}
            </div>

            {/* 表格 */}
            <Table
                dataSource={tableData}
                columns={columns}
                loading={tableLoading}
                pagination={false}
                rowKey='id'
            ></Table>

            {/* 对话框&表单 */}
            <Modal
                title='新增任务窗口'
                open={modalVisible}
                confirmLoading={confirmLoading}
                maskClosable={false}
                okText='确认提交'
                onCancel={closeMoadl}
                onOk={submit}
            >
                <Form
                    ref={(x) => (formIns = x)}
                    layout='vertical'
                    initialValues={{
                        task: '',
                        time: '',
                    }}
                >
                    <Form.Item
                        label='任务描述'
                        name='task'
                        validateTrigger='onBlur'
                        rules={[
                            { required: true, message: '请输入任务描述' },
                            { min: 6, message: '输入的内容至少6位以上' },
                        ]}
                    >
                        <Input.TextArea rows={4}></Input.TextArea>
                    </Form.Item>
                    <Form.Item
                        label='预期完成时间'
                        name='time'
                        validateTrigger='onBlur'
                        rules={[{ required: true, message: '请选择时间' }]}
                    >
                        <DatePicker showTime></DatePicker>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default connect((state) => state.task)(Task)
