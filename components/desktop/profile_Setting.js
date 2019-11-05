import React, { PureComponent } from 'react'
import { Form, Row, Col, Upload, Icon, Collapse, Modal, notification } from 'antd'
import axios from 'axios'
import jwt from 'jsonwebtoken'
const { Panel } = Collapse;
export default class ProfileSetting extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            loadingImage: false,
            account: [],
            username: null,
            password: null,
            profileImage: null,
            fileName: []
        }
    }
    componentDidMount() {
        this.setState({ account: this.props.setting })
    }
    getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    newProfile = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loadingImage: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loadingImage: false,
                    profileImage: info.file.originFileObj,
                    fileName: info.file.name
                }),
            );
            const formData = new FormData();
            formData.append('profileImage', info.file.originFileObj);
            formData.append('image', info.file.originFileObj.name);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            axios.put(`/changeProfileImage/${this.state.account._id}`, formData, config).then((res) => {
                notification.open({
                    message: 'congrats',
                    description: 'Change profile Successful',
                    icon: <Icon type="picture" />,
                });
            });
        }
    };
    newUsername = (e) => {
        this.setState({
            username: e.target.value,
            loading: true
        })
    }
    newPassword = (e) => {
        this.setState({
            password: e.target.value,
            loading: true
        })
    }
    saveChangeUsername = (e) => {
        e.preventDefault();
        e.target.reset();
        if (this.state.loading === false && this.state.username === null) {
            e.target.reset()
        }
        else {
            const decode = localStorage.getItem('auth');
            const getToken = jwt.decode(atob(decode));
            let user = {
                username: this.state.username,
                password: getToken.password
            }
            axios.put(`/changeUsername/${this.state.account._id}`, user).then((res) => {
                let tokenId = jwt.sign(user, JSON.stringify(this.state.username));
                localStorage.setItem('auth', btoa(tokenId));
            });
        }
    }
    saveChangePassword = (e) => {
        if (this.state.loading === false && this.state.password === null) {
            e.target.reset()
        }
        else {
            const decode = localStorage.getItem('auth');
            const getToken = jwt.decode(atob(decode));
            let user = {
                username: getToken.username,
                password: this.state.password
            }
            axios.put(`/changePassword/${this.state.account._id}`, user).then((res) => {
                let tokenId = jwt.sign(user, JSON.stringify(this.state.username));
                localStorage.setItem('auth', btoa(tokenId));
            });
        }
    }
    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loadingImage ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { imageUrl } = this.state;
        return (
            <React.Fragment>
                <div>
                    <Modal visible={this.props.modal_load} className="ProfileSettingContainer" footer={null} closable={false}>
                        <h2><strong>Profile Setting</strong></h2>
                        <br />
                        <form onSubmit={this.saveChangePassword}>
                            <div className="clearfix">
                                <Row gutter={16}>
                                    <div className="clearfix">
                                        <Col md={{ span: 12 }}>
                                            <Collapse className="custom-border" bordered={false} showArrow={true}>
                                                <Panel showArrow={false} header={<span><Icon style={{ marginRight: 10, fontSize: 18 }} type={'picture'} /><span style={{ textTransform: 'capitalize' }}>Change Profile</span><Icon className="customDrop_downIcon" type="caret-down" /></span>} key="1">
                                                    <Form onSubmit={this.saveChaneProfile} form={this.props.form}>
                                                        <div className="UploadContainer">
                                                            <Upload
                                                                name="avatar"
                                                                listType="picture-card"
                                                                className="ediUploadProfile"
                                                                showUploadList={false}
                                                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                                                onChange={this.newProfile}
                                                            >
                                                                {imageUrl ? <img src={imageUrl} className="changeProfile" /> : uploadButton}
                                                            </Upload>
                                                        </div>
                                                    </Form>
                                                </Panel>
                                            </Collapse>
                                        </Col>
                                        <Col md={{ span: 12 }}>
                                            <Collapse className="custom-border" bordered={false} showArrow={true}>
                                                <Panel showArrow={false} header={<span><Icon style={{ marginRight: 10, fontSize: 18 }} type={'lock'} /><span style={{ textTransform: 'capitalize' }}>Change password</span><Icon className="customDrop_downIcon" type="caret-down" /></span>} key="3">
                                                    <form className="editContainer">
                                                        <input className="ChangeForm" type="password" placeholder={'Change your password'} onChange={this.newPassword} style={{ marginBottom: 20 }} />
                                                    </form>
                                                </Panel>
                                            </Collapse>
                                        </Col>
                                    </div>
                                </Row>
                                <button className="save" type="submit">Save all setting</button>
                                <button style={{ width: '100%', height: 35, marginTop: 20, cursor: 'pointer', border: '1px solid' }} type="submit">Cancel</button>
                            </div>
                        </form>
                    </Modal>
                </div>
                <style>{`
                    .clearfix {
                        clear:both;
                    }
                    .custom-border .ant-collapse-item {
                        border-bottom: 0 !important;
                    }
                    .ProfileSettingContainer {
                        padding: 30px;
                        padding-left: 0;
                    }
                    .ProfileSettingContainer h2{
                        padding-left: 10px;
                    }
                    .customDrop_downIcon {
                        float:right;
                        position:relative;
                        top: 5px;
                    }
                    .editContainer {
                        padding: 0;
                    }
                    .custom-buttonSave {
                        margin-top: 15px;
                    }
                    .save {
                        width: 100%;
                        height: 35px;
                        border: 0;
                        border-radius: 4px;
                        background-color: #f26522;
                        color: #fff;
                        cursor:pointer;
                    }
                    .UploadContainer {
                        margin-bottom: 20px;
                    }
                    .ediUploadProfile{
                        margin-bottom: 20px;
                    }
                    .ediUploadProfile > .ant-upload {
                        width: 140px;
                        height: 140px;
                        overflow:hidden;
                        margin-bottom: 20px;
                    }
                    .changeProfile {
                        width: 100%;
                        height: 140px;
                        object-fit:cover;
                        overflow:hidden;
                    }
                    .ChangeForm {
                        width: 100%;
                        height: 35px;
                        padding: 4px 11px;
                        border-radius: 4px;
                        border: 1px solid #eee;
                    }
                    @media screen and (min-width:320px) and (max-width: 420px) {
                        .ProfileSettingContainer {
                            padding: 20px;
                            padding-left: 20px;
                        }
                        .ProfileSettingContainer h2{
                            padding-left: 10px;
                        }
                    }
                `}</style>
            </React.Fragment>
        )
    }
}