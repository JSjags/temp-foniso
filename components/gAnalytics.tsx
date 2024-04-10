import Script from "next/script";

function Analytics() {
  return (
    <>
      {/* <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-7CRXZEZ7KM"
      />
      <Script id="G-7CRXZEZ7KM">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-7CRXZEZ7KM');
        `}
      </Script> */}
    </>
  );
}

export default Analytics;
