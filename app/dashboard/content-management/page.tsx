"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import PageForm from "../_ui/forms/page-form";
import { hrefType, PageData } from "../_lib/Page/definitions";
import { getData } from "../_lib/Page/actions";

export default function ContentManagement() {
  const navLinks: { href: hrefType; label: string }[] = [
    { href: "home", label: "Home" },
    { href: "about", label: "About" },
    { href: "projects", label: "Projects" },
    { href: "blog", label: "Blog" },
    { href: "contact", label: "Contact" },
  ];

  const [activeTab, setActiveTab] = useState<hrefType>("home");
  const [pageData, setPageData] = useState<{
    tab: hrefType;
    data: PageData | null;
  } | null>(null);
  const [formRevision, setFormRevision] = useState(0);

  useEffect(() => {
    const anchor = window.location.hash || "home";
    const syncAnchor = () => {
      const value = anchor.replace("#", "");
      setActiveTab(value as hrefType);
    };
    syncAnchor();

    window.addEventListener("hashchange", syncAnchor);

    return () => {
      window.removeEventListener("hashchange", syncAnchor);
    };
  }, []);

  useEffect(() => {
    let isCurrent = true;

    getData(activeTab).then((page) => {
      if (isCurrent) {
        setPageData({ tab: activeTab, data: page });
      }
    });

    return () => {
      isCurrent = false;
    };
  }, [activeTab]);

  const refreshPageData = useCallback(
    async (page: hrefType) => {
      const updatedPage = await getData(page);
      if (page === activeTab) {
        setPageData({ tab: page, data: updatedPage });
        setFormRevision((revision) => revision + 1);
      }
    },
    [activeTab],
  );

  return (
    <div>
      <h1>Content Management</h1>
      <div id="tabBar">
        <nav className="tab-nav">
          <ul className="tab-menu">
            {navLinks.map(({ href, label }) => (
              <li
                className={`tab-item ${activeTab === href ? "active" : ""}`}
                key={href}
              >
                <Link
                  className="tab-link"
                  href={"#" + href}
                  onNavigate={() => setActiveTab(href)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="tab-content">
          {navLinks.map(({ href, label }) => (
            <div
              className={`tab-pane ${activeTab === href ? "" : "hidden"}`}
              id={href}
              key={href}
            >
              {activeTab === href && (
                <>
                  <h3>{label}</h3>
                  {pageData?.tab === href && (
                    <PageForm
                      key={`${href}-${formRevision}`}
                      page={pageData.data}
                      alias={href}
                      onSaved={refreshPageData}
                    />
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
