import * as yup from "yup";

interface YupschemaInterface {
  hasFirst?: boolean;
  hasLast?: boolean;

  hasEmail?: boolean;

  hasPassword?: boolean;
}

const defineUserYupValidation = ({
  hasFirst = false,
  hasLast = false,

  hasEmail = false,

  hasPassword = false,
}: YupschemaInterface) => {
  const schemaObj: any = {};
  const nameObj: any = {};
  const addressObj: any = {};

  if (hasFirst) nameObj.first = yup.string().required("First Name is required");
  if (hasLast) nameObj.last = yup.string().required("Last Name is required");
  if (hasFirst || hasLast) schemaObj.name = yup.object(nameObj);

  if (hasEmail)
    schemaObj.email = yup
      .string()
      .required()
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,6}$/, "Enter valid Email Address");

  if (hasPassword)
    schemaObj.password = yup
      .string()
      .required()
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must have min 8 characters and 1 cap & small letter, Symbol"
      );

  return yup.object().shape(schemaObj);
};

export default defineUserYupValidation;
