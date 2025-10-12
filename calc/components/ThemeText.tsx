import { globalStyles } from '@/styles/global-styles';
import { Text, type TextProps } from 'react-native';
import { useThemeColors } from '@/hooks/useThemeColors';

interface Props extends TextProps {
    variant?: 'h1' | 'h2';
    color?: string;
}

const ThemeText = ({ children, variant = 'h1', style, ...rest }: Props) => {
  const colors = useThemeColors();

  return (
    <Text
      style={[
        { color: colors.textPrimary, fontFamily: 'SpaceMono' },
        variant === 'h1' && globalStyles.mainResult,
        variant === 'h2' && globalStyles.subResult,
        style
      ]}
      numberOfLines={1}
      adjustsFontSizeToFit
      {...rest}
    >
      {children}
    </Text>
  );
};

export default ThemeText;

