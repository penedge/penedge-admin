import React from 'react'
import axios from 'axios'
import Link from 'next/link'
export default class OthersPost extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            articleList: []
        }
    }
    componentDidMount() {
        axios.get(`/blog`).then((res)=> {
            if (res.data === null || res.data === undefined) {
                this.setState({
                    articleList: []
                })
            }
            else {
                this.setState({
                    articleList: res.data
                })
            }
        })
    }
    render() {
        return (
            <div>
                {
                    Object.values(this.state.articleList).map((list) => (
                        <div>
                            <Link href={{ pathname: 'detail', query: { id: list._id } }}>
                                <li style={{ fontSize: 16.5, listStyle: 'none', marginLeft: 21, cursor: 'pointer',lineHeight:'43px',textTransform:'capitalize'}}>{list.title}</li>
                            </Link>
                        </div>
                    ))
                }
            </div>
        )
    }
}