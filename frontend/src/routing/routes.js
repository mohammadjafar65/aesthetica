import { BrowserRouter, Routes as Router, Route, Link } from "react-router-dom";
import HomePage from "../app/pages/Home/index.js";
import PrivacyPolicy from "../app/pages/Other/PrivacyPolicy.js";
import TermsandConditions from "../app/pages/Other/TermsandConditions.js";

function Routes() {
  return (
    <>
      <BrowserRouter>
        <Router>
          <Route path="/" element={<HomePage />} />
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/TermsandConditions" element={<TermsandConditions />} />
        </Router>
      </BrowserRouter>
    </>
  );
}

export default Routes;
