import { useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import useForm from '../hooks/useForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props){

    const {values, setValues, handleChange, errors, setErrors, isValid} = useForm({
        name: '',
        about: '',
      })

    const currentUser = useContext(CurrentUserContext);
    
    useEffect(() => {
        setValues({
            name: currentUser.name,
            description: currentUser.about
        })
        setErrors({})
      }, [currentUser, props.isOpen]); 

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (isValid) {
            props.onUpdateUser({
                name: values.name,
                about: values.description,
            });
        }
    }

    return (
        <PopupWithForm 
            onSubmit={handleSubmit}
            name="edit" 
            title="Редактировать профиль" 
            buttonText={props.isLoading ? 'Сохранение...' : 'Сохранить'}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onCloseOverlay={props.onCloseOverlay} 
            isValid={isValid} >
                <input
                    type="text"
                    autoComplete="off"
                    name="name"
                    className="popup__field popup__field_type_name"
                    id="profileName"
                    placeholder="Имя"
                    maxLength="40"
                    minLength="2"
                    required
                    value={values.name || ''}
                    onChange={handleChange}
                />
                <span id="name-error" className={`popup__error ${isValid ? '' : 'popup__error_visible'}`}>{errors.name}</span>
                <input
                    type="text"
                    autoComplete="off"
                    name="description"
                    className="popup__field popup__field_type_text"
                    id="profileText"
                    placeholder="О себе"
                    maxLength="200"
                    minLength="2"
                    required
                    value={values.description || ''}
                    onChange={handleChange}
                />
                <span id="name-error" className={`popup__error ${isValid ? '' : 'popup__error_visible'}`}>{errors.description}</span>
            </PopupWithForm>
    )

}

export default EditProfilePopup;