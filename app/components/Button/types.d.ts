type ButtonType = 'button' | 'reset' | 'submit';

interface IButtonProps {
  className?: string;
  fill?: cssHex;
  isDisabled?: boolean;
  isInverted?: boolean;
  isRound?: boolean;
  onClick?(): void;
  text: string;
  type?: ButtonType;
}
