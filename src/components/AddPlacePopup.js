import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import useForm from '../hooks/useForm';

function AddPlacePopup(props){

    const {values, handleChange, setValues, errors, setErrors, isValid} = useForm({
      name: '',
      link: '',
    })

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (isValid) {
          props.onAddCard({
              name: values.name,
              link: values.link,
          });
        }
    }

    //очистка формы перед открытием
    useEffect(() => {
      setValues({
        name: '',
        link: '',
      })
      setErrors({})
    }, [props.isOpen]);

    return(
        <PopupWithForm 
          name="add" 
          title="Добавить место" 
          buttonText={props.isLoading ? 'Создание...' : 'Создать'}
          isOpen={props.isOpen}
          onClose={props.onClose}
          onCloseOverlay={props.onCloseOverlay}
          onSubmit={handleSubmit}
          isValid={isValid} >
            <input
                type="text"
                autoComplete="off"
                name="name"
                id="name"
                className="popup__field popup__field_type_mesto-name"
                placeholder="Название"
                maxLength="30"
                minLength="2"
                required="true"
                value={values.name}
                onChange={handleChange}
              />
              <span id="name-error" className={`popup__error ${isValid ? '' : 'popup__error_visible'}`}>{errors.name}</span>
              <input
                type="url"
                name="link"
                id="link"
                className="popup__field popup__field_type_mesto-link"
                placeholder="Ссылка на картинку"
                required="true"
                value={values.link}
                onChange={handleChange}
              />
              <span id="mestoLink-error" className={`popup__error ${isValid ? '' : 'popup__error_visible'}`}>{errors.link}</span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;