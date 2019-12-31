import React, { useState, useRef } from 'react'
import ApiManager from '../../modules/ApiManager'

const DesignForm = props => {
    const [loadingStatus, setLoadingStatus] = useState(false)
    const [fabrics, setFabrics] = useState([])
    const [finishedSizes, setFinishedSizes] = useState([])


    const [photoLink, setPhotoLink] = useState("")

    const title = useRef()
    const description = useRef()
    const completedDate = useRef()
    // const fabricId = useRef()
    // const finishedSizeId = useRef()

    //userId
    //lastUpdated

    const createNewDesign = () => {
        const design = {
            title: title.current.value,
            description: description.current.value,
            completedDate: completedDate.current.value,
            userId: Number(localStorage.getItem("currUserId"))
            // fabricId: fabricId.current.value,
            // finishedSizeId: finishedSizeId.current.value,
        }

        // ApiManager.post("designs", design)

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
                            ref={completedDate}
                            id="designCompleted"
                        />
                        <label htmlFor="designCompleted">Completed On:</label>
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