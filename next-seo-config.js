const description =
  "Kaze NFT Anime Art is a NFT that focuses on anime art styles / artwork";

const imgUrl =
  "./img/home page.png";

export default {
  title: "Kaze Website",
  description,
  openGraph: {
    type: "website",
    url: "",
    title: "Kaze NFT Web",
    description,
    images: [
      {
        url: imgUrl,
        width: 800,
        height: 600,
        alt: "Kaze NFT Web",
        type: "image/png",
      },
      {
        url: imgUrl,
        width: 900,
        height: 800,
        alt: "Kaze Web",
        type: "image/png",
      },
      {
        url: imgUrl,
      },
    ],
    site_name: "Portfolio",
    locale: "en_US",
  },
  twitter: {
    cardType: "summary_large_image",
  },
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico",
      type: "image/x-icon",
    },
  ],
};