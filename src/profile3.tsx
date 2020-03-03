import React from 'react'
import { Card, Icon } from '@blueprintjs/core'

const dateToStr = (date: Date): string => {
    return `${date.day} ${date.month}, ${date.year}`
}

export type Sex = "female" | "male"

export enum Title {
    /**
     * Mister
     * 
     * For men, regardless of marital status, who do not have another professional or academic title.
    */
    Mr = "Mr",
    /**
     * Mistress
     * 
     * For married women who do not have another professional or academic title.
    */
    Mrs = "Mrs",
    /**
     * Miss
     * 
     * For girls, unmarried women and married women who continue to use their maiden name.
     * */
    Miss = "Miss",
    /**
     * Mistress
     * 
     * For women, regardless of marital status or when marital status is unknown
     */
    Ms = "Ms",
    /**
     * Doctor
     * 
     * For the holder of a doctoral degree (e.g. PhD, DPhil, MD, or DO in many countries) and for medical practitioners.
     */
    Dr = "Dr"
}

export type Day = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
                | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20
                | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30
                | 31
export enum Month {
    JAN = "January",
    FEB = "February",
    MAR = "March",
    APR = "April",
    MAY = "May",
    JUN = "June",
    JUL = "July",
    AUG = "August",
    SEP = "September",
    OCT = "October",
    NOV = "November",
    DEC = "December"
}
export type Year = number
export type Date = {
    day: Day
    month: Month
    year: Year
}

export type RelationshipStatus = "single" | "in relationship" | "engaged" | "married" | "divorced" | "widowed"


type Post = {
    date: Date
    content: string
    visibility: PostVisibility
}

type PostVisibility =
| "public"
| "friends-only"
| "only-me"

type ProfileProps = {
    name: {
        title?: Title
        first: string
        last: string
    }
    dob: Date
    sex: Sex
    relationship_status: RelationshipStatus
    posts: Post[]
}

const Profile: React.FC<ProfileProps> = ({
    name: {
        first,
        last,
        title
    },
    dob,
    sex,
    relationship_status,
    posts,
}) => {
    return (
        <Card elevation={2} style={{width: "600px", margin: "40px auto"}}>
            <h1>{title && Title[title]} {first} {last}</h1>
            <p><strong>DoB:</strong>{dateToStr(dob)} ({(new Date()).getFullYear()-dob.year} years old)</p>
            <p><strong>Sex:</strong>{sex}</p>
            <p><strong>Relationship status:</strong>{relationship_status}</p>
            <hr />

            <h4>Posts:</h4>

            {
                posts.map((post, id) => (
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

export default Profile