import React, {PureComponent} from 'react'
import { Layout, Menu } from 'antd'
const { Header } = Layout;
const storage = 'https://penedge.sgp1.digitaloceanspaces.com';
export default class Navbar extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
    }
    render() {
        const { admin } = this.props;
        return (
            <React.Fragment>
                <Header className="header custom-header">
                    <div className="logo">
                        <a href={'/dashboard'}>
                            <img src={`https://penedge.sgp1.digitaloceanspaces.com/asset/penedgeLogo.png`} alt="penedge logo" />
                        </a>
                    </div>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{ lineHeight: '64px', float: 'right' }}>
                        <Menu.Item key="1" style={{ backgroundColor: 'transparent' }}>
                            <span className="adminName">{admin.username}</span>
                        </Menu.Item>
                        <Menu.Item key="2" style={{ backgroundColor: 'transparent' }}>
                            <div className="avatar">
                            {!this.state.loading && <img src={`${storage}/profile_image/${admin.image}`} alt={`profile : ${admin.username}`} />}
                            </div>
                        </Menu.Item>
                    </Menu>
                </Header>
                <style>{`
                .custom-header{overflow:hidden;height:80px}.logo{height:64px;overflow:hidden;float:left;position:relative;top:4px;padding:3px}.logo img{max-width:100%;height:100%;object-fit:cover;position:relative}.adminName{font-size:18px;text-transform:capitalize;color:#fff;font-weight:700}.avatar img{width:66px;height:66px;padding:8px;overflow:hidden;margin-top:6px;border-radius:100%;object-fit:cover}
                @media screen and (min-width: 320px) and (max-width: 420px) {
                    .custom-header {
                        padding: 20px;
                        padding-top: 0;
                    }
                }
            `}</style>
            </React.Fragment>
        );
    }
}