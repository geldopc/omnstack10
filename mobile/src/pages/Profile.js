import React from "react";
import { WebView } from "react-native-webview";

export default function Profile({ route }) {
  console.log("# navigation", route.params);
  const { github_username } = route.params;
  return (
    <WebView
      source={{ uri: `https://github.com/${github_username}` }}
      style={{ flex: 1 }}
    />
  );
}
