import "@/styles/globals.css";
import Layout from "../components/layout";
import Banner from "../components/banner";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Banner />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
