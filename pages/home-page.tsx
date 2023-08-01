import { NextPage } from "next";
import Hero from "../component/Hero";
import Header from "../component/Header";
import  Providers  from "./providers";

const ClientHomePage: NextPage = (): JSX.Element => {
  return (
    <>
      <div className="dark:bg-homeBackground">
        <Providers>
          <Header />
          <Hero />
        </Providers>
      </div>
    </>
  );
};

export default ClientHomePage;
