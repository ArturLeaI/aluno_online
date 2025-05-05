import { Control, FieldErrors } from "react-hook-form";
import { StudentFormValues } from "../../../pages/addStudent/addStudent.type";

export interface StudentFormProps {
  control: Control<StudentFormValues>;
  errors: FieldErrors<StudentFormValues>;
  onSubmit: () => void;
  onCancel: () => void;
}