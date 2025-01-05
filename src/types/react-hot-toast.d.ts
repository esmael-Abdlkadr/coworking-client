import 'react-hot-toast';

declare module 'react-hot-toast' {
  interface Toast {
    isActive(id: string): boolean;
  }
}
