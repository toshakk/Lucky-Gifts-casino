interface Window {
  Telegram?: {
    WebApp: {
      initDataUnsafe: {
        gift?: {
          id: string;
          name: string;
          stars: number;
        };
      };
      ready: () => void;
      expand: () => void;
      close: () => void;
    };
  };
}

declare global {
  interface Window {
    Telegram?: Window['Telegram'];
  }
}
