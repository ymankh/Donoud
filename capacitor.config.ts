import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.donoud.com",
  appName: "donoud",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
};

export default config;
