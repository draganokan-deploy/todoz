import React from 'react'
import {Card, Icon} from '@blueprintjs/core'

const dateToStr = (date) => {
    return `${date.day} ${date.month}, ${date.year}`
}

function Profile1(props) {
    return (
        <Card elevation={2} style={{width: "600px", margin: "40px auto"}}>
            <h1>{props.name.title} {props.name.first} {props.name.last}</h1>
            <p><strong>DoB:</strong>{dateToStr(props.dob)} ({(new Date()).getFullYear()-props.dob.year} years old)</p>
            <p><strong>Sex:</strong>{props.sex}</p>
            <p><strong>Relationship status:</strong>{props.relationship_status}</p>
            <hr />

            <h4>Posts:</h4>

            {
                props.posts.map((post, id) => (
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

export default Profile1