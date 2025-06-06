declare module '../components/AppLogo' {
  interface AppLogoProps {
    size?: number;
    color?: string;
  }
  
  export const AppLogo: React.FC<AppLogoProps>;
} 