import { Controller } from "react-hook-form";

interface FormInputProps {
  name: string;
  control: any;
  rules?: any;
  type?: string;
  placeholder?: string;
  label: string;
  error?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  name,
  control,
  rules,
  type = "text",
  placeholder,
  label,
  error,
}) => {
  return (
    <div className="mb-6">
      <label
        className="mr-4 text-gray-700 font-bold inline-block mb-2"
        htmlFor={name}
      >
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <input
            type={type}
            className="border bg-gray-100 py-2 px-4 w-full outline-none focus:ring-2 focus:ring-black rounded"
            placeholder={placeholder}
            {...field}
          />
        )}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
