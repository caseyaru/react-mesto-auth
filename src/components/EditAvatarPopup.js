import { useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';
import useForm from '../hooks/useForm';

function EditAvatarPopup(props) {

    const {values, handleChange, errors, setErrors, isValid} = useForm({
      avatar: ''
    })

    //реф
    const avatarRef = useRef();

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if(isValid) {
            props.onUpdateAvatar({
              avatar: avatarRef.current.value,
            });
        }
    }

    //очистка формы перед открытием
    useEffect(() => {
      avatarRef.current.value = '';
      setErrors({});
    }, [props.isOpen]);

    return(
        <PopupWithForm 
          name="avatar" 
          title="Обновить аватар" 
          buttonText={props.isLoading ? 'Сохранение...' : 'Сохранить'}
          isOpen={props.isOpen}
          onClose={props.onClose}
          onCloseOverlay={props.onCloseOverlay}
          onSubmit={handleSubmit}
          isValid={isValid} >
            <input
              ref={avatarRef}
              value={values.avatar || ''}
              onChange={handleChange}
              type="url"
              autoComplete="off"
              name="avatar"
              id="avatar"
              className="popup__field popup__field_type_avatar"
              placeholder="Ссылка на изображение"
              required
            />
            <span id="name-error" className={`popup__error ${isValid ? '' : 'popup__error_visible'}`}>{errors.avatar}</span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;