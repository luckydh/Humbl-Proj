# Field components
The form fields have unique styles inspired by Google's Material Design. The idea behind this library is to keep every possible bit of those styles isolated so you can build any form component, but also export ready-to-use `Field` components that can be easily imported and used directly.

## The **ready-to-use** components
These are the components you can just import and render inside your form. For the most cases, they are the only components you're gonna need to import from this library. They are:
### `TextField`
The general text input field. It inherits all the HTML `<input>` tag props so you can use it as a regular input. It also takes a `label`, `helperText`, and `variant` props that are rendered using the "common" components.
#### Implementation example
```typescript
const Form = () => {
  const { register, errors } = useForm({
    defaultValues: {
      email: "",
    }
  });
  
  return (
    <form>
      <TextInput
        id="email"
        name="email"
        label="Email"
        ref={register}
        variant={errors.email ? "error" : "default"}
        helperText={errors.email?.message}
      />
    </form>
  )
}
```

_// TODO: add others once they're built._

---

## The **common** components
* `Label`
* `Wrapper`
* `HelperText`

If the ready-to-use `Field` components are not suited for you use case, you can import each of these components to assemble and create your own customized control. All those components accept a `variant` prop which defines the styles that are going to be used.
