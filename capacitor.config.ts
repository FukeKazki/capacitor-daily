import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.fuke',
  appName: 'capacitor-rss-reader',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

if (process.env.NODE_ENV === "development") {
  config.server!.url = "http://localhost:5173";
  config.server!.hostname = "localhost";
}

export default config;
