import React, { useState, useRef, useEffect } from 'react'
import ApiManager from '../../modules/ApiManager'

const DesignForm = props => {
    const [loadingStatus, setLoadingStatus] = useState(false)
    const [fabrics, setFabrics] = useState([])
    const [finishedSizes, setFinishedSizes] = useState([])


    const [photoLink, setPhotoLink] = useState("")

    const title = useRef()
    const description = useRef()
    const startDate = useRef()
    const completedDate = useRef()
    const fabricId = useRef()
    const finishedSizeId = useRef()

    const getFabrics = () => {
        ApiManager.getAll("fabrics")
            .then(fabrics => setFabrics(fabrics))
    }

    const getFinishedSizes = () => {
        ApiManager.getAll("finishedSizes")
            .then(finishedSizes => setFinishedSizes(finishedSizes))

    }

    useEffect(getFabrics, [])
    useEffect(getFinishedSizes, [])


    const createNewDesign = () => {
        const design = {
            title: title.current.value,
            description: description.current.value,
            startDate: startDate.current.value,
            completedDate: completedDate.current.value,
            fabricId: Number(fabricId.current.value),
            finishedSizeId: Number(finishedSizeId.current.value),
            userId: Number(localStorage.getItem("currUserId"))
        }

        // ApiManager.post("designs", design)
        // .then(() => props.history.push("/"))

        console.log(design)
    }

    return (
        <>
            <form>
                <fieldset>
                    <div className="formgrid">
                        <input
                            type="text"
                            required
                            ref={title}
                            id="designTitle"
                            placeholder="Design Title"
                        />
                        <label htmlFor="designTitle">Title</label>
                    </div>

                    <div className="formgrid">
                        <textarea
                            ref={description}
                            id="designDescription"
                        ></textarea>
                        <label htmlFor="designDescription">Description</label>
                    </div>

                    <div className="formgrid">
                        <input
                            type="date"
                            ref={startDate}
                            id="designStarted"
                        />
                        <label htmlFor="designStarted">Started On:</label>
                    </div>

                    <div className="formgrid">
                        <input
                            type="date"
                            ref={completedDate}
                            id="designCompleted"
                        />
                        <label htmlFor="designCompleted">Completed On:</label>
                    </div>

                    <div className="formGrid">
                        <select id="designFabric" ref={fabricId}>
                            {
fabrics.map(fabric => <option key={fabric.id} value={fabric.id}>{fabric.brand} {fabric.count} {fabric.color}</option>)
                            }
                        </select>
                        <label htmlFor="designFabric">Fabric Type:</label>

                    </div>
                    <div className="formGrid">
                    <select ref={finishedSizeId}>
                            {
                                finishedSizes.map(fSize => <option key={fSize.id} value={fSize.id}>{fSize.size}</option>)
                            }
                        </select>
                    </div>
                    <div className="alignRight">
                        <button
                            type="button"
                            disabled={loadingStatus}
                            onClick={createNewDesign}
                        >Submit</button>
                    </div>
                </fieldset>
            </form>
        </>
    )


}

export default DesignForm