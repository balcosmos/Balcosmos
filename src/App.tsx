import React, { useEffect } from "react";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import DrawerAppBar from "./components/DrawerAppBar";
import About from "./components/About";
import Albums from "./components/Albums";
import Events from "./components/Events";
import Merch from "./components/Merch";
import Grid from "@mui/material/Grid";
import Listen from "./components/Listen";
import ContactForm from "./components/ContactForm";
import BackToTop from "./components/BackToTop";
import { HashRouter, Routes, Route } from "react-router-dom";

declare global {
  function gtag(...args: any[]): void;
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#388e3c",
    },
  },
});


function MainContent() {
  return (
    <main>
      <DrawerAppBar />
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        direction='column'
        sx={{
          mt: { xs: '200px', sm: '160px' }
        }}
      >
        <Events />
        <Albums />
        <About />
        <Listen />
        <Merch />
        <ContactForm />
      </Grid>
    </main>
  );
}


function ExternalRedirect({ to }: { to: string }) {
  React.useEffect(() => {
    window.location.replace(to);
  }, [to]);
  return null;
}

function App() {
  useEffect(() => {
    const handleRouteChange = () => {
      if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
          page_path: window.location.pathname + window.location.search + window.location.hash,
        });
      }
    };

    window.addEventListener('hashchange', handleRouteChange);

    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
    };
  }, []);

  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjust offset based on screen size: mobile (200px) or desktop (160px)
          const offset = window.innerWidth < 600 ? 200 : 160;
          const y = rect.top + window.pageYOffset - offset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    };

    // Scroll on initial load
    scrollToHash();

    // Scroll on hash change
    window.addEventListener('hashchange', scrollToHash);

    return () => window.removeEventListener('hashchange', scrollToHash);
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <HashRouter>
        <Routes>
          <Route path="/epk" element={<ExternalRedirect to="https://e.pcloud.link/publink/show?code=kZItubZRl6DI304KCpdnSzfzz1WShbKYMqy#/filemanager?folder=5497700063" />} />
          <Route path="/*" element={<MainContent />} />
        </Routes>
        <BackToTop />
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
