import PopupWithForm from './PopupWithForm';

function DeletePlacePopup(props){

    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.onOK(props.card);
    }

    return(
        <PopupWithForm 
          name="delete" 
          title="Вы уверены?" 
          buttonText={props.isLoading ? 'Удаление...' : 'Да'}
          isOpen={props.isOpen}
          onClose={props.onClose} 
          onCloseOverlay={props.onCloseOverlay}
          isValid={props.isValid}
          onSubmit={handleSubmit}/>
    )
}

export default DeletePlacePopup;