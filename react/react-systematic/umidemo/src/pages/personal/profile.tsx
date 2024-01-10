import {
    withRouter,
    useSearchParams,
    createSearchParams,
    useLocation,
} from 'umi'

const ProfilePage = ({ location }) => {
    // console.log(location.search)
    // const usp = new URLSearchParams(location.search)
    // console.log(usp.get('lx'))
    // console.log(createSearchParams(usp))

    // const [usp] = useSearchParams()
    // console.log(usp.get('lx'))

    const locationv6 = useLocation()
    console.log(location.state, locationv6.state)

    return <div>个人信息</div>
}

export default withRouter(ProfilePage)
