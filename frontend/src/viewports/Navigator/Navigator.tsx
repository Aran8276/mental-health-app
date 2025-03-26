import { FC, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { publicRoutes } from "./Navigator.data";
import Layout from "@/layouts/layout";
import CommunityThread from "@/pages/CommunityThread";

const Navigator: FC = () => (
  <Suspense fallback={"Loading..."}>
    <BrowserRouter>
      <Layout>
        <Routes>
          {publicRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}

          <Route path="/community/:id" element={<CommunityThread />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </Suspense>
);

export default Navigator;
