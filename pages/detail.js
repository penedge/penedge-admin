import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import axios from 'axios'
import { Layout, Menu, Icon, Col, Row, List } from 'antd';
import dynamic from 'next/dynamic';
const { Header } = Layout;
const storage = 'https://penedge.sgp1.digitaloceanspaces.com/content';
const OthersPost = dynamic(import("../components/desktop/OthersPost"))
const detail = ({ url: { query: { id } } }) => {
    const [loading, setLoad] = useState(false);
    const [blog, setBlog] = useState([]);
    useEffect(() => {
        axios.get(`/detail/${id}`).then((res) => {
            if (res.data === null || res.data === undefined) {
                setBlog([])
            }
            else {
                setBlog(res.data)
            }
        })
    }, []);
    const multiplyPhoto = (albums) => {
        if (Object.values(albums).length === 0) {
            <div></div>
        }
        else {
            return (
                <div>
                    <List dataSource={albums} renderItem={List => (
                        <li key={List._id}>
                            <div className="albumsCover">
                                <img src={`${storage}/${List}`} alt={List} />
                            </div>
                        </li>
                    )} />
                </div>
            )
        }
    }
    const payment = (account_name, bankAccount, banks, price) => {
        if (account_name === undefined && bankAccount === undefined && banks === undefined && price === undefined) {
            return (
                <div>
                </div>
            )
        }
        else {
            return (
                <div>
                    <h2>Payment method</h2>
                    <p style={{ textTransform: 'uppercase', paddingLeft: '20px' }}>account name : <span style={{ fontWeight: 'bold', color: 'rgb(238, 99, 34)' }}>{account_name}</span></p>
                    <p style={{ textTransform: 'uppercase', paddingLeft: '20px' }}>bank account : <span style={{ fontWeight: 'bold', color: 'rgb(238, 99, 34)' }}>{bankAccount}</span></p>
                    <p style={{ textTransform: 'uppercase', paddingLeft: '20px' }}>banks : <span style={{ fontWeight: 'bold', color: 'rgb(238, 99, 34)' }}>{banks}</span></p>
                    <p style={{ textTransform: 'uppercase', paddingLeft: '20px' }}>price : <span style={{ fontWeight: 'bold', color: 'rgb(238, 99, 34)' }}>{price}</span></p>
                </div>
            )
        }
    }
    return (
        <div>
            <Head>
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.23.6/antd.min.css" />
                <link type="text/css" href="https://fonts.googleapis.com/css?family=Kanit:100,300,400,400i,500&display=swap&subset=latin-ext,thai,vietnamese" rel="stylesheet" />
                <script type="text/javascript" async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v5.0&appId=133758567104408&autoLogAppEvents=1"></script>
            </Head>
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
                        <a href={'/dashboard'}><span style={{ textTransform: 'capitalize' }} className="adminName">back to admin</span></a>
                    </Menu.Item>
                </Menu>
            </Header>
            <Row>
                <div style={{ padding: 40 }}>
                    <Col md={{ span: 12 }} className="blog">
                        {
                            !loading && Object.values(blog).map((item) => (
                                <div>
                                    <div className="storyName">
                                        <h1>{item.title}</h1>
                                        <div>
                                            <span><Icon type="user" style={{ marginRight: 11 }} />by : <span style={{ textTransform: 'capitalize', marginRight: 15 }}>{item.author}</span><Icon type="calendar" style={{ marginRight: 11 }} />{item.date}</span>
                                        </div>
                                        <br />
                                        <div className="cover">
                                            <img src={`${storage}/${item.image}`} />
                                        </div>
                                        <br />
                                        <p>
                                            {item.content}
                                        </p>
                                        <br />
                                        {multiplyPhoto(item.albums)}
                                    </div>
                                </div>
                            ))
                        }
                    </Col>
                    <Col md={{ span: 8 }} className="sideRight">
                        {
                            Object.values(blog).map((transaction) => (
                                <div>
                                    {payment(transaction.bankAccount_name, transaction.bankAccount, transaction.selectted_banks, transaction.price)}
                                </div>
                            ))
                        }
                        <div style={{ marginLeft: 20 }}>
                            <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fpenedgeworld%2F&tabs=timeline&width=300&height=500&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=true&appId=133758567104408" width="300" height="500" style={{ border: 'none', overflow: 'hidden' }} scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>
                        </div>
                        <h2>Categories</h2>
                        {
                            Object.values(blog).map((list) => (
                                <div>
                                    <li className="categoryList" style={{ fontSize: 16.5, listStyle: 'none', marginLeft: 21, whiteSpace: "pre-line", lineHeight: "33px", textTransform: "capitalize" }}>{list.category}</li>
                                </div>
                            ))
                        }
                        <h2>RECENT POSTS</h2>
                        <OthersPost />
                    </Col>
                </div>
            </Row>
            <Row className="clearfix">
                <Col className="footer" md={{ span: 12 }}>
                    <div>
                        <h3 style={{ color: '#fff', fontWeight: 'lighter' }}>Penedge@copyright</h3>
                    </div>
                </Col>
            </Row>
            <style>{`
                body {
                    background-color: #f5f5f5 !important;
                }
                .clearfix {
                    clear:both;
                }
                #components-layout-demo-top .logo {
                    width: 120px;
                    height: 31px;
                    background: rgba(255, 255, 255, 0.2);
                    margin: 16px 24px 16px 0;
                    float: left;
                }
                .logo {
                    height: 64px;
                    overflow: hidden;
                    float: left;
                    position: relative;
                    top: 4px;
                    padding: 3px;
                }
                .logo img {
                    max-width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .custom-header {
                    overflow: hidden;
                    height: 80px;
                }
                .blog {
                    padding: 30px;
                    width: 66%;
                    height: auto;
                    background-color: #fff;
                    border-radius: 8px;
                    float: left;
                    margin-bottom:50px;
                    box-shadow: 0px 2px 10px #00142912;
                }
                .sideRight {
                    padding: 10px;
                    padding-top:0;
                    height: auto;
                    border-radius: 8px;
                    float: left;
                }
                .sideRight h2 {
                    padding:20px;
                    padding-bottom: 0;
                    text-transform: uppercase;
                    font-weight: bold;
                }
                .footer {
                    width: 100%;
                    height: 80px;
                    background-color: #001429;
                    padding: 40px;
                    padding-top: 30px;
                    padding-bottom: 0;
                }
                .storyName {
                    width: 100%;
                }
                .storyName h1 {
                    padding-bottom: 0;
                    text-transform: capitalize;
                    font-family: sukhumvit set;
                    font-weight: bold;
                    line-height: 43px;
                }
                .storyName p {
                    font-size: 1.16rem;
                    font-family: 'Kanit', sans-serif, sukhumvit set;
                    font-weight: 300;
                    line-height: 31px;
                    color: #3d3d3d;
                }
                .cover {
                    width: 100%;
                    height: auto;
                }
                .cover img {
                    width: 100%;
                }
                .albumsCover img {
                    width: 50%;
                    height: auto;
                    float:left;
                    object-fit:cover;
                    padding: 15px;
                    padding-left: 0;
                }
                @media screen and (min-width: 320px) and (max-width:420px) {
                    .blog {
                        width: 100%;  
                    }
                    .sideRight {
                        padding: 0;
                    }
                    .storyName p {
                        font-size: 14px;
                    }
                }
            `}</style>
        </div>
    )
}
export default detail;