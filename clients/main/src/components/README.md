This is the `components` folder.

# Convention

Divide big or complex components into multiple smaller and simpler components and add a `.const.ts`, `.type.ts` or `.function.ts` file if needed.  
If these files are NOT too specific and are used by multiple components -- then they should be in the `common` folder.  
If these files are specifically for one component (good idea!) -- then they should be placed in the same folder as the component. Here is an example of a good practice:

### Example:

A component called `ChangePasswordForm.tsx` is divided into multiple components:

- `ChangePasswordInputs.tsx`,
- `ChangePasswordSubmitButton.tsx`,
- `ChangePasswordErrorPopup.tsx`  
  and uses
- a `change-password-errors.const.ts` consts file,
- a `change-password-types.ts` types file and
- a `change-password-functions.ts` functions file.

```bash:
|--📂components
|    |--📂change-password-form
|    |    |--📜ChangePasswordForm.tsx
|    |    |--🎨ChangePasswordForm.scss
|    |    |--📜ChangePasswordInputs.tsx
|    |    |--📜ChangePasswordSubmitButton.tsx
|    |    `--📜change-password-errors.const.ts
|    `--📂students-list
|    |    |--📜StudentsList.tsx
|    |    |--🎨StudentsList.scss
|    |    |--📜StudentsListHeader.tsx
|    |    |--📜StudentsListItem.tsx
|    `--📂task-reminder
|    |    |-- ...
```

In this example, `change-password-form/` is a folder inside `components/`, and the component `ChangePasswordForm.tsx` imports all the other files in this folder

> [!Note]  
> Your team might prefer all `.scss` files to be in the `style` folder.
