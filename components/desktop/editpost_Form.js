import React, { PureComponent } from 'react';
import { Upload, Icon, Select, notification, Input } from 'antd'
import axios from 'axios'
export default class Edit_post extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            title: [],
            image: [],
            content: [],
            tabPosition: 'top',
            preview: null,
            cover: undefined,
            tags: [
                {
                    "id": 1,
                    "type": "adventure"
                },
                {
                    "id": 2,
                    "type": "action"
                },
                {
                    "id": 3,
                    "type": "fiction"
                },
                {
                    "id": 4,
                    "type": "news"
                },
                {
                    "id": 5,
                    "type": "romantic"
                },
                {
                    "id": 6,
                    "type": "fantasy"
                },
                {
                    "id": 7,
                    "type": "detective"
                },
                {
                    "id": 8,
                    "type": "movies"
                },
                {
                    "id": 9,
                    "type": "technology"
                },
                {
                    "id": 10,
                    "type": "animation"
                },
                {
                    "id": 11,
                    "type": "cartoon"
                },
                {
                    "id": 12,
                    "type": "games"
                },
                {
                    "id": 13,
                    "type": "travel"
                },
                {
                    "id": 14,
                    "type": "food"
                },
                {
                    "id": 15,
                    "type": "erotic"
                }
            ],
            hashtag: null,
            albums: [],
            multiFile: [],
            selectedItems: [],
            bankAccount_name: [],
            bank_name: [,
                {
                    id: 1,
                    name: "KBANK"
                },
                {
                    id: 2,
                    name: "SCB"
                },
                {
                    id: 3,
                    name: "Bangkok Bank"
                },
                {
                    id: 4,
                    name: "Krung Thai Bank"
                },
                {
                    id: 5,
                    name: "Krungsri"
                },
                {
                    id: 6,
                    name: "UOB"
                }
            ],
            selectted_banks: [],
            bankAccount: [],
            price: []
        };
    }
    componentDidMount() {
        const { title, content, albums, image } = this.props.edit;
        this.setState({
            title, content, albums, image
        });
    }
    // editCover
    getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    upload = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: true,
                    preview: URL.createObjectURL(info.file.originFileObj),
                    cover: info.file.originFileObj
                }),
            );
            const formData = new FormData();
            formData.append('image', info.file.originFileObj.name);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            axios.put(`/ChangeCoverBlog/${this.props.id}`, formData, config).then((res) => {
                notification.open({
                    message: 'congrats',
                    description: 'saved Successful',
                    icon: <Icon type="picture" />,
                });
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
            });
        }
    }
    hashtag = (selectedItems) => {
        this.setState({
            selectedItems
        })
    };
    upload_albums = (info) => {
        this.setState({
            multiFile: info.fileList
        })
        const formData = new FormData();
        let newAlbums = [];
        for (let i = 0; i < this.state.multiFile.length; i++) {
            const file = this.state.multiFile[i].originFileObj;
            formData.append('multiFile', file);
            const file_name = (this.state.multiFile[i], { photo: this.state.multiFile[i].name });
            //const json = JSON.stringify(file_name);
            newAlbums.push(file_name);
        }
        //formData.append('albums', newAlbums);
        for (let j = 0; j < newAlbums.length; j++) {
            formData.append('albums', newAlbums[j].photo)
        }
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        for (let j = 0; j < this.state.multiFile.length; j++) {
            var { percent } = this.state.multiFile[j];
        }
        axios.put(`/ChangeAlbumsBlog/${this.props.id}`, formData, config).then((res) => {
            setTimeout(() => {
                if (percent === 100) {
                    notification.open({
                        message: 'congrats',
                        description: 'saved Successful',
                        icon: <Icon type="picture" />,
                    });
                }
            }, 1300)
        });
    }
    edit_Title = (e) => {
        this.setState({
            title: e.target.value
        })
    }
    edit_Content = (e) => {
        this.setState({
            content: e.target.value
        });
    }
    bankAccount = (e) => {
        this.setState({
            bankAccount: e.target.value
        })
    }
    price = (e) => {
        this.setState({
            price: e.target.value
        })
    }
    bankAccount_name = (e) => {
        this.setState({
            bankAccount_name: e.target.value
        })
    }
    selected_Bank = (selectted_banks) => {
        this.setState({
            selectted_banks
        })
    }
    publish = (e) => {
        e.preventDefault();
        const data = {
            title: this.state.title,
            content: this.state.content
        }
        //Change Title
        axios.put(`/ChangeTitleBlog/${this.props.id}`, data).then((res) => {

        });
        //Change Content
        axios.put(`/ChangeContentBlog/${this.props.id}`, data).then((res) => {

        });
        // Change category
        const box = [];
        for (let i = 0; i < this.state.selectedItems.length; i++) {
            const categories = Object.assign(this.state.selectedItems[i] + "\n");
            box.push(categories);
        }
        const category = {
            category: box
        }
        axios.put(`/ChangeCategoryBlog/${this.props.id}`, category).then((res) => {
        });
        const ChangebankAccount_name = {
            bankAccount_name: this.state.bankAccount_name
        }
        axios.put(`/ChangebankAccount_name/${this.props.id}`, ChangebankAccount_name).then((res) => {
        });
        const bank = {
            bankAccount: this.state.bankAccount
        }
        axios.put(`/ChangeBankAccount/${this.props.id}`, bank).then((res) => {
        });
        const newPrice = {
            price: this.state.price
        }
        axios.put(`/ChangePrice/${this.props.id}`, newPrice).then((res) => {
        });
        //ChangeBank
        const ChangeBank = {
            selectted_banks: this.state.selectted_banks
        }
        axios.put(`/ChangeBank/${this.props.id}`, ChangeBank).then((res) => {
        });
        notification.open({
            message: 'congrats',
            description: 'Edit you blog successful',
            icon: <Icon type="form" />,
        });
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }
    render() {
        const uploadButton = (
            <div>
                <Icon style={{ marginBottom: 14, fontSize: 43 }} type={this.state.loading ? 'loading' : 'picture'} />
                <div className="ant-upload-text">Add Cover</div>
            </div>
        );
        const albumsButton = (
            <div>
                <Icon style={{ marginBottom: 14, fontSize: 43 }}
                    type="picture" />
                <div className="ant-upload-text">Albums</div>
            </div>
        );
        const { preview } = this.state;
        const { selectedItems, multiFile,selectted_banks, bank_name } = this.state;
        return (
            <div>
                <form onSubmit={this.publish}>
                    <div className="clearfix">
                        <Upload
                            listType="picture-card"
                            className="editCoverImage"
                            showUploadList={false}
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            onChange={this.upload}
                        >
                            {preview ? <img src={preview} style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
                        <input className="editStory" value={this.state.title} placeholder="Story Title" type="text" onChange={this.edit_Title} />
                        <textarea className="editContent" value={this.state.content} placeholder="Add Content here" type="text" onChange={this.edit_Content}>
                        </textarea>
                        <br />
                        <Upload
                            multiple={true}
                            className="EditAlbums"
                            action={'https://www.mocky.io/v2/5cc8019d300000980a055e76'}
                            listType="picture-card"
                            onChange={this.upload_albums}
                        >
                            {multiFile.length >= 8 ? null : albumsButton}
                        </Upload>
                        <br />
                        <Select
                            style={{ width: '100%', marginBottom: 20 }}
                            mode="multiple"
                            placeholder="Selected Stories Category"
                            value={selectedItems}
                            onChange={this.hashtag}
                            showArrow={false}>
                            {
                                Object.values(this.state.tags).map((item) => (
                                    <Select.Option key={item.id} value={item.type}>
                                        {item.type}
                                    </Select.Option>
                                ))
                            }
                        </Select>
                        <h3>Select Bank</h3>
                        <Select
                            style={{ width: 300, marginBottom: 20 }}
                            placeholder="Selected BANKS"
                            value={selectted_banks}
                            onChange={this.selected_Bank}
                            showArrow={false}>
                            {
                                Object.values(bank_name).map((item) => (
                                    <Select.Option key={item.id} value={item.name}>
                                        {item.name}
                                    </Select.Option>
                                ))
                            }
                        </Select>
                        <h3>Account name</h3>
                        <Input prefix={<Icon type="user" />} style={{ width: 300, marginBottom: 20 }} onChange={this.bankAccount_name.bind(this)} placeholder={'ACCOUNT NAME'} />
                        <br />
                        <h3>Add bank account</h3>
                        <Input type="password" prefix={<Icon type="bank" />} style={{ width: 300 }} onChange={this.bankAccount.bind(this)} placeholder={'BANK ACCOUNT NUMBERS'} />
                        <br />
                        <br />
                        <h3>Add Price</h3>
                        <Input style={{ width: 300,marginBottom:25 }} placeholder={'Add Price here'} onChange={this.price.bind(this)} suffix="THB" />
                        <div className="clearfix">
                            <button className="PublishSaved" type="submit">Publish</button>
                        </div>
                    </div>
                </form>
                <style>{`
                    .clearfix {
                        clear:both;
                    }
                    .editStory {
                        width: 100%;
                        margin-bottom: 20px;
                        border: 0;
                        text-transform: capitalize;
                        font-weight: bold;
                        font-size: 20px;
                    }
                    .editContent {
                        font-size: 12px;
                        width: 100%;
                        height: 310px;
                        overflow-y: auto;
                        margin-bottom: 20px;
                        border: 0;
                        line-height: 28px;
                        white-space: normal;
                        word-spacing: normal;
                        outline: none !important;
                    }
                    .editCoverImage > .ant-upload {
                        width: 100%;
                        height: 180px;
                    }
                    .PublishSaved {
                        width: 136px;
                        font-size: 11.3px;
                        height: 35px;
                        border: 0;
                        border-radius: 4px;
                        background-color: #f26522;
                        color: #fff;
                        cursor: pointer;
                    }
                    .EditAlbums > .ant-upload {
                        width: 210px;
                        height: 160px;
                        margin-bottom: 20px;
                    }
                 `}</style>
            </div>
        );
    }
}