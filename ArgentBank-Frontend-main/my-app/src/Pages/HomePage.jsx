import BannerHome from "../components/bannerHome";
import Explain from "../components/Explain";
import "../assets/BannerHomeCss/bannerhome.css"
import "../assets/ExplainCSS/explain.css"
import "../index.css";

export default function HomePage() {
  return (
    <>
      <BannerHome />
      <Explain />
    </>
  );
}
