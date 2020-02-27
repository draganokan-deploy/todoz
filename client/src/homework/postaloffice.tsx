import React, { useState, useEffect, useRef } from 'react'
import {Button, InputGroup, Icon} from '@blueprintjs/core'

type POState = {
    addresses: string[]
    addr: string
}

const subscriptions: { [address: string]: (from: string) => void } = {}

const registerInbox = (address: string, handler: (from: string) => void) => {
    if (!subscriptions[address]) {
        subscriptions[address] = handler
    }
}

const sendMail = (from: string, to: string): boolean => {
    if (from===to) {
        return false
    }

    if (!subscriptions[to]) {
        return false
    }

    subscriptions[to](from)
    return true
}

const unregisterInbox = (address: string) => {
    if (subscriptions[address]) {
        delete subscriptions[address]
    }
}

const PostalOffice: React.FC = () => {

    const [state, setState] = useState<POState>({
        addresses: [],
        addr: ""
    })

    return (
        <div style={{width: "600px", margin: "40px auto", padding: "40px", border: "1px solid grey"}}>
            <h2>Postal Office</h2>
            {
                state.addresses.map(address => <Inbox key={address} address={address} />)
            }
            <InputGroup
                placeholder={"New address..."}
                intent={state.addresses.find(a => a===state.addr)===undefined?"none":"warning"}
                value={state.addr}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    
                    setState({
                        addr: e.target.value,
                        addresses: state.addresses
                    })
                }}
                spellCheck={false}
                onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === 'Enter') {
                        if (state.addresses.find(a => a===state.addr)===undefined) {
                            setState({
                                addr: "",
                                addresses: [...state.addresses, state.addr]
                            })
                        }
                    }
                }}
            />
            <Button icon="new-person" text="Add new address"/>
        </div>
    )
}

type InboxProps = {
    address: string
}

type InboxState = {
    destination: string
    received: string[]
    errorSending: boolean
}

const Inbox: React.FC<InboxProps> = ({ address }) => {
    const [state, setState] = useState<InboxState>({
        destination: "",
        received: [],
        errorSending: false
    })

    const setPartial = (change: Partial<InboxState>) => {
        setState({
            ...state,
            ...change
        })
    }

    const bl = useRef<InboxState>(state)

    const receive = (from: string) => {
        setPartial({
            received: [...bl.current.received, from]
        })
    }

    useEffect(()=>{
        registerInbox(address, receive)
    }, [])

    return (
        <div style={{border: "1px solid grey", padding: "5px", marginBottom: "10px"}}>
        <div style={{display: "grid", gridTemplateColumns: "max-content 1fr", columnGap: "10px", alignItems: "center"}}>
            <div>Address: {address}</div>
            <div>
                <InputGroup
                    placeholder={"Address where to send..."}
                    onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === 'Enter') {
                            if (sendMail(address, state.destination)) {
                                setPartial({
                                    destination: "",
                                    errorSending: false
                                })
                            } else {
                                setPartial({errorSending: true})
                            }
                        }
                    }}
                    value={state.destination}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setPartial({ destination: e.target.value, errorSending: false }) }}
                    spellCheck={false}
                    intent={state.errorSending?"danger":"none"}
                />
            </div>
        </div>
            <div><Icon icon="inbox" /> Inbox:</div>
            <div>
                {
                    state.received.map((msg, id) => <div key={id}>from: {msg} </div>)
                }
            </div>
        </div>
    )
}

export default PostalOffice