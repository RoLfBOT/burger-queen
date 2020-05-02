import * as styledComponents from 'styled-components';
import { ThemedStyledComponentsModule } from 'styled-components';

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider
} = styledComponents as ThemedStyledComponentsModule<IThemeInterface>;

export interface IThemeInterface {
  black: string;
  neutralDark: string;
  neutralLight: string;
  neutralLighter: string;
  neutralLighterAlt: string;
  neutralPrimary: string;
  neutralPrimaryAlt: string;
  neutralQuaternary: string;
  neutralQuaternaryAlt: string;
  neutralSecondary: string;
  neutralTertiary: string;
  neutralTertiaryAlt: string;
  themeDark: string;
  themeDarkAlt: string;
  themeDarker: string;
  themeLight: string;
  themeLighter: string;
  themeLighterAlt: string;
  themePrimary: string;
  themeSecondary: string;
  themeTertiary: string;
  white: string;
  secondaryColor: string;
  secondaryColorInverted: string;
  lightBorderColor: string;
  smallPadding: number;
  mediumPadding: number;
  largePadding: number;
  textHeadingSize: number;
  cardHeadingText: number;
  cardSubHeadingText: number;
  textPrimaryColor: string;
  textSecondaryColor: string;
  navBarHeight: string;
  mobileExpandedNavBar: string;
  quizCardMinHeight: string;
  quizCardMaxWidth: string;
  courseCardFontSize: string;
};

export type StyledProps<T> = styledComponents.ThemedStyledProps<T, IThemeInterface>;

export default styled;

export { css, createGlobalStyle, keyframes, ThemeProvider };