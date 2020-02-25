import React from 'react'
import T from 'prop-types'
import { Card, Icon } from '@blueprintjs/core'

const dateToStr = (date) => {
    return `${date.day} ${date.month}, ${date.year}`
}

// propTypes often not utilized fully
// propTypes are runtime check -> additional overhead and not helpful while developing (i.e. no suggestions in IDE)
// writing prop types is not reusable for other checks in the code (can be reused only on component, and even then it's rarely reused, it's more often just repeated (this leads to inconsistencies))

class Profile extends React.Component {
    static propTypes = {
        name: T.object,
        dob: T.object,
        sex: T.string,
        relationship_status: T.string,
        posts: T.array
    }

    render() {
        return (
            <Card elevation={2} style={{width: "600px", margin: "40px auto"}}>
                <h1>{this.props.name.title} {this.props.name.first} {this.props.name.last}</h1>
                <p><strong>DoB:</strong>{dateToStr(this.props.dob)} ({(new Date()).getFullYear()-this.props.dob.year} years old)</p>
                <p><strong>Sex:</strong>{this.props.sex}</p>
                <p><strong>Relationship status:</strong>{this.props.relationship_status}</p>
                <hr />

                <h4>Posts:</h4>

                {
                    this.props.posts.map((post, id) => (
                        <Card key={id} elevation={0}>
                            <div style={{
                                display: "grid",
                                alignItems: "center",
                                gridTemplateColumns: "minmax(0, max-content) minmax(0, max-content)",
                                columnGap: "5px",
                                marginBottom: "20px"
                            }}>
                                <small>{dateToStr(post.date)}</small>
                                <Icon icon={post.visibility==="public"?"globe":post.visibility==="only-me"?"lock":"following"} iconSize={12} />
                            </div>
                            <p>{post.content}</p>
                        </Card>
                    ))
                }
            </Card>
        )
    }
}

export default Profile

/*

correct prop types:

    static propTypes = {
        name: T.object,
        dob: T.shape({
            day: T.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10
            , 11, 12, 13, 14, 15, 16, 17, 18, 19, 20
            , 21, 22, 23, 24, 25, 26, 27, 28, 29, 30
            , 31]),
            month: T.oneOf(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]),
            year: T.number
        }),
        sex: T.oneOf(["female", "male"]),
        relationship_status: T.oneOf(["single", "in relationship", "engaged", "married", "divorced", "widowed"]),
        posts: T.arrayOf(T.shape({
            date: T.shape({
                day: T.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10
                , 11, 12, 13, 14, 15, 16, 17, 18, 19, 20
                , 21, 22, 23, 24, 25, 26, 27, 28, 29, 30
                , 31]),
                month: T.oneOf(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]),
                year: T.number
            }),
            visibility: T.oneOf(["public", "friends-only"]),
            content: T.string
        }))
    }

*/