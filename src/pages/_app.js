import "@/styles/globals.css";
import Layout from "../components/layout";
import { useState } from "react";
import Banner from "../components/banner";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import "../styles/globals.css";
// import "rsuite/dist/rsuite.min.css";
import "@tremor/react/dist/esm/tremor.css";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
);

export default function App({ Component, pageProps }) {
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient(supabase)
  );
  return (
    <>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <Banner />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionContextProvider>
    </>
  );
}
