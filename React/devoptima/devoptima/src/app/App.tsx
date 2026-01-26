import Header from "../widgets/Header/Header";
import Hero from "../features/hero/Hero";
import WhatIsDevOptima from "../entities/WhatIsDevOptima/WhatIsDevOptima";
import Solutions from "../entities/Solutions/Solutions";
import Testimonials from "../entities/Testimonials/Testimonials";
import CallToAction from "../entities/CallToAction/CallToAction";
import Footer from "../widgets/Footer/Footer";
import styles from "./App.module.scss";

const App = () => {
  return (
    <div className={styles.app}>
      <Header />
      <main>
        <Hero />
        <WhatIsDevOptima />
        <Solutions />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default App;
