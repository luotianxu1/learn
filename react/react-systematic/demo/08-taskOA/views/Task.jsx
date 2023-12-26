import React from 'react'
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
import { flushSync } from 'react-dom'

const zero = function zero(text) {
    text = String(text)
    return text.length < 2 ? '0' + text : text
}

const formatTime = function formatTime(time) {
    let arr = time.match(/\d+/g)
    let [, month, day, hours = '00', minutes = '00'] = arr
    return `${zero(month)}-${zero(day)} ${zero(hours)}:${zero(minutes)}`
}

class Task extends React.PureComponent {
    // 定义表格列的数据
    columns = [
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
                console.log(text)
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
                            onConfirm={this.handleRemove.bind(null, id)}
                        >
                            <Button type='link'>删除</Button>
                        </Popconfirm>
                        {+state === 2 ? (
                            <Popconfirm
                                title='您确定要把此任务设置为完成吗？'
                                onConfirm={this.handleUpdate.bind(null, id)}
                            >
                                <Button type='link'>完成</Button>
                            </Popconfirm>
                        ) : null}
                    </>
                )
            },
        },
    ]

    // 初始组件的状态
    state = {
        tableData: [],
        tableLoading: false,
        modalVisible: false,
        confirmLoading: false,
        selectedIndex: 0,
    }

    closeMoadl = () => {
        this.setState({
            modalVisible: false,
            confirmLoading: false,
        })
        this.formIns.resetFields()
    }

    submit = async () => {
        try {
            await this.formIns.validateFields()
            let { task, time } = this.formIns.getFieldValue()
            time = time.format('YYYY-MM-DD HH:mm:ss')
            console.log(task, time)
            message.success('提交成功')
            this.closeMoadl()
            this.queryData()
        } catch (_) {}
    }

    changeIndex = (index) => {
        if (this.state.selectedIndex === index) return
        // this.setState(
        //     {
        //         selectedIndex: index,
        //     },
        //     () => {
        //         this.queryData()
        //     }
        // )
        flushSync(() => {
            this.setState({
                selectedIndex: index,
            })
        })
        this.queryData()
    }

    queryData = () => {
        this.setState({
            tableData: [
                {
                    id: 1,
                    task: '今天天气很不错今天天气很不错今天天气很不错今天天气很不错今天天气很不错今天天气很不错今天天气很不错今天天气很不错',
                    state: 1,
                    time: '2022-11-29 18:00:00',
                    complete: '2022-11-30 18:00:00',
                },
                {
                    id: 2,
                    task: 'react',
                    state: 2,
                    time: '2022-11-29 18:00:00',
                    complete: '2022-11-30 18:00:00',
                },
            ],
        })
    }

    handleRemove = () => {}

    handleUpdate = () => {}

    componentDidMount() {
        this.queryData()
    }

    render() {
        let {
            tableData,
            tableLoading,
            modalVisible,
            confirmLoading,
            selectedIndex,
        } = this.state
        return (
            <div className='task-box'>
                {/* 头部 */}
                <div className='header'>
                    <h2 className='title'>TASK OA 任务管理系统</h2>
                    <Button
                        type='primary'
                        onClick={() => {
                            this.setState({
                                modalVisible: true,
                            })
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
                                onClick={this.changeIndex.bind(null, index)}
                            >
                                {item}
                            </Tag>
                        )
                    })}
                </div>

                {/* 表格 */}
                <Table
                    dataSource={tableData}
                    columns={this.columns}
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
                    onCancel={this.closeMoadl}
                    onOk={this.submit}
                >
                    <Form
                        ref={(x) => (this.formIns = x)}
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
}

export default Task
