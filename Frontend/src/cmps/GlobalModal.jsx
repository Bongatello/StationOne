import { eventBus } from '../services/event-bus.service.js'
import { useEffect, useRef, useState } from 'react'

import { StationEdit } from './DynamicCmps/StationEdit.jsx'

export function GlobalModal() {
    const [modal, setModal] = useState(null)
    const dialogRef = useRef(null)

    useEffect(() => {
        const subscription = []

        subscription[0] = eventBus.on('show-modal', (modal) => {
            dialogRef.current.showModal()
            setModal(modal)
        })

        subscription[1] = eventBus.on('close-modal', (modal) => {
            dialogRef.current.close()
            setModal(null)
        })
        return () => {
            subscription.forEach(sub => sub())
        }


    }, [])


    function onCloseModal(ev) {
        if (ev.target.classList.contains("modal-screen")) dialogRef.current.close()
        if (ev.target.closest(".close-btn") || ev.target.closest(".save-btn")) {
            dialogRef.current.close()
        }
    }



    return (
        <><dialog ref={dialogRef} className={'modal ' + modal?.type} onClick={(ev) => onCloseModal(ev)}>
            <DynamicModal type={modal?.type} />
        </dialog></>
    )
}

function DynamicModal(props) {
    switch (props.type) {
        case 'test':
            return <div>Hello World</div>
        case 'station-edit':
            return <StationEdit {...props} />
        case 'number':
            return <ShowSettings {...props} />
        case 'more-options':
            return <MoreOptions {...props} />
    }
}