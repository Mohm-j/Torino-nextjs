import "@/styles/globals.css";
import "../styles/fonts.css";
import Layout from "../components/layout/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import pageTitles from "@/utils/titles";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [pageTitle, setPageTitle] = useState("تورینو");

  useEffect(() => {
    const path = router.pathname;

    if (path === "/tours/[tourId]" && pageProps?.tour?.title) {
      setPageTitle(`تورینو | ${pageProps.tour.title}`);
      return;
    }

    setPageTitle(pageTitles[path] || "تورینو");
  }, [router.pathname, pageProps?.tour?.title]);

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content="رزرو و مشاهده تورهای مسافرتی در تورینو"
        />
      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>

      <ToastContainer
        position="top-right"
        autoClose={1000}
        theme="colored"
        closeOnClick
        pauseOnHover
        draggable
      />
    </QueryClientProvider>
  );
}
