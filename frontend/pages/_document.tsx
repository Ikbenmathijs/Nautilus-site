import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function Document() {
  return (
    <Html className="bg-gray-100 dark:bg-zinc-800">
      <Head />
      <body>
            <Main />
            <NextScript />
        </body>
    </Html>
  )
}