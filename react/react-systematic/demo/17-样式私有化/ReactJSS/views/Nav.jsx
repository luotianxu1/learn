import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
    box: {
        backgroundColor: 'lightblue',
        width: '300px',
    },
    title: {
        fontSize: '20px',
        color: (props) => props.color,
        '&:hover': {
            color: 'green',
        },
    },
    list: {
        '& a': {
            fontSize: '16px',
            color: '#000',
        },
    },
})

const Nav = function Nav() {
    let { box, title, list } = useStyles({
        size: '14',
        color: 'orange',
    })
    return (
        <nav className={box}>
            <h2 className={title}>购物商城</h2>
            <div className={list}>
                <a href=''>首页</a>
                <a href=''>秒杀</a>
                <a href=''>我的</a>
            </div>
        </nav>
    )
}

export default Nav
