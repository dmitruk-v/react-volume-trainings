import React, { PropsWithChildren, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppDispatch } from "../../store";
import { usersCreateUserAction } from "../../store/actions";
import { createUser } from "../../utils/create-users";

// ASSETS ------------------------------------------------------------
// -------------------------------------------------------------------

// STYLES ------------------------------------------------------------
import "./registration-form.css";
// -------------------------------------------------------------------

// COMPONENTS --------------------------------------------------------
// -------------------------------------------------------------------

type MyForm = {
  validators: FormValidator[]
  fields: {
    [field: string]: FormField
  }
}

type FormValidator = (form: MyForm) => string | null;
type FormFieldValidator = (value: string, form: MyForm) => string | null;
type FormField = {
  value: string,
  error: string[] | null,
  validators: FormFieldValidator[],
  status?: any,
}
type ValidationMap = {
  [field: string]: string[] | null;
}

type Props = {};

const initialFormState: MyForm = {
  validators: [
    (form) => form.fields.password.value !== form.fields.passwordRep.value
      ? `Password fields are not equal ${form.fields.password.value}, ${form.fields.passwordRep.value}`
      : null,
  ],
  fields: {
    username: {
      value: "",
      error: null,
      validators: [
        (val) => val.length === 0 ? "Username is empty!" : null,
      ]
    },
    password: {
      value: "",
      error: null,
      validators: [
        (val) => val.length === 0 ? "Password is empty!" : null,
      ]
    },
    passwordRep: {
      value: "",
      error: null,
      validators: [
        (val) => val.length === 0 ? "Repeated password is empty!" : null,
        (_, form) => form.fields.password.value !== form.fields.passwordRep.value
          ? `Password fields are not equal ${form.fields.password.value}, ${form.fields.passwordRep.value}`
          : null
      ],
      status: {
        touched: false,
        dirty: false,
        valid: false,
      }
    },
  }
};

// ------------------------------------------------------------------------------

const RegistrationForm = (props: PropsWithChildren<Props>) => {
  console.log("RegistrationForm called!");

  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
  const [form, setForm] = useState(initialFormState);

  // const resetForm = () => setForm(initialFormState);

  const handleFormSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    const validationMap = validateFormFields(form);
    console.log(validationMap);

    setForm({
      ...form,
      fields: {
        ...Object.keys(validationMap).reduce((acc, curr) => {
          acc[curr] = { ...form.fields[curr], error: validationMap[curr] }
          return acc;
        }, {} as MyForm["fields"])
      }
    });

    if (isFormValid(validationMap)) {
      const createdUser = createUser(form.fields.username.value, "", "");
      dispatch(
        usersCreateUserAction(createdUser)
      );
      console.log("--- HISTORY ---", history);

      history.push("/users");
    }
  }

  const changeUsername = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      fields: {
        ...form.fields,
        username: {
          ...form.fields.username,
          value: evt.target.value
        }
      }
    });
  }

  const changePassword = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      fields: {
        ...form.fields,
        password: {
          ...form.fields.password,
          value: evt.target.value
        }
      }
    });
  }

  const changePasswordRep = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      fields: {
        ...form.fields,
        passwordRep: {
          ...form.fields.passwordRep,
          value: evt.target.value
        }
      }
    });
  }

  return (
    <div className="wrapper">
      <form
        onSubmit={handleFormSubmit}
        className="form registration-form"
      >
        <h2 className="form__title">Register new user</h2>
        <div className="form__field">
          <input
            type="text"
            value={form.fields.username.value}
            onChange={changeUsername}
            name="username"
            className="control-input"
            placeholder="Username"
          />

          {form.fields.username.error !== null
            ? (
              <div className="form__error">
                {form.fields.username.error.map(err => <div key={err}>{err}</div>)}
              </div>
            )
            : null}

        </div>
        <div className="form__field">
          <input
            type="password"
            value={form.fields.password.value}
            onChange={changePassword}
            name="password"
            className="control-input"
            placeholder="Password"
          />

          {form.fields.password.error !== null
            ? (
              <div className="form__error">
                {form.fields.password.error.map(err => <div key={err}>{err}</div>)}
              </div>
            )
            : null}

        </div>
        <div className="form__field">
          <input
            type="password"
            value={form.fields.passwordRep.value}
            onChange={changePasswordRep}
            name="password-repeated"
            className="control-input"
            placeholder="Repeated password"
          />

          {form.fields.passwordRep.error !== null
            ? (
              <div className="form__error">
                {form.fields.passwordRep.error.map(err => <div key={err}>{err}</div>)}
              </div>
            )
            : null}

        </div>
        <div className="form__field">
          <button
            className="button button--primary button--wide"
            type="submit"
          >Submit</button>
        </div>
      </form>
    </div>
  );
}



// const validateForm = (form: MyForm): string[] => {
//   return form.validators.reduce((acc, validator) => {
//     const curr = validator(form);
//     if (curr !== null) {
//       acc.push(curr);
//     }
//     return acc;
//   }, [] as string[]);
// }

const validateFormFields = (form: MyForm): ValidationMap => {
  const validationMap: ValidationMap = {};

  Object.keys(form.fields).forEach(field => {
    const formField = form.fields[field];
    if (formField.validators === undefined) return;

    const fieldErrors: string[] = [];
    formField.validators.forEach(validator => {
      const curr = validator(formField.value, form);
      if (curr !== null) {
        fieldErrors.push(curr);
      }
    });

    if (fieldErrors.length === 0) {
      validationMap[field] = null;
    } else {
      validationMap[field] = fieldErrors;
    }
  });

  return validationMap;
}

const isFormValid = (map: ValidationMap): boolean => {
  return Object.keys(map).every(key => map[key] === null ? true : false);
}

export { RegistrationForm };