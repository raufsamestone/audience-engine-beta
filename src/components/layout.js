import { Fragment } from "react";
import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <Fragment>
      <Head>
        <title>Audience Engine</title>
      </Head>

      <div className="flex h-screen bg-gray-50 shadow-sm">
        <div className="flex flex-col w-64 bg-white">
          <div className="h-0 flex-1 flex flex-col overflow-y-auto">
            <div className="flex-shrink-0 px-4 py-3 ">
              <h1 className="text-lg font-bold text-gray-900">
                Audience Engine
              </h1>
            </div>
            <nav className="flex-1 px-2 py-4 bg-white">
              <a
                href="/"
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:text-gray-900 hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeWidth="2"
                    stroke="currentColor"
                    d="M19.273,11.792l-6.545-6.121V3.75h-1.455v1.922L4.727,11.792l-0.901,0.844l0.662,0.706l0.901-0.844v7.337c0,0.412,0.334,0.75,0.75,0.75h12.545c0.412,0,0.75-0.338,0.75-0.75v-7.337l0.901,0.844l0.662-0.706L19.273,11.792z M18.773,19.125H5.227v-6.045l6.297-5.904c0.378-0.355,0.982-0.355,1.361,0l6.297,5.904V19.125z"
                  />
                </svg>
                Dashboard
              </a>
              <a
                href="/create"
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:text-gray-900 hover:bg-gray-100"
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
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Create Audience
              </a>
              <a
                href="/audiences"
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-900 hover:bg-gray-100"
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
              </a>
              <a
                href="/audience-merger"
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-900 hover:bg-gray-100"
              >
                <svg
                  className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    strokeWidth="2"
                    d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
                  />
                </svg>
                Audience Merger
              </a>
            </nav>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <main className="pt-10 pb-6">{children}</main>
        </div>
      </div>
    </Fragment>
  );
};

export default Layout;