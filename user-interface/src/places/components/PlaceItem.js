import React, { useState, useContext } from 'react'
import Card from "../../shared/components/UIElements/Card"
import Button from "../../shared/components/FormElements/Button"
import Modal from "../../shared/components/UIElements/Modal"
import Map from "../../shared/components/UIElements/Map"
import { useHttpClient } from "../../shared/hooks/http-hook"
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import { AuthContext } from "../../shared/context/auth-context"
import "./PlaceItem.css"


const PlaceItem = (props) => {
    const auth = useContext(AuthContext)
    const { isLoading, error, sendRequest, clearError } = useHttpClient()

    const [showMap, setShowMap] = useState(false)

    const [showConfirmModal, setShowConfirmModal] = useState(false)

    const openMapHandler = () => setShowMap(true)
    const closeMapHandler = () => setShowMap(false)

    const showDeleteWarningHandler = () => {
        setShowConfirmModal(true)
    }

    const cancelDeleteHandler = () => {
        setShowConfirmModal(false)
    }

    const confirmDeleteHandler = async () => {
        setShowConfirmModal(false)
        try {
            await sendRequest(`http://localhost:5000/api/places/${props.id}`, "DELETE")

            props.onDelete(props.id)
        } catch (err) {

        }
    }
    return (
        <>
            <ErrorModal error={error} onCancel={clearError} />
            <Modal
                show={showMap}
                onCancel={closeMapHandler}
                header={props.address}
                content={"place-item__modal-content"}
                footerClass="place-item__modal-actions"
                footer={<Button>Close</Button>}>
                <div className="map-container">
                    <Map center={props.coordinates} zoom={16} />
                </div>
            </Modal>

            <Modal
                show={showConfirmModal}
                onCancel={cancelDeleteHandler}
                header="Are you sure?"
                footerClass="place-item__modal-actions"
                footer={
                    <>
                        <Button inverse onClick={cancelDeleteHandler}>Cancel</Button>
                        <Button danger onClick={confirmDeleteHandler}>Delete</Button>
                    </>
                }
            >
                <p>Do you want to proceed and delete this place. please know this is permanent</p>
            </Modal>


            <li className="place-item">
                <Card className="place-item__content">
                    {isLoading && <LoadingSpinner asOverlay />}
                    <div className="place-item__image">
                        <img src={props.image} alt={props.title} />
                    </div>
                    <div className="place-item__info">
                        <h2>{props.title}</h2>
                        <h3>{props.address}</h3>
                        <p>{props.description}</p>
                    </div>
                    <div className="place-item__actions">
                        <Button inverse onClick={openMapHandler}>View On Map</Button>

                        {auth.userId === props.creatorId && (

                            <Button to={`/places/${props.id}`}>Edit</Button>
                        )}
                        {auth.userId === props.creatorId && (
                            <Button danger onClick={showDeleteWarningHandler}>Delete</Button>

                        )}




                    </div>
                </Card>
            </li>
        </>
    )
}

export default PlaceItem
