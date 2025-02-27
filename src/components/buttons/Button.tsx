import ButtonType from "@mui/material/Button";
interface ButtonProps {
  variant?: "text" | "contained" | "outlined";
}
const Button: React.FC<ButtonProps> = ({ variant = "contained" }) => {
  return <ButtonType variant={variant}>Hello world</ButtonType>;
};

export default Button;
