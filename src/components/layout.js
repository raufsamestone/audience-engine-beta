import { Fragment } from "react";
import Link from "next/link";
import Head from "next/head";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

const Layout = ({ children }) => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const user = session?.user;

  async function handleSignout() {
    await supabase.auth.signOut();
  }

  return (
    <Fragment>
      <Head>
        <title>🔮 Audience Engine</title>
      </Head>
      {!session ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                🔮 Audience Engine
              </h1>

              <h2 className="mt-6 text-center text-2xl text-gray-900">
                Sign in to your account
              </h2>
            </div>
            <Auth
              supabaseClient={supabase}
              view="magic_link"
              magicLink={true}
              appearance={{
                theme: ThemeSupa,
                style: {
                  button: {
                    background: "purple",
                    color: "white",
                    border: "none",
                  },
                  anchor: { color: "black" },
                },
              }}
              theme="light"
            />
          </div>
        </div>
      ) : (
        <>
          <div className="flex h-screen bg-gray-50 shadow-sm">
            <div className="flex flex-col w-64 bg-white">
              <div className="h-0 flex-1 flex flex-col overflow-y-auto">
                <div className="flex-shrink-0 px-4 py-3 ">
                  <h1 className="text-2xl font-bold text-gray-900">
                    🔮 Audience Engine
                  </h1>
                </div>
                <nav className="flex-1 px-2 py-4 bg-white">
                  {/* TODO --> Add  bg-gray-100 to each link based on router url */}
                  <Link
                    className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                    href="/"
                  >
                    <svg
                      className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                      />
                    </svg>
                    Dashboard
                  </Link>

                  <Link
                    className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                    href="/audiences"
                  >
                    <svg
                      className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 4v16a2 2 0 002 2h14a2 2 0 002-2V4a2 2 0 00-2-2H5a2 2 0 00-2 2zm6 7h6m-3-3v6"
                      />
                    </svg>
                    Audiences
                  </Link>

                  <Link
                    className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                    href="/audience-merger"
                  >
                    <svg
                      className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
                      />
                    </svg>
                    Audience Merger
                  </Link>
                  <Link
                    className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                    href="/page-prediction"
                  >
                    <svg
                      className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
                      />
                    </svg>
                    Page Prediction
                  </Link>
                </nav>
              </div>
              <div className="flex flex-col items-center py-4 border-t">
                {/* <img src={""} alt={""} className="w-12 h-12 rounded-full" /> */}
                {/* <h2 className="mt-2 mb-1 text-gray-900 text-sm font-medium">
                  Username
                </h2> */}
                <p className="text-gray-500 text-xs">{user.email}</p>
                <span
                  onClick={handleSignout}
                  className="mt-4 px-4 py-2 text-sm font-medium text-gray-500 rounded-md hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                >
                  Sign Out
                </span>
              </div>
            </div>
            <div className="flex-1 overflow-auto">
              <main className="pt-10 pb-6">{children}</main>
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
};

export default Layout;
