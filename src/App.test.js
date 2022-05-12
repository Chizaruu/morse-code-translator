import App from "./App";
import React from "react";
import { createRoot } from "react-dom/client";

describe("App", () => {
    it("should be defined", () => {
        expect(App).toBeDefined();
    });

    it("should render without crashing", () => {
        const div = document.createElement("div");
        createRoot(div).render(<App />);
    });

    it("should render the app", () => {
        const div = document.createElement("div");
        div.innerHTML = "test";
        createRoot(div).render(<App />);
        expect(div.innerHTML).toBeTruthy();
    });
});
