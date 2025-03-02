import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const INSTAGRAM_AUTH_URL = "https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=2697378307139870&redirect_uri=https://focusbiasmedia.vercel.app/&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish%2Cinstagram_business_manage_insights";

export default function InstagramLogin() {
  const [searchParams] = useSearchParams();
  const authCode = searchParams.get("code");

  useEffect(() => {
    if (authCode) {
      console.log("Authorization Code:", authCode);
      // Send authCode to backend for token exchange
    }
  }, [authCode]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Instagram Login</h1>
      <a href={INSTAGRAM_AUTH_URL} className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">Login with Instagram</a>
      {authCode && (
        <p className="mt-4 text-green-600">Successfully authenticated! Check console for code.</p>
      )}
    </div>
  );
}

